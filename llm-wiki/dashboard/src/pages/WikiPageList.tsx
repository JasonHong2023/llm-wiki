import { useState, useEffect, useCallback } from "react";
import { Search, Trash2, ExternalLink, Loader2, FileText, RefreshCw } from "lucide-react";
import { wiki } from "../api";

interface Page {
  path: string;
  title: string;
  tags: string[];
  category: string;
  modified: string;
  languages: string[];
}

export default function WikiPageList({
  onNavigate,
  onRefresh,
}: {
  onNavigate: (tab: any) => void;
  onRefresh: () => void;
}) {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingPath, setDeletingPath] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const params = search ? `search=${encodeURIComponent(search)}` : "";
      const data = await wiki.pages(params);
      setPages(data.pages ?? data ?? []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => { void load(); }, [load]);

  async function handleDelete(path: string) {
    if (!confirm(`確定要刪除「${path}」嗎？`)) return;
    setDeletingPath(path);
    try {
      await wiki.deletePage(path);
      setPages((p) => p.filter((pg) => pg.path !== path));
      onRefresh();
    } catch (e) {
      alert(`刪除失敗: ${e}`);
    } finally {
      setDeletingPath(null);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-tertiary" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜尋頁面..."
            className="w-full rounded-lg border border-current/20 bg-current/5 py-2 pl-9 pr-3 text-sm outline-none focus:border-current/40 transition-colors"
          />
        </div>
        <button onClick={() => void load()} className="flex items-center gap-1 rounded px-2 py-2 text-xs text-text-tertiary hover:text-text-secondary transition-colors">
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-5 w-5 animate-spin text-text-tertiary" />
        </div>
      ) : pages.length === 0 ? (
        <div className="py-12 text-center">
          <FileText className="h-10 w-10 mx-auto text-text-tertiary/40 mb-2" />
          <p className="text-sm text-text-tertiary">
            {search ? "找不到符合的頁面" : "尚無 Wiki 頁面"}
          </p>
          {!search && (
            <button
              onClick={() => onNavigate("upload")}
              className="mt-2 text-xs text-text-secondary hover:text-text-primary transition-colors underline"
            >
              前往匯入頁面
            </button>
          )}
        </div>
      ) : (
        <ul className="space-y-2">
          {pages.map((page) => (
            <li key={page.path} className="flex items-center gap-3 rounded-lg border border-current/10 bg-current/5 px-4 py-3 hover:bg-current/10 transition-colors group">
              <FileText className="h-4 w-4 shrink-0 text-text-tertiary" />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{page.title || page.path}</p>
                <div className="mt-0.5 flex flex-wrap gap-1">
                  {page.tags?.slice(0, 4).map((tag) => (
                    <span key={tag} className="rounded bg-current/10 px-1.5 py-0.5 text-xs text-text-tertiary">{tag}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => window.open(`/api/wiki/pages/${encodeURIComponent(page.path)}`, "_blank")}
                  className="rounded p-1 text-text-tertiary hover:text-text-secondary transition-colors"
                  title="在新分頁開啟"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => void handleDelete(page.path)}
                  disabled={deletingPath === page.path}
                  className="rounded p-1 text-text-tertiary hover:text-red-400 transition-colors disabled:opacity-50"
                  title="刪除"
                >
                  {deletingPath === page.path
                    ? <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    : <Trash2 className="h-3.5 w-3.5" />}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <p className="text-right text-xs text-text-tertiary">{pages.length} 個頁面</p>
    </div>
  );
}
