import { useState, useEffect } from "react";
import { BookOpen, FileText, Tags, Clock, Loader2, RefreshCw } from "lucide-react";
import { wiki } from "../api";

interface Stats {
  total_pages: number;
  total_tags: number;
  languages: Record<string, number>;
}

interface TimelineEntry {
  date: string;
  action: string;
  subject: string;
  details: string;
}

export default function WikiOverview({ onNavigate }: { onNavigate: (tab: any) => void }) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [timeline, setTimeline] = useState<TimelineEntry[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    try {
      const [s, t] = await Promise.all([wiki.stats(), wiki.timeline(10)]);
      setStats(s);
      setTimeline(t.entries ?? t ?? []);
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">Wiki Overview</h1>
        <button onClick={() => void load()} className="flex items-center gap-1 text-xs text-text-tertiary hover:text-text-secondary transition-colors">
          <RefreshCw className="h-3.5 w-3.5" /> 重新整理
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatCard icon={BookOpen} label="總頁數" value={stats?.total_pages ?? 0} onClick={() => onNavigate("pages")} />
        <StatCard icon={Tags} label="標籤數" value={stats?.total_tags ?? 0} onClick={() => onNavigate("tags")} />
        <StatCard icon={FileText} label="語言數" value={Object.keys(stats?.languages ?? {}).length} />
      </div>

      {/* Timeline */}
      <div>
        <h2 className="mb-3 text-sm font-medium text-text-secondary">最近活動</h2>
        {timeline.length === 0 ? (
          <p className="text-sm text-text-tertiary">尚無活動記錄</p>
        ) : (
          <ul className="space-y-2">
            {timeline.map((entry, i) => (
              <li key={i} className="flex items-start gap-3 rounded-lg border border-current/10 bg-current/5 p-3">
                <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-text-tertiary" />
                <div className="min-w-0">
                  <p className="text-sm font-medium truncate">{entry.subject}</p>
                  <p className="text-xs text-text-tertiary">{entry.action} · {entry.date}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, onClick }: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: number;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`rounded-lg border border-current/10 bg-current/5 p-4 ${onClick ? "cursor-pointer hover:bg-current/10 transition-colors" : ""}`}
    >
      <div className="flex items-center gap-2 text-text-tertiary">
        <Icon className="h-4 w-4" />
        <span className="text-xs">{label}</span>
      </div>
      <p className="mt-1 text-2xl font-semibold">{value}</p>
    </div>
  );
}
