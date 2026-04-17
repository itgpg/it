# 🚀 IT Department Website - Government Polytechnic Gandhinagar

Welcome to the official, open-source repository for the Information Technology Department website of Government Polytechnic Gandhinagar (GP Gandhinagar).

**Developed by:** Government Polytechnic Gandhinagar IT Department

📍 **Location:** Gandhinagar, Gujarat, India  
📂 **GitHub:** [https://github.com/itgpg/it](https://github.com/itgpg/it)  
🌐 **Live Site:** [https://itgpg.github.io/it/](https://itgpg.github.io/it/)

---

## 🏛️ Architecture & Tech Stack: The "Thick-Client Serverless" Model

This project is built around extremely strict constraints: **Zero Budget (₹0) and Zero Backend Hosting**. 
The architecture bypasses the need for costly VPS/SQL servers by delegating data-management to free-tier cloud platforms and utilizing the student's own browser to process the API requests.

*   **Framework**: [Jekyll](https://jekyllrb.com/) (Static Site Generator)
*   **Hosting**: Native GitHub Pages (Root deployment to preserve existing routing)
*   **Styling**: Custom Vanilla CSS with Bootstrap Grid
*   **Headless CMS Integrations**:
    *   *Static Content*: Faculty structures, configs, and layouts are built via `_data/` JSON and YAML files for SEO.
    *   *Volatile Real-Time Content*: Dynamically fetched using Google Drive API and YouTube API.
*   **Performance Routing Mitigation**: To bypass Google API quota exhaustion from repeated campus clicks, the browser `sessionStorage` interface intercepts requests and caches payloads, yielding massive speed boosts while preserving the free tier.

## 🏗️ Project Structure

*   `_data/` - "Zero-JS Setup": Contains all configurations (`site_config.yml`), playlist IDs, folder IDs, and static site data (`faculty.json`). **Maintainers update these YAML/JSON files, avoiding JavaScript crashes.**
*   `_includes/` - Segmented, reusable UI HTML components (Hero section, Stats, Vision/Mission bounds, Footers, Navbars).
*   `assets/images/` - Site photography, graphics, and meticulously formatted faculty headshots (`shortName.jpeg`).
*   `assets/js/` - The core engine of this platform. It handles the thick-client Google Drive queries, YouTube extraction algorithms, and UI state hydration.

## 📚 Technical Documentation

For a highly detailed breakthrough of the engineering logic, the problems encountered, and the workarounds implemented by the core developer pair, please read:
👉 **[docs/DOCS.md](docs/DOCS.md)**

If you are a student or faculty member taking over the repository updates:
👉 **[MAINTAINING.md](MAINTAINING.md)** provides a step-by-step un-technical guide for legacy handoffs.

---

## 🚀 How to Run Locally

### Prerequisites
- **Ruby** (version 2.7 or higher)
- **Bundler** (`gem install bundler`)
- **Jekyll** (`gem install jekyll`)

### Installation & Server
1. Clone: `git clone https://github.com/itgpg/it.git && cd it`
2. Install: `bundle install`
3. Serve: `bundle exec jekyll serve --port 4000 --host 0.0.0.0`
4. Access at: [http://localhost:4000/](http://localhost:4000/)

## ✨ Developer Contribution & Licensing

The entire project — from zero-budget scalable architecture design, UI/UX interface planning, custom JavaScript APIs, and deployment configurations — was engineered natively by the **IT Department Core Development Team (2024-2025)**.

*Licensed under MIT - Free to use with required developer credit.*
