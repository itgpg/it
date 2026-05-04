# ITGPG — IT Department Website

Official website for the Information Technology Department at Government Polytechnic Gandhinagar.

📂 **Repository**: [github.com/itgpg/it](https://github.com/itgpg/it)
🌐 **Live Site**: [itgpg.github.io/it](https://itgpg.github.io/it/)

---

## Architecture

**Thick-Client Serverless** — a zero-budget static site that offloads all data fetching to the student's browser.

| Layer | Technology |
|-------|-----------|
| Framework | Jekyll (Static Site Generator) |
| Hosting | GitHub Pages |
| Styling | Custom CSS + Bootstrap 5.3 Grid |
| Dynamic Data | Google Drive API + YouTube API (client-side `fetch()`) |
| Caching | `sessionStorage` — prevents API quota exhaustion |
| Config | `_data/site_config.yml` → compiled to `window.CONFIG` at build time |

> For the full architecture breakdown, see [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md).

---

## Project Structure (Key Directories)

```
_data/           → Config hub: API keys, Drive IDs, faculty data, playlists
_includes/       → Reusable HTML components (navbar, footer, hero, etc.)
_layouts/        → Page templates (default.html, event.html)
_events/         → Event collection (Markdown files)
assets/js/       → Client-side engine (Drive/YouTube fetchers, page controllers)
assets/css/      → Styles (global + component + page scoped)
docs/            → Technical documentation
```

---

## Quick Start

### Prerequisites
- Ruby 2.7+
- Bundler (`gem install bundler`)

### Run Locally
```bash
git clone https://github.com/itgpg/it.git && cd it
bundle install
bundle exec jekyll serve --livereload
```
Open [http://localhost:4000/it/](http://localhost:4000/it/)

---

## Documentation

| Doc | For |
|-----|-----|
| [Architecture](docs/ARCHITECTURE.md) | System design, file tree, data flow | 
| [Content Guide](docs/CONTENT_GUIDE.md) | Updating content without writing code |
| [Certificate System](docs/CERTIFICATE_SYSTEM.md) | Certificate verification engine |
| [Maintainer Quick-Start](MAINTAINING.md) | First-time maintainer setup |

---

## License

MIT — Free to use with developer credit.

**Built by** the IT Department Core Development Team (2024–2025), Government Polytechnic Gandhinagar.
