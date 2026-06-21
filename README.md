# Portfolio — Praveen Kanna

Static portfolio: **semantic HTML**, **CSS** (custom properties, flex, grid), and a small **vanilla JS** layer — no build step, easy to host anywhere.

## For recruiters (quick checklist)

1. **Live site** — Default canonical is `https://praveenkannaayyasamy.github.io/portfolio/` (update in `index.html` / `resume.html` / `now.html` / `uses.html` / `404.html` if you use a custom domain).
2. **Résumé PDF** — `resume/Praveen-Kanna-Resume.pdf` (see `resume/README.md`).
3. **Printable CV** — Open `resume.html` → **Print → Save as PDF**.
4. **LinkedIn** — Public profile `https://www.linkedin.com/in/praveen-kanna-ayyasamy` is the source of truth for headline, experience length (~3+ yrs), and learning themes (e.g. GenAI, DSA, design patterns) reflected on the site.
5. **Medium** — Links use `https://medium.com/@praveenkannaayyasamy` (aligned with your GitHub handle). CI link checks skip that URL via `.lycheeignore` until it resolves.

## What’s included (for recruiters & developers)

- **Visual theme** — Google’s **blue / red / yellow / green** accents on a light mesh background (dark mode: deeper tinted panels); cards and sections use soft gradients and colored borders while keeping type readable.
- **Dark / light theme** — Toggle in header; respects `prefers-color-scheme` on first visit; saved in `localStorage`.
- **Scroll progress** bar (top of viewport).
- **Skip to content** link and visible **focus** styles on interactive elements.
- **Section headers** with a short accent rule under each title, plus **JetBrains Mono** for stack tags and similar labels.
- **`now.html`** — lightweight “[now](https://nownownow.com/about)” snapshot (update dates/bullets as your story changes).
- **`uses.html`** — stack, editor, how this site is built, and a **public API docs** placeholder (OpenAPI / Postman) for when you publish a spec (theme syncs with `localStorage` like `now.html`).
- **Canonical URL**, **`og:url`**, **`twitter:url`**, and **JSON-LD** `Person` schema (defaults to the GitHub Pages URL above).
- **Tech strip** with [Devicon](https://github.com/devicons/devicon) SVGs (CDN); each icon links to **official documentation** (honest “learn more”, not project claims).
- **Selected work** (case-study cards).
- **Contact** row: LinkedIn, GitHub, Instagram, YouTube, Medium, email, phone.
- **My builds** — project cards with **Live** + **Source** links (`#my-builds`).
- **Open Graph / Twitter** card meta for link previews.
- **GitHub repo grid** — loads **all public repositories** across **multiple API pages** (100 per page until GitHub returns a short page). Renders in batches (**12** at first, **Load more** adds **12** more). Add **`?demo=1`** to preview **28 sample repos** without calling the API. Unauthenticated API has a **rate limit** (~60 requests/hour per IP); if loading fails, the fallback link appears (and the error hint mentions `?demo=1`).
- **Copy email** button on the contact section (uses Clipboard API when available).
- **Footer** — “All sections” shortcuts (`#my-builds`, `#repos`, `#skills`) without changing the primary header nav.
- **GitHub Pages `404.html`** — friendly “page not found” with links back to the portfolio.
- **Print** — basic `@media print` rules in `styles.css` (hide scroll bar + theme toggle, avoid awkward breaks inside major cards).
- **Motion** — `prefers-reduced-motion` respected in CSS; `script.js` listens for **live** preference changes and toggles scroll-reveal behavior.
- **Playful touches** — rotating hero one-liners, gentle avatar float + name hover nudge, **Konami** (↑ ↑ ↓ ↓ ← → ← → **B** **A** on a physical keyboard, not in form fields), and a **footer rainbow-dot** click order mini-game (all toned down or disabled when reduced motion is on).

## CI (GitHub Actions)

On **push** / **pull_request** to `main` or `master`, `.github/workflows/ci.yml` runs:

1. **HTML5 validation** (`html5validator`) on `index.html`, `resume.html`, `now.html`, `uses.html`, and `404.html`.
2. **Link checking** ([lychee](https://github.com/lycheeverse/lychee)) against `**/*.html` and `**/*.md`, with `--base` set to the GitHub Pages URL so relative links resolve. URLs listed in `.lycheeignore` are skipped (e.g. Medium until the profile exists).

## Deploy (GitHub Pages)

1. Push this repo to GitHub (e.g. `PraveenKannaAyyasamy/portfolio`).
2. Repo **Settings → Pages**: **Source** = **Deploy from a branch**, branch **main** (or **master**), folder **`/ (root)`**.
3. Wait for the Pages build; the site will be at `https://<user>.github.io/<repo>/`. Update canonical URLs in HTML if you add a custom domain.

Other static hosts (Netlify, Vercel, Cloudflare Pages): set the **publish directory** to the repo root and use the same URL in canonical meta if you rely on absolute `og:url` / JSON-LD.

## Run locally

From the **repository root** (where `index.html` lives):

**Option A — [serve](https://github.com/vercel/serve)** (needs Node / npm):

```bash
npx --yes serve@14 . --listen 3000
```

Then open **http://127.0.0.1:3000/** (or **http://localhost:3000/**). Stop with **Ctrl+C**.

**Option B — Python** (no npm; uses whatever `python` is on your PATH):

```bash
python -m http.server 8080
```

Then open **http://127.0.0.1:8080/**. Stop with **Ctrl+C**.

You can also open **`index.html`** directly in the browser; a local server is better for checking paths, `fetch` to the GitHub API, and habits closer to production.

## Customize

1. **Canonical & social URLs** — In `index.html`, search for `praveenkannaayyasamy.github.io/portfolio` and replace with your real site (and update `resume.html` / `now.html` / `uses.html` / `404.html` canonical if you use a custom domain). Search for `instagram.com/`, `youtube.com/@`, and **`medium.com/@praveenkannaayyasamy`** and replace if your handles differ.
2. **Portfolio repo name** — If your GitHub repo is not named `portfolio`, update **My builds → Portfolio** `Live` / `Source` URLs in `index.html` to match your GitHub Pages path.
3. **Email / phone** — Update in `index.html` and `resume.html` (and JSON-LD if needed).
4. **Profile** — `images/profile.png` (see `images/README.md`).
5. **Résumé PDF** — Export your CV and save as `resume/Praveen-Kanna-Resume.pdf`.
6. **LinkedIn alignment** — Experience, education blurbs, **Selected work**, **About**, **Now**, and the hero **Start here** line are aligned with your **public** LinkedIn profile (`linkedin.com/in/praveen-kanna-ayyasamy`), not the authenticated API. Update HTML when your LinkedIn story changes.
7. **Education** — Add your **institution name** on the printable CV (`resume.html`) and on the PDF if not shown on the portfolio page.
8. **Projects & repos** — Refine **Selected work** copy as your public story evolves.
9. **Deploy** — GitHub Pages, Netlify, or Vercel (static root).

## Ideas to add later (impress developers more)

| Idea | Why it stands out |
|------|-------------------|
| **OpenAPI / Postman** link for an API you own | Signals API craft. Add URLs in **`uses.html`** (section “Public API docs”) when ready. |
| **Blog + RSS** | Add a `feed.xml` and `<link rel="alternate" type="application/rss+xml">` when you publish posts. |
| **Lighthouse in CI** | Gate accessibility/SEO with [Lighthouse CI](https://github.com/GoogleChrome/lighthouse-ci) (adds Node to your pipeline). |
| **Playwright smoke test** | One script that checks `index.html` loads and `#contact` exists. |

## Files

| File | Role |
|------|------|
| `index.html` | Main site |
| `now.html` | Short “now” snapshot + writing links |
| `uses.html` | Stack, editor, and site build notes |
| `resume.html` | Print-friendly CV |
| `404.html` | GitHub Pages “not found” page |
| `styles.css` | Layout, light/dark tokens, motion |
| `script.js` | Nav, theme, scroll progress, reveal, copy email, GitHub grid |
| `resume/` | Your `Praveen-Kanna-Resume.pdf` + readme |
| `images/` | `profile.png` |
| `.github/workflows/ci.yml` | HTML5 validation + lychee link check |
| `.lycheeignore` | URLs to skip in lychee (e.g. Medium until live) |
