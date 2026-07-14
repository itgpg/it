# Future Roadmap

This document outlines suggested technical improvements and refactoring goals for future maintainers. 

Since the site operates on a $0 budget, these improvements are aimed at increasing performance, stability, and developer experience without introducing cloud costs.

## Phase 1: Stability & Technical Debt

1. **Automated Content Validation**
   - Write a simple GitHub Actions Python/Ruby script to validate that all images in `assets/images/faculty_imgs/` have a corresponding entry in `faculty.json`, and delete unused ones automatically.

## Phase 2: Architecture Upgrades

1. **Implement a Proxy Server (Cloudflare Workers)**
   - **Problem**: Client-side API calls to Google Drive can exhaust quotas if too many students use the site simultaneously.
   - **Solution**: Route `fetch()` requests through a Cloudflare Worker (Free Tier). The worker can cache the Google API JSON response globally for 5 minutes, ensuring that Google's servers are only hit once every 5 minutes, regardless of how many students are online.
2. **TypeScript Migration**
   - **Problem**: Because `window.CONFIG` is injected at runtime, typos in the YAML file cause silent undefined errors in the JavaScript.
   - **Solution**: Convert `.js` files to `.ts` and write JSDoc interfaces matching `site_config.yml` to catch errors at compile time.

## Phase 3: UI/UX Enhancements

1. **Progressive Web App (PWA)**
   - Add a `manifest.json` and a Service Worker to allow students to install the website as an app on their phones.
   - Cache static assets (CSS, logos) so the site loads instantly on mobile networks.
2. **Dark Mode**
   - Implement a CSS variable (`var(--bg-color)`) driven dark mode toggle, respecting `prefers-color-scheme`.
