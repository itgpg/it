# IT Department Website - Government Polytechnic Gandhinagar

Welcome to the open-source repository for the Information Technology Department website of Government Polytechnic Gandhinagar (GP Gandhinagar).

## Architecture & Tech Stack

This project is built for **extreme maintainability, zero hosting costs, and high performance**.

*   **Framework**: [Jekyll](https://jekyllrb.com/) (Static Site Generator)
*   **Hosting**: GitHub Pages
*   **Styling**: Custom CSS and Bootstrap Grid
*   **Content Management System**: Hybrid "Serverless CMS" Architecture
    *   *Static Content*: Formatted via `_data/` JSON and YAML files for SEO.
    *   *Volatile Content (Study Materials)*: Dynamically fetched via Google Drive API and YouTube API directly to the client browser using an optimized `sessionStorage` caching mechanism.

## Project Structure

*   `_data/` - Contains all configuration (API keys, Folder IDs) and site data (Faculty, Toppers). **Edit these files to update the site.**
*   `_includes/` - Reusable UI HTML components (Hero section, Footers, Navbars) for safe editing.
*   `assets/images/` - Site photography, graphics, and faculty headshots.
*   `assets/js/` - Logic for the Google Drive integration and UI Management.

## Legacy Maintenance

If you have been assigned to maintain this website, please read the `MAINTAINING.md` document located in this repository. It provides a comprehensive, non-technical guide on how to safely update the Google Drive study materials and add new faculty members without risking code breakage.

## Contributing

We welcome contributions from students and faculty! If you spot a bug or want to add a feature:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

---
**Designed and Developed natively by the 2024-2025 IT Department Core Team.**
