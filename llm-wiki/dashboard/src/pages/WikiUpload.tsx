import { useState, useRef, useCallback } from "react";
import { Upload, Globe, FileText, Loader2, CheckCircle2, List, AlertTriangle, XCircle, SkipForward } from "lucide-react";
import { wiki, apiFetch } from "../api";

type TabId = "import-url" | "upload-file" | "batch-import";
type RowStatus = "pending" | "processing" | "success" | "error" | "conflict" | "skipped";

const DOC_TYPES = ["auto", "entity", "concept", "comparison", "query"] as const;

async function pollUntilDone(taskId: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const iv = setInterval(async () => {
      try {
        const data = await wiki.analysisProgress(taskId);
        if (data.status === "complete" && data.result) { clearInterval(iv); resolve(data.result); }
        else if (data.status === "failed") { clearInterval(iv); reject(new Error(data.error ?? "Analysis failed")); }
      } catch (e) { clearInterval(iv); reject(e); }
    }, 2000);
  });
}

type ImportOutcome =
  | { kind: "success"; path: string }
  | { kind: "error"; message: string }
  | { kind: "conflict"; existingPath: string; message: string };

async function importOneUrl(url: string, docType: string, force: boolean): Promise<ImportOutcome> {
  try {
    const res = await wiki.importUrl({ url, type: docType, force });
    if (res.status === 409) {
      const body = await res.json().catch(() => ({}));
      return { kind: "conflict", existingPath: body.detail?.existing_path ?? "", message: body.detail?.message ?? "已存在" };
    }
    if (!res.ok) {
      const body = await res.json().catch(() => null);
      return { kind: "error", message: body?.detail ?? body?.message ?? `HTTP ${res.status}` };
    }
    const body = await res.json();
    if (body.task_id) {
      const result = await pollUntilDone(body.task_id);
      return { kind: "success", path: result.path };
    }
    return { kind: "success", path: body.path ?? "" };
  } catch (e) {
    return { kind: "error", message: e instanceof Error ? e.message : String(e) };
  }
}

interface BatchRow {
  id: number; url: string; status: RowStatus; message: string;
  existingPath?: string; path?: string;
}

function BatchImport({ docType }: { docType: string }) {
  const [rawText, setRawText] = useState("");
  const [rows, setRows] = useState<BatchRow[]>([]);
  const [running, setRunning] = useState(false);
  const abortRef = useRef(false);

  const updateRow = useCallback((id: number, patch: Partial<BatchRow>) => {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }, []);

  const parseUrls = () =>
    rawText.split("\n").map((l) => l.trim()).filter((l) => l.startsWith("http://") || l.startsWith("https://"));

  const handleStart = async () => {
    const urls = parseUrls();
    if (!urls.length) return;
    abortRef.current = false;
    setRunning(true);
    const initial: BatchRow[] = urls.map((url, i) => ({ id: i, url, status: "pending", message: "" }));
    setRows(initial);
    for (const row of initial) {
      if (abortRef.current) break;
      updateRow(row.id, { status: "processing" });
      const outcome = await importOneUrl(row.url, docType, false);
      if (outcome.kind === "success") updateRow(row.id, { status: "success", message: outcome.path, path: outcome.path });
      else if (outcome.kind === "conflict") updateRow(row.id, { status: "conflict", message: outcome.message, existingPath: outcome.existingPath });
      else updateRow(row.id, { status: "error", message: outcome.message });
    }
    setRunning(false);
  };

  const statusIcon = (s: RowStatus) => {
    if (s === "pending") return <span className="text-text-tertiary">·</span>;
    if (s === "processing") return <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-400" />;
    if (s === "success") return <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />;
    if (s === "error") return <XCircle className="h-3.5 w-3.5 text-red-400" />;
    if (s === "conflict") return <AlertTriangle className="h-3.5 w-3.5 text-yellow-400" />;
    return <SkipForward className="h-3.5 w-3.5 text-text-tertiary" />;
  };

  return (
    <div className="space-y-4">
      <textarea
        value={rawText}
        onChange={(e) => setRawText(e.target.value)}
        placeholder={"每行一個 URL\nhttps://example.com/article-1\nhttps://example.com/article-2"}
        rows={8}
        className="w-full rounded-lg border border-current/20 bg-current/5 px-3 py-2 font-mono text-xs outline-none focus:border-current/40 transition-colors resize-none"
      />
      <div className="flex gap-2">
        <button
          onClick={() => void handleStart()}
          disabled={running || !parseUrls().length}
          className="flex items-center gap-2 rounded-lg bg-midground/20 px-4 py-2 text-sm font-medium hover:bg-midground/30 disabled:opacity-40 transition-colors"
        >
          {running ? <Loader2 className="h-4 w-4 animate-spin" /> : <List className="h-4 w-4" />}
          開始批量匯入
        </button>
        {running && (
          <button
            onClick={() => { abortRef.current = true; }}
            className="rounded-lg border border-current/20 px-4 py-2 text-sm hover:bg-current/10 transition-colors"
          >
            停止
          </button>
        )}
      </div>
      {rows.length > 0 && (
        <ul className="space-y-1 max-h-60 overflow-y-auto">
          {rows.map((row) => (
            <li key={row.id} className="flex items-center gap-2 rounded px-2 py-1.5 text-xs bg-current/5">
              {statusIcon(row.status)}
              <span className="truncate text-text-secondary flex-1">{row.url}</span>
              {row.message && <span className="text-text-tertiary truncate max-w-[30%]">{row.message}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function ImportUrl({ docType, onRefresh }: { docType: string; onRefresh: () => void }) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleImport = async (force = false) => {
    if (!url.trim()) return;
    setLoading(true); setResult(null); setError(null);
    const outcome = await importOneUrl(url.trim(), docType, force);
    setLoading(false);
    if (outcome.kind === "success") { setResult(outcome.path); onRefresh(); setUrl(""); }
    else if (outcome.kind === "conflict") setError(`已存在: ${outcome.existingPath} — 確定要覆蓋嗎？`);
    else setError(outcome.message);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") void handleImport(); }}
          placeholder="https://example.com/article"
          className="flex-1 rounded-lg border border-current/20 bg-current/5 px-3 py-2 text-sm outline-none focus:border-current/40 transition-colors"
        />
        <button
          onClick={() => void handleImport()}
          disabled={loading || !url.trim()}
          className="flex items-center gap-2 rounded-lg bg-midground/20 px-4 py-2 text-sm font-medium hover:bg-midground/30 disabled:opacity-40 transition-colors"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Globe className="h-4 w-4" />}
          匯入
        </button>
      </div>
      {result && <p className="flex items-center gap-2 text-sm text-green-400"><CheckCircle2 className="h-4 w-4" /> 已匯入: {result}</p>}
      {error && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
          <p>{error}</p>
          {error.includes("覆蓋") && (
            <button onClick={() => void handleImport(true)} className="mt-2 text-xs underline hover:opacity-80">確認覆蓋</button>
          )}
        </div>
      )}
    </div>
  );
}

function UploadFile({ onRefresh }: { onRefresh: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true); setResult(null); setError(null);
    try {
      const form = new FormData();
      form.append("file", file);
      form.append("type", "auto");
      const res = await wiki.uploadFile(form);
      const body = await res.json();
      if (!res.ok) throw new Error(body.detail ?? body.message ?? "上傳失敗");
      if (body.task_id) {
        const r = await pollUntilDone(body.task_id);
        setResult(r.path);
      } else {
        setResult(body.path ?? "成功");
      }
      onRefresh();
      setFile(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div
        onClick={() => inputRef.current?.click()}
        className="cursor-pointer rounded-lg border-2 border-dashed border-current/20 p-8 text-center hover:border-current/40 hover:bg-current/5 transition-colors"
      >
        <Upload className="mx-auto h-8 w-8 text-text-tertiary mb-2" />
        <p className="text-sm text-text-secondary">{file ? file.name : "點擊選擇檔案"}</p>
        <p className="text-xs text-text-tertiary mt-1">支援 .md, .txt, .html, .pdf</p>
        <input ref={inputRef} type="file" accept=".md,.txt,.html,.pdf" className="hidden" onChange={(e) => setFile(e.target.files?.[0] ?? null)} />
      </div>
      {file && (
        <button
          onClick={() => void handleUpload()}
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-midground/20 py-2 text-sm font-medium hover:bg-midground/30 disabled:opacity-40 transition-colors"
        >
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
          上傳並分析
        </button>
      )}
      {result && <p className="flex items-center gap-2 text-sm text-green-400"><CheckCircle2 className="h-4 w-4" /> 已匯入: {result}</p>}
      {error && <p className="rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">{error}</p>}
    </div>
  );
}

export default function WikiUpload({ onRefresh }: { onRefresh: () => void }) {
  const [activeTab, setActiveTab] = useState<TabId>("import-url");
  const [docType, setDocType] = useState("auto");

  const TABS = [
    { id: "import-url" as TabId, label: "URL 匯入", icon: Globe },
    { id: "upload-file" as TabId, label: "上傳檔案", icon: FileText },
    { id: "batch-import" as TabId, label: "批量匯入", icon: List },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div className="flex gap-1 rounded-lg border border-current/10 p-1 bg-current/5">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-1.5 rounded px-3 py-1.5 text-sm transition-colors ${
                activeTab === id ? "bg-midground/20 text-text-primary" : "text-text-tertiary hover:text-text-secondary"
              }`}
            >
              <Icon className="h-3.5 w-3.5" />{label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 text-sm text-text-tertiary">
          <span>類型:</span>
          <select
            value={docType}
            onChange={(e) => setDocType(e.target.value)}
            className="rounded border border-current/20 bg-current/5 px-2 py-1 text-xs outline-none"
          >
            {DOC_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      {activeTab === "import-url" && <ImportUrl docType={docType} onRefresh={onRefresh} />}
      {activeTab === "upload-file" && <UploadFile onRefresh={onRefresh} />}
      {activeTab === "batch-import" && <BatchImport docType={docType} />}
    </div>
  );
}
