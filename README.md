# trading-sandbox-website (preview)

Preview/staging fork of the TradeCLI marketing & wiki site. Production lives at https://tradecli.in.

> **Default branch is `preview`.** It's both the deployment target for staging and the only base for feature branches — the preview repo deliberately has no `master`.

## Two repos, one bridge

| Role | Repo | Live URL | Deploys from |
|---|---|---|---|
| **Preview** (this repo) | `TradingSandbox/trading-sandbox-website-preview` | `https://tradingsandbox.github.io/trading-sandbox-website-preview/` (robots-disallowed) | `preview` branch (force-pushed) |
| **Production** | `TradingSandbox/trading-sandbox-website` | `https://tradecli.in` | `master` branch |

Both repos must be cloned locally. The bridge between them is **rsync**, not git remotes:

```
~/self/startup/trading-sandbox-website-preview/    (this repo)
~/self/startup/trading-sandbox-website/            (production)
```

## Local development

Requires Node 20+.

```
npm ci
npm test           # vitest; smoke test gates CI deploys
npm run build      # outputs dist/
npm run preview    # serves dist/ at http://localhost:3000
npm run dev:wiki   # vitepress hot-reload for wiki/
```

## Flow: preview branch → rsync → production

```
feat/<topic>  ─force-reset─►  preview  ─auto─►  staging Pages
      │
      │   (validate)
      │
      └─rsync─►  ../trading-sandbox-website / feat/<topic>  ─PR─►  master  ─auto─►  tradecli.in
```

### 1. Branch off `preview`

```
cd ~/self/startup/trading-sandbox-website-preview
git checkout preview && git pull
git checkout -b feat/<topic>
# ...changes, commits...
git push -u origin feat/<topic>
```

### 2. Deploy to preview (force-reset, not merge)

`preview` is a **deployment target**, not a PR source. It must track your feat branch byte-for-byte; merging into it accumulates stale commits and breaks the "preview URL == what I'll PR" invariant.

```
CANDIDATE=$(git rev-parse --abbrev-ref HEAD)
git fetch origin preview
git tag "preview-backup-$(date +%Y%m%d-%H%M%S)" origin/preview && git push origin --tags
git checkout preview && git reset --hard "$CANDIDATE"
git push --force origin preview
git checkout "$CANDIDATE"   # return to feat — never keep working on preview
```

The force-push triggers `.github/workflows/deploy.yml` (preview variant).

### 3. Validate at preview URL

Open https://tradingsandbox.github.io/trading-sandbox-website-preview/ and confirm the staging build is correct.

### 4. Bridge to production via rsync

In the production repo clone, branch off `master` and rsync the preview tree across:

```
cd ~/self/startup/trading-sandbox-website
git checkout master && git pull
git checkout -b feat/<topic>

rsync -av --delete \
  --exclude='.git' \
  --exclude='.github' \
  --exclude='node_modules' \
  --exclude='dist' \
  --exclude='CNAME' \
  ~/self/startup/trading-sandbox-website-preview/ ./

git add .
git commit -m "..."
git push -u origin feat/<topic>
gh pr create --title "..." --body "..."
```

The five excludes are all load-bearing:

| Exclude | Why |
|---|---|
| `.git` | different repos, different history |
| `.github` | preserves prod's `deploy.yml` (the 6-place workflow diff must stay intact) |
| `node_modules`, `dist` | local build artifacts; CI rebuilds |
| `CNAME` | preview never has it; prod's CI guard rejects it on `master` |

### 5. Merge the PR

The PR is internal to `trading-sandbox-website` (same-repo, *not* cross-repo). Merging to `master` triggers `.github/workflows/deploy.yml` (production variant), which publishes to `tradecli.in`.

## Adding content

### Wiki page (`/wiki/...`)

Just create a new `.md` file under `wiki/`. The build picks it up automatically — sitemap entry with `<lastmod>` from git, canonical link pointing to `https://tradecli.in/wiki/...`. No config edits needed.

### Marketing page (e.g., `/pricing/`)

Two-step:

1. **Add an entry to `PAGES_MANIFEST` in `build/build-pages.ts`:**

```ts
{
  source: 'pricing/index.html',
  output: 'pricing/index.html',
  changefreq: 'monthly',
  priority: 0.6,
  indexable: true,
},
```

2. **Create the HTML file.** `<head>` must include `<!-- @@HEAD_BASE@@ -->` to inherit the shared head (canonical, JSON-LD, fonts, etc.). Wrap content in `<main>` between `<!-- @@NAV@@ -->` and `<!-- @@FOOTER@@ -->`. The smoke test fails if `<main>` is missing, so you'll catch it before deploy.

### Lifting a `noindex` page (e.g., `/updates/` going live)

In the same manifest entry: flip `indexable: true` and remove the `robots` field. That's all — sitemap and per-page `<meta robots>` follow automatically.

### Adding new structured data to a page

Inline a `<script type="application/ld+json">` block. The build validates JSON syntax automatically; bad JSON fails the build instead of silently shipping broken markup.

### Adding a new shared HTML fragment that affects every marketing page

Add the path to `SHARED_PAGE_INPUTS` in `build/build-sitemap.ts` so its git mtime contributes to every page's `<lastmod>`. Otherwise edits to it won't refresh the sitemap.

## The workflow file lives in two variants

`.github/workflows/deploy.yml` exists in both repos and **must differ** in exactly six places. The rsync skips `.github/` so this stays intact. If you genuinely need to change CI behavior, edit both files in lockstep.

| # | Setting | Preview | Production |
|---|---|---|---|
| 1 | Trigger branch | `preview` | `master` |
| 2 | `SITE_BASE` | `/trading-sandbox-website-preview/` | `/` |
| 3 | `PREVIEW` env | `"true"` | (unset) |
| 4 | `dist/robots.txt` | overwritten to `Disallow: /` | unchanged |
| 5 | `dist/sitemap.xml`, `dist/wiki/sitemap.xml` | stripped | kept |
| 6 | gh-pages CNAME | omitted | `tradecli.in` |

Both deploys: Node 20 → `npm ci` → `npm test` (smoke test gates deploy) → `npm run build` → push `dist/` to `gh-pages` (`force_orphan: true`).

## CNAME discipline (load-bearing)

- CNAME must **never** appear on `master` (production) or `preview`. Both workflows abort with `exit 1` if a CNAME file is present.
- CNAME lives **only** on production's `gh-pages` branch, written by `peaceiris/actions-gh-pages`'s `cname: tradecli.in` parameter on every deploy.
- The preview fork has no CNAME anywhere — it cannot claim tradecli.in.

## Why this shape

- **Force-reset (not merge) on `preview`** — without it, `preview` accumulates stale commits and the deployed staging artifact stops matching what's in the PR. Reviewers end up validating the wrong thing.
- **Rsync bridge (not git remotes)** — preview and production deliberately diverge on `.github/workflows/deploy.yml`. A normal git push from one to the other would either contaminate the workflow file or require manual fixups every PR.
- **`preview` as default branch, no `master`** — GitHub renders this README on the repo home, and feature work defaults to `preview` because that's the only base. Removing `master` outright eliminates a long-running confusion source: it used to sit at the empty initial-fork state and tempt people to branch from it.
