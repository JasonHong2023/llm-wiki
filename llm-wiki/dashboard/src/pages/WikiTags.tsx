import { useState, useEffect } from "react";
import { Tags, Loader2, RefreshCw, ChevronRight } from "lucide-react";
import { wiki } from "../api";

interface TagEntry {
  tag: string;
  count: number;
  pages: string[];
}

export default function WikiTags() {
  const [tags, setTags] = useState<TagEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    try {
      const data: TagEntry[] = await wiki.allTags();
      setTags(data.sort((a, b) => b.count - a.count));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { void load(); }, []);

  if (loading) return (
    <div className="flex items-center justify-center py-16">
      <Loader2 className="h-6 w-6 animate-spin text-text-tertiary" />
    </div>
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Tags className="h-4 w-4 text-text-tertiary" />
          <h1 className="text-lg font-semibold">標籤管理</h1>
          <span className="text-xs text-text-tertiary">({tags.length} 個標籤)</span>
        </div>
        <button onClick={() => void load()} className="flex items-center gap-1 text-xs text-text-tertiary hover:text-text-secondary transition-colors">
          <RefreshCw className="h-3.5 w-3.5" /> 重新整理
        </button>
      </div>

      {tags.length === 0 ? (
        <div className="py-12 text-center">
          <Tags className="h-10 w-10 mx-auto text-text-tertiary/40 mb-2" />
          <p className="text-sm text-text-tertiary">尚無標籤</p>
        </div>
      ) : (
        <ul className="space-y-1">
          {tags.map((entry) => (
            <li key={entry.tag}>
              <button
                onClick={() => setExpanded(expanded === entry.tag ? null : entry.tag)}
                className="flex w-full items-center gap-3 rounded-lg border border-current/10 bg-current/5 px-4 py-2.5 text-left hover:bg-current/10 transition-colors"
              >
                <ChevronRight
                  className={`h-3.5 w-3.5 shrink-0 text-text-tertiary transition-transform ${expanded === entry.tag ? "rotate-90" : ""}`}
                />
                <span className="flex-1 text-sm">{entry.tag}</span>
                <span className="rounded-full bg-current/10 px-2 py-0.5 text-xs text-text-tertiary">{entry.count}</span>
              </button>

              {expanded === entry.tag && (
                <ul className="ml-10 mt-1 space-y-0.5">
                  {entry.pages.map((page) => (
                    <li key={page} className="rounded px-3 py-1 text-xs text-text-tertiary hover:text-text-secondary hover:bg-current/5 transition-colors truncate">
                      {page}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
