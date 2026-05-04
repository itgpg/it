# Maintainer Quick-Start

If you've been tasked with maintaining this website, start here. **You do not need to know JavaScript.**

---

## The Golden Rule

**Never edit `.js` or `.html` files for standard content updates.** All content is managed through data files in `_data/`.

For full instructions, see the [Content Guide](docs/CONTENT_GUIDE.md).

---

## Common Tasks (Cheat Sheet)

| Task | What to edit |
|------|-------------|
| Add/remove faculty | `_data/faculty.json` + photo in `assets/images/faculty_imgs/` |
| Add study material folder | `_data/site_config.yml` → `FOLDER_IDS` section |
| Add YouTube playlist | `_data/site_config.yml` → `PLAYLIST_IDS` section |
| Add event | New `.md` file in `_events/` |
| Add newsletter | Upload PDF to the newsletters Google Drive folder |
| Add academic calendar | Upload PDF to the academic calendar Google Drive folder |
| Add certificate | Upload to the certificates Drive folder (Month/Year structure) |
| Change API key | `_data/site_config.yml` → `API_KEY` field |

---

## API Key Security

The Google API key is visible in client-side code. It is protected by **HTTP referrer restriction** in the Google Cloud Console — it only works on `itgpg.github.io`.

If the key expires:
1. Generate a new key in [Google Cloud Console](https://console.cloud.google.com/)
2. Restrict it to `*itgpg.github.io/*`
3. Paste into `_data/site_config.yml`

---

## Local Development

```bash
# Prerequisites: Ruby 2.7+, Bundler
gem install bundler
git clone https://github.com/itgpg/it.git && cd it
bundle install
bundle exec jekyll serve --livereload
# Open http://localhost:4000/it/
```

---

## Need More Detail?

- **Full architecture**: [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
- **Content update workflows**: [docs/CONTENT_GUIDE.md](docs/CONTENT_GUIDE.md)
- **Certificate system**: [docs/CERTIFICATE_SYSTEM.md](docs/CERTIFICATE_SYSTEM.md)
