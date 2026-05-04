# System Architecture

## Overview

The ITGPG website is a **static Jekyll site** hosted on GitHub Pages that acts as a thick-client application. All dynamic data (study materials, certificates, newsletters, gallery images) is fetched client-side from Google Drive and YouTube APIs — there is no backend server.

**Key constraint**: Zero budget. No VPS, no database, no cloud functions.

```
┌──────────────────────────────────────────────────────┐
│                    GitHub Pages                       │
│              (Static HTML/CSS/JS host)                │
└──────────────────┬───────────────────────────────────┘
                   │ serves
                   ▼
┌──────────────────────────────────────────────────────┐
│               Student's Browser                       │
│  ┌─────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │  Jekyll HTML │  │  JavaScript  │  │ sessionStorage│ │
│  │  (static)    │  │  (API calls) │  │  (cache)      │ │
│  └─────────────┘  └──────┬───────┘  └──────────────┘ │
└──────────────────────────┼───────────────────────────┘
                           │ fetch()
              ┌────────────┼────────────┐
              ▼            ▼            ▼
        Google Drive   YouTube API   Google Drive
        (PDFs, certs)  (playlists)   (gallery imgs)
```

---

## Project Structure

```
it/
├── _config.yml                  # Jekyll config (baseurl, plugins, collections, defaults)
├── Gemfile                      # Ruby deps (github-pages, wdm)
├── index.html                   # Home page (includes hero, stats, about, contact)
│
├── _data/                       # ⭐ Zero-JS config hub — maintainers edit ONLY these files
│   ├── site_config.yml          # API key, all Drive folder IDs, YouTube playlist IDs
│   ├── faculty.json             # Faculty profiles (name, designation, shortName, etc.)
│   └── toppers_list.json        # Student achievement records
│
├── _layouts/
│   ├── default.html             # Master layout (SEO meta, OG tags, JSON-LD, CSS/JS injection)
│   └── event.html               # Event detail page layout
│
├── _includes/
│   ├── home/                    # Home page partials
│   │   ├── hero.html            # Landing hero section
│   │   ├── about.html           # Vision/mission section
│   │   ├── stats.html           # Key stats counters
│   │   └── contact.html         # Contact info section
│   └── components/              # Shared components
│       ├── navbar.html          # Site-wide navigation bar
│       └── footer.html          # Site-wide footer
│
├── assets/
│   ├── images/
│   │   ├── gpg-logo.png         # Main logo
│   │   ├── gpg-logo-mini.png    # Navbar logo
│   │   ├── favicon.png          # Favicon
│   │   ├── apple-touch-icon.png # Apple touch icon
│   │   ├── contributors/        # Contributor profile photos
│   │   └── faculty_imgs/        # Faculty headshots (named by shortName, e.g. asp.jpeg)
│   ├── css/
│   │   ├── main.css             # Global styles
│   │   ├── components/          # Component-scoped styles
│   │   │   ├── navbar.css
│   │   │   ├── footer.css
│   │   │   ├── hero.css
│   │   │   └── gallery.css
│   │   └── pages/               # Page-scoped styles
│   │       ├── study-materials.css
│   │       ├── certificate-verification.css
│   │       ├── events.css
│   │       ├── faculty.css
│   │       ├── newsletters.css
│   │       ├── academic-calendar.css
│   │       ├── co-curricular.css
│   │       ├── contributors.css
│   │       ├── faculty-development.css
│   │       └── links.css
│   └── js/
│       ├── config.js            # Liquid template → injects site_config.yml as window.CONFIG
│       ├── main.js              # Bootstrap tooltips/popovers init, smooth scrolling
│       ├── components/
│       │   ├── StudyData.js     # Semester/subject/module data structure (reads from CONFIG)
│       │   ├── YouTubeHandler.js # YouTube playlist fetcher + Drive file fetcher
│       │   └── hero.js          # Hero section interactivity
│       └── pages/
│           ├── study-materials.js       # Study materials page controller
│           ├── gallery.js               # Gallery — fetches images from Drive folders
│           ├── certificate-verification.js  # Certificate lookup engine
│           ├── newsletter.js            # Newsletter PDF listing from Drive
│           ├── academic-calendar.js     # Academic calendar PDFs from Drive
│           ├── events.js                # Event page rendering
│           └── contributors.js          # Contributors page
│
├── _events/                     # Jekyll collection — event markdown files
│   ├── 2025-discovering-ai.md
│   ├── 2024-ethical-hacking.md
│   └── ...
│
├── gallery/index.html           # Gallery page
├── faculty/
│   ├── faculty-info/            # Faculty profiles page
│   └── faculty-achievements/    # Faculty achievements page
├── newsletter/index.html        # Newsletter listing page
├── co-curricular/
│   ├── index.html               # Co-curricular hub page
│   ├── events/                  # Events listing
│   ├── expert-lecture/          # Expert lectures
│   ├── faculty-development/     # FDP records
│   ├── industrial-visit/        # IV records
│   └── certificate-verification/index.html  # Certificate verifier
├── student-corner/
│   ├── study-material/          # Study materials portal
│   ├── academic-calendar/       # Academic calendar viewer
│   └── achievements/            # Student achievements
├── links/index.html             # Useful links page
├── contributors/index.html      # Project contributors
│
├── docs/                        # ← You are here
├── robots.txt                   # Search crawler directives
└── sitemap.xml                  # Sitemap for SEO
```

---

## Data Flow

### The Config Pipeline

All API keys and external resource IDs live in one file: `_data/site_config.yml`.

```
_data/site_config.yml          (YAML — human-editable)
        │
        │  Jekyll build (Liquid: {{ site.data.site_config | jsonify }})
        ▼
assets/js/config.js            (compiled to raw JS)
        │
        │  <script> tag in default.html
        ▼
window.CONFIG                  (global JS object available to all page scripts)
        │
        ├─→ CONFIG.API_KEY              → used by all Google API fetch() calls
        ├─→ CONFIG.FOLDER_IDS.xxx       → Google Drive folder IDs
        ├─→ CONFIG.PLAYLIST_IDS.xxx     → YouTube playlist IDs
        └─→ CONFIG.yr_XXXX_XXXX.semX   → Year-specific syllabus folders
```

### Custom CSS/JS Injection

Pages declare dependencies in their front-matter:

```yaml
---
custom_css:
  - /assets/css/pages/study-materials.css
custom_js:
  - /assets/js/components/StudyData.js
  - /assets/js/components/YouTubeHandler.js
  - /assets/js/pages/study-materials.js
---
```

The `default.html` layout iterates these arrays to inject `<link>` and `<script>` tags.

---

## Google Drive Integration

### Pattern: Folder → API → DOM

Every dynamic page follows the same pattern:

1. Read folder ID from `window.CONFIG`
2. `fetch()` the Google Drive v3 API: list files in that folder
3. Parse the JSON response
4. Render items into the DOM

### sessionStorage Caching

To prevent Google API quota exhaustion (especially with 50+ students clicking simultaneously), all fetched data is cached in `sessionStorage`:

```javascript
const cacheKey = `cache_${semester}_${subject}_${module}`;
const cached = sessionStorage.getItem(cacheKey);

if (cached) {
    // 0ms render — no network request
    this.allItems = JSON.parse(cached);
} else {
    // Fetch from API, then cache
    const data = await fetchFromDrive(folderId);
    sessionStorage.setItem(cacheKey, JSON.stringify(data));
}
```

Cache persists for the browser tab session. Closing the tab clears the cache, ensuring freshness.

---

## YouTube Integration

`YouTubeHandler.js` provides two static methods:

| Method | API | Purpose |
|--------|-----|---------|
| `fetchPlaylistVideos(playlistId)` | YouTube Data API v3 | Fetches all videos from a playlist (handles pagination via `nextPageToken`) |
| `fetchFileName(folderId)` | Google Drive v3 | Lists files in a Drive folder (used for study material PDFs) |

Both use `CONFIG.API_KEY` for authentication.

---

## SEO Strategy

Implemented in `_layouts/default.html`:

| Technique | Implementation |
|-----------|---------------|
| Title suffix | `{{ page.title }} \| ITGPG` on every page |
| Meta description | Per-page via front-matter `description` field |
| Meta keywords | Per-page via front-matter `keywords` field |
| Open Graph tags | `og:title`, `og:description`, `og:image`, `og:url` |
| Twitter Cards | `summary_large_image` card type |
| JSON-LD | `EducationalOrganization` schema on every page + detailed schema on home |
| Canonical URL | Auto-generated from `site.url + site.baseurl + page.url` |
| Sitemap | `jekyll-sitemap` plugin generates `sitemap.xml` |
| Robots | Custom `robots.txt` |

---

## External Dependencies

| Dependency | Version | Loaded Via |
|------------|---------|------------|
| Bootstrap CSS | 5.3.0 | CDN (cloudflare) |
| Bootstrap JS | 5.3.0 | CDN (cloudflare) |
| Font Awesome | 6.0.0 | CDN (cloudflare) |
| Google APIs JS | latest | CDN (apis.google.com) — gallery page only |
| QRCode.js | latest | CDN — certificate page only |
| Jekyll | via github-pages gem | Local build / GitHub Actions |
| jekyll-sitemap | via github-pages | Plugin |
| jekyll-seo-tag | via github-pages | Plugin |

---

## Known Issues / TODOs

- **`academic-calendar.js` line 9**: Parent folder ID (`16a58BgCLN8h0SnGxjnYFGDdkfWqcuS49`) is hardcoded instead of reading from `CONFIG.FOLDER_IDS.academic_calendar`. Should be refactored for consistency.
- **Gallery folder ID**: Currently set to the same value as `certificates` in `site_config.yml`. Needs to be configured with the actual gallery Drive folder.
- **Semester 5 & 6 data in `StudyData.js`**: References playlist IDs (`CONFIG.PLAYLIST_IDS.ai`, `.cloud`, `.mobile_dev`, `.blockchain`, `.big_data`, `.iot`) and folder IDs (`CONFIG.FOLDER_IDS.project`) that don't exist in `site_config.yml`. These will fail silently.
- **`FOLDER_IDS.cse`** referenced in `StudyData.js` line 33 doesn't exist as a top-level key — only exists under `pyq.sem_1.cse`.
