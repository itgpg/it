# Frequently Asked Questions (FAQ)

## For Maintainers

### 1. Why don't we use a real database like Firebase or MongoDB?
Because the IT Department website operates on a **$0 budget**. Traditional databases incur monthly cloud costs and require maintenance. By using Google Drive as a "headless database", we get unlimited storage (via institutional accounts) and a visual UI (the Drive app) for faculty to manage files, entirely for free.

### 2. Can I use Tailwind CSS instead of Vanilla CSS?
No. To ensure long-term maintainability by students who may only have basic web development knowledge, we strictly adhere to Vanilla CSS and Bootstrap 5 utilities. Introducing Node.js build steps (like Tailwind or Webpack) breaks the simplicity of the Jekyll setup.

### 3. How do I change the API key?
Follow the detailed guide in [Google Services](GOOGLE_SERVICES.md). You must generate a new key in the Google Cloud Console and update `_data/site_config.yml`.

### 4. Why are the `docs/archived/` files still here?
The previous maintainers specifically requested they be kept as historical artifacts. Do not use them as a source of truth for current system architecture.

---

## For Users / Students

### 1. Why isn't my certificate downloading?
Ensure you are typing the Certificate ID exactly as it was provided (e.g., `GPG092025001`). If it still fails, the system might be experiencing a temporary Google API quota limit. Try again in a few hours.

### 2. The study materials page is blank. What do I do?
Your browser's `sessionStorage` might be corrupted. Try hard-refreshing the page (`Ctrl+Shift+R` on Windows, `Cmd+Shift+R` on Mac) or opening the site in an Incognito window.
