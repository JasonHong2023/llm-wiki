const CORE = "/api/wiki";
const PLUGIN = "/api/plugins/llm-wiki";

function getSDK() {
  return (window as any).__HERMES_PLUGIN_SDK__;
}

export async function apiFetch(url: string, init?: RequestInit): Promise<Response> {
  const sdk = getSDK();
  if (sdk?.authedFetch) return sdk.authedFetch(url, init);
  return fetch(url, init);
}

export async function apiJSON<T = unknown>(url: string, init?: RequestInit): Promise<T> {
  const sdk = getSDK();
  if (sdk?.fetchJSON) return sdk.fetchJSON<T>(url, init) as Promise<T>;
  const res = await fetch(url, init);
  if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`);
  return res.json() as Promise<T>;
}

// Core wiki endpoints
export const wiki = {
  stats: () => apiJSON<any>(`${CORE}/stats`),
  pages: (params?: string) => apiJSON<any>(`${CORE}/pages${params ? `?${params}` : ""}`),
  page: (path: string) => apiJSON<any>(`${CORE}/pages/${path}`),
  deletePage: (path: string) => apiFetch(`${CORE}/pages/${encodeURIComponent(path)}`, { method: "DELETE" }),
  graph: () => apiJSON<any>(`${CORE}/graph`),
  timeline: (limit = 20) => apiJSON<any>(`${CORE}/timeline?limit=${limit}`),
  allTags: () => apiJSON<any[]>(`${CORE}/all-tags`),
  tags: () => apiJSON<any>(`${CORE}/tags`),
  validateTags: (tags: string) => apiJSON<any>(`${CORE}/validate-tags?tags=${encodeURIComponent(tags)}`),
  importUrl: (body: object) => apiFetch(`${CORE}/import-url`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }),
  uploadFile: (form: FormData) => apiFetch(`${CORE}/upload`, { method: "POST", body: form }),
  analysisProgress: (taskId: string) => apiJSON<any>(`${CORE}/analysis-progress/${taskId}`),
};

// GitHub sync endpoints (plugin)
export const github = {
  status: () => apiJSON<any>(`${PLUGIN}/github/status`),
  saveConfig: (body: object) => apiJSON<any>(`${PLUGIN}/github/config`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }),
  push: (body: object) => apiJSON<any>(`${PLUGIN}/github/push`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  }),
  pull: () => apiJSON<any>(`${PLUGIN}/github/pull`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  }),
};
