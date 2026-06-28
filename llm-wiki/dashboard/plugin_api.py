"""LLM-Wiki Plugin API — GitHub Sync endpoints.

Mounted at /api/plugins/llm-wiki/ by the Hermes plugin system.
Core wiki endpoints (/api/wiki/) are provided by Hermes itself.
"""
from __future__ import annotations

import json
import logging
import subprocess
import threading
from datetime import datetime
from pathlib import Path

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

_log = logging.getLogger(__name__)

router = APIRouter()

# ── Config helpers ────────────────────────────────────────────────────

def _hermes_home() -> Path:
    try:
        from hermes_constants import get_hermes_home
        return get_hermes_home()
    except Exception:
        return Path.home() / ".hermes"

_GITHUB_CONFIG_FILE: Path | None = None

def _config_file() -> Path:
    global _GITHUB_CONFIG_FILE
    if _GITHUB_CONFIG_FILE is None:
        _GITHUB_CONFIG_FILE = _hermes_home() / "github_sync_config.json"
    return _GITHUB_CONFIG_FILE


def _load_config() -> dict:
    f = _config_file()
    if f.exists():
        try:
            return json.loads(f.read_text())
        except Exception:
            pass
    return {"repo_url": "", "pat": "", "branch": "main", "auto_sync": "off"}


def _save_config(cfg: dict) -> None:
    _config_file().write_text(json.dumps(cfg, indent=2))


def _get_wiki_path() -> Path:
    try:
        from hermes_cli.wiki_router import _get_parser
        return _get_parser().wiki_path
    except Exception:
        import os
        return Path(os.environ.get("WIKI_PATH", str(Path.home() / "wiki")))


def _invalidate_wiki() -> None:
    try:
        from hermes_cli.wiki_router import _get_parser
        _get_parser().invalidate()
    except Exception:
        pass


# ── Git helpers ───────────────────────────────────────────────────────

def _git(wiki_path: Path, *args: str) -> tuple[int, str, str]:
    import os
    result = subprocess.run(
        ["git", "-C", str(wiki_path), *args],
        capture_output=True, text=True, env=os.environ,
    )
    return result.returncode, result.stdout.strip(), result.stderr.strip()


def _build_remote_url(repo_url: str, pat: str) -> str:
    if pat and "github.com" in repo_url and "@" not in repo_url:
        repo_url = repo_url.replace("https://", f"https://{pat}@")
    return repo_url


def _ensure_git_repo(wiki_path: Path, remote_url: str) -> None:
    if not (wiki_path / ".git").exists():
        _git(wiki_path, "init")
        _git(wiki_path, "config", "user.email", "hermes@localhost")
        _git(wiki_path, "config", "user.name", "Hermes")
    rc, _, _ = _git(wiki_path, "remote", "get-url", "origin")
    if rc != 0:
        _git(wiki_path, "remote", "add", "origin", remote_url)
    else:
        _git(wiki_path, "remote", "set-url", "origin", remote_url)


def _get_changes(wiki_path: Path) -> list[dict]:
    rc, out, _ = _git(wiki_path, "status", "--porcelain")
    if rc != 0 or not out:
        return []
    status_map = {"A": "added", "M": "modified", "D": "deleted",
                  "?": "untracked", "R": "renamed"}
    changes = []
    for line in out.splitlines():
        if len(line) < 3:
            continue
        code = line[0].strip() or line[1].strip()
        path = line[3:]
        changes.append({"status": status_map.get(code, code), "path": path})
    return changes


# ── Auto-sync ─────────────────────────────────────────────────────────

_auto_timer: threading.Timer | None = None
_auto_lock = threading.Lock()


def _schedule_auto_sync() -> None:
    global _auto_timer
    with _auto_lock:
        if _auto_timer is not None:
            _auto_timer.cancel()
        cfg = _load_config()
        if cfg.get("auto_sync") != "hourly" or not cfg.get("repo_url") or not cfg.get("pat"):
            return
        _auto_timer = threading.Timer(3600, _do_auto_sync)
        _auto_timer.daemon = True
        _auto_timer.start()


def _do_auto_sync() -> None:
    try:
        cfg = _load_config()
        if not cfg.get("repo_url") or not cfg.get("pat"):
            return
        wiki_path = _get_wiki_path()
        remote_url = _build_remote_url(cfg["repo_url"], cfg["pat"])
        _ensure_git_repo(wiki_path, remote_url)
        changes = _get_changes(wiki_path)
        if not changes:
            return
        msg = f"Hermes auto-sync {datetime.now().strftime('%Y-%m-%d %H:%M')}"
        _git(wiki_path, "add", "-A")
        _git(wiki_path, "commit", "-m", msg)
        rc, _, err = _git(wiki_path, "push", "origin", cfg.get("branch", "main"))
        if rc != 0:
            _git(wiki_path, "push", "origin", cfg.get("branch", "main"), "--force")
    except Exception as e:
        _log.error(f"GitHub auto-sync error: {e}")
    finally:
        _schedule_auto_sync()


# ── Pydantic models ───────────────────────────────────────────────────

class GitHubConfigRequest(BaseModel):
    repo_url: str
    pat: str
    branch: str = "main"
    auto_sync: str = "off"


class GitHubPushRequest(BaseModel):
    message: str = ""


# ── Endpoints ─────────────────────────────────────────────────────────

@router.get("/github/status")
async def github_status() -> dict:
    cfg = _load_config()
    wiki_path = _get_wiki_path()
    changes: list[dict] = []
    last_commit: str | None = None
    is_git_repo = (wiki_path / ".git").exists()

    if is_git_repo:
        changes = _get_changes(wiki_path)
        rc, out, _ = _git(wiki_path, "log", "-1", "--format=%ai %s")
        if rc == 0 and out:
            last_commit = out

    return {
        "configured": bool(cfg.get("repo_url") and cfg.get("pat")),
        "repo_url": cfg.get("repo_url", ""),
        "branch": cfg.get("branch", "main"),
        "auto_sync": cfg.get("auto_sync", "off"),
        "is_git_repo": is_git_repo,
        "changes": changes,
        "last_commit": last_commit,
    }


@router.post("/github/config")
async def github_save_config(body: GitHubConfigRequest) -> dict:
    cfg = {
        "repo_url": body.repo_url.strip().rstrip("/"),
        "pat": body.pat.strip(),
        "branch": body.branch.strip() or "main",
        "auto_sync": body.auto_sync if body.auto_sync in ("off", "hourly") else "off",
    }
    _save_config(cfg)
    _schedule_auto_sync()
    return {"ok": True, "message": "設定已儲存"}


@router.post("/github/push")
async def github_push(body: GitHubPushRequest) -> dict:
    cfg = _load_config()
    if not cfg.get("repo_url") or not cfg.get("pat"):
        raise HTTPException(400, "請先設定 GitHub Repository URL 和 Personal Access Token")

    wiki_path = _get_wiki_path()
    remote_url = _build_remote_url(cfg["repo_url"], cfg["pat"])
    branch = cfg.get("branch", "main")

    _ensure_git_repo(wiki_path, remote_url)
    changes = _get_changes(wiki_path)
    if not changes:
        return {"ok": True, "message": "沒有變更，已是最新版本", "changes": []}

    commit_msg = body.message.strip() or f"Hermes sync {datetime.now().strftime('%Y-%m-%d %H:%M')}"
    _git(wiki_path, "add", "-A")
    rc, _, err = _git(wiki_path, "commit", "-m", commit_msg)
    if rc != 0 and "nothing to commit" not in err:
        raise HTTPException(500, f"Commit 失敗: {err}")

    rc, _, err = _git(wiki_path, "push", "origin", branch)
    if rc != 0:
        rc, _, err = _git(wiki_path, "push", "origin", branch, "--force")
        if rc != 0:
            raise HTTPException(500, f"Push 失敗: {err}")

    return {"ok": True, "message": f"已上傳 {len(changes)} 個變更", "changes": changes}


@router.post("/github/pull")
async def github_pull() -> dict:
    cfg = _load_config()
    if not cfg.get("repo_url") or not cfg.get("pat"):
        raise HTTPException(400, "請先設定 GitHub Repository URL 和 Personal Access Token")

    wiki_path = _get_wiki_path()
    remote_url = _build_remote_url(cfg["repo_url"], cfg["pat"])
    branch = cfg.get("branch", "main")

    _ensure_git_repo(wiki_path, remote_url)
    rc, _, err = _git(wiki_path, "fetch", "origin")
    if rc != 0:
        raise HTTPException(500, f"Fetch 失敗: {err}")

    rc, _, err = _git(wiki_path, "reset", "--hard", f"origin/{branch}")
    if rc != 0:
        raise HTTPException(500, f"還原失敗: {err}")

    _invalidate_wiki()
    rc, count_out, _ = _git(wiki_path, "diff", "--name-only", "HEAD@{1}", "HEAD")
    changed_count = len(count_out.splitlines()) if count_out else 0

    return {"ok": True, "message": f"已從 GitHub 還原，更新了 {changed_count} 個檔案"}
