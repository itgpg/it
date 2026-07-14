# ITGPG — IT Department Website

[![GitHub Pages](https://img.shields.io/badge/Hosted_on-GitHub_Pages-blue?logo=github)](https://itgpg.github.io/it/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The official website for the **Information Technology Department at Government Polytechnic Gandhinagar**. 

Built entirely as a **Thick-Client Serverless Application**, this static site dynamically fetches study materials, event details, and digital certificates natively from Google Drive and YouTube APIs, incurring **$0 in cloud infrastructure costs**.

🌐 **Live Demo**: [itgpg.github.io/it](https://itgpg.github.io/it/)

---

## 📸 Screenshots

*(Maintainer: Add screenshots of the Home Page, Study Materials, and Certificate Verification here)*
<!-- ![Home Page](/assets/images/screenshots/home.png) -->
<!-- ![Study Materials](/assets/images/screenshots/study.png) -->

---

## ✨ Features

- **Serverless Content Management**: Faculty upload PDFs to Google Drive, and the site dynamically renders them into a UI.
- **Certificate Verification Engine**: Instant lookup and download of event certificates directly from Google Drive.
- **YouTube API Integration**: Curated educational playlists fetched seamlessly.
- **Zero-JS Maintenance**: Site configuration and content updates are managed via simple YAML/JSON files.
- **Client-Side Caching**: Aggressive `sessionStorage` caching prevents Google API quota exhaustion.
- **SEO Optimized**: Fully equipped with JSON-LD, Open Graph tags, and dynamic metadata routing.

---

## 🛠 Tech Stack

- **Framework**: [Jekyll](https://jekyllrb.com/) (Static Site Generator)
- **Hosting**: GitHub Pages
- **Styling**: Vanilla CSS + Bootstrap 5.3 Grid
- **Backend/Database**: Google Drive API v3 & YouTube Data API v3 (Client-side execution)
- **Language**: JavaScript (ES6+), HTML5, Liquid

---

## 🏗 Architecture Summary

This project circumvents traditional VPS or Database requirements by treating Google Drive as a Headless CMS.

1. The site is statically built via Jekyll.
2. The user's browser requests the static HTML/JS from GitHub Pages.
3. The JavaScript securely invokes Google APIs using a referrer-restricted key.
4. Data is fetched, mapped into the DOM, and immediately cached in the browser's `sessionStorage` to drastically improve performance and save API quota limits.

For an in-depth dive into the technical design, see the [Architecture Overview](docs/ARCHITECTURE.md).

---

## 🚀 Local Development

Want to run the site locally to test changes?

```bash
# 1. Clone the repository
git clone https://github.com/itgpg/it.git
cd it

# 2. Install dependencies (Requires Ruby 2.7+)
gem install bundler
bundle install

# 3. Serve the site locally
bundle exec jekyll serve --livereload
```
Navigate to `http://localhost:4000/it/`. For comprehensive setup steps on different OS environments, see the [Development Guide](docs/DEVELOPMENT.md).

---

## 📚 Documentation Index

Whether you are a new maintainer, a student wanting to contribute code, or faculty updating the syllabus, everything you need is fully documented.

### Core Architecture & Systems
- [Architecture Deep Dive](docs/ARCHITECTURE.md)
- [Project Structure](docs/PROJECT_STRUCTURE.md)
- [Google Services & API Setup](docs/GOOGLE_SERVICES.md)
- [API Reference](docs/API_REFERENCE.md)
- [Architectural Decisions (ADRs)](docs/DECISIONS.md)

### Maintenance & Operations
- [Maintainer Handover Guide](MAINTAINING.md) 🌟 **(Start Here if you are the new admin)**
- [Content Workflow](docs/CONTENT_WORKFLOW.md) *(Updating text, faculty, and files)*
- [Configuration Map](docs/CONFIGURATION.md)
- [Deployment Guide](docs/DEPLOYMENT.md)
- [Release Process](docs/RELEASE_PROCESS.md)
- [Troubleshooting](docs/TROUBLESHOOTING.md)
- [Project Handover Checklist](docs/HANDOVER.md)

### Contributing
- [Contributing Guidelines](CONTRIBUTING.md)
- [Local Development Setup](docs/DEVELOPMENT.md)
- [Security Policy](SECURITY.md)
- [Changelog](CHANGELOG.md)

---

## 🙋 FAQ

**Q: Do I need to know JavaScript to update the website content?**  
A: No. All content (faculty profiles, Drive folders, YouTube links) is controlled via simple text files in the `_data/` directory. See the [Content Workflow](docs/CONTENT_WORKFLOW.md).

**Q: The study materials are not loading, what do I do?**  
A: This usually means the Google API key quota has been exhausted for the day, or a Drive folder ID is incorrect. Check the [Troubleshooting Guide](docs/TROUBLESHOOTING.md).

---

## 🤝 Contributing

We welcome contributions from IT students! Whether you're fixing a bug, designing a new page, or optimizing the JavaScript, please review our [Contributing Guidelines](CONTRIBUTING.md) before opening a Pull Request.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

**Built with ❤️ by the IT Department Core Development Team (2024–2025), Government Polytechnic Gandhinagar.**
