# Architectural Decision Records (ADRs)

## ADR 1: The Thick-Client Serverless Model

**Context:** 
The IT Department required a robust website to serve PDFs, manage event galleries, and offer a certificate lookup system. However, the department operates with a strict **$0 cloud infrastructure budget**. 

**Decision:**
Instead of a traditional LAMP stack, Node.js backend, or relying on AWS/Heroku, we decided to offload all computational logic and database querying to the user's browser. 

**Consequences:**
- **Pros:** Completely free to host indefinitely via GitHub Pages. Zero server maintenance.
- **Cons:** Exposes API keys to the frontend (mitigated via HTTP referrers). Relies on Google API rate limits.

---

## ADR 2: Google Drive as a Headless CMS

**Context:**
GitHub Repositories have a strict 1GB size limit. We could not store gigabytes of academic PDFs or high-resolution gallery images locally in the repository.

**Decision:**
We utilize Google Drive as our file storage and database. Faculty upload documents directly via the Google Drive UI on their phones or laptops. The website uses the Drive API v3 to dynamically render those folders into web interfaces.

**Consequences:**
- **Pros:** Faculty do not need to learn GitHub or Markdown to upload study materials. Unlimited storage via institutional Google accounts.
- **Cons:** Folder permissions must be manually set to "Anyone with the link". 

---

## ADR 3: Vanilla JavaScript & CSS over Modern Frameworks (React/Tailwind)

**Context:**
The repository will be handed down to 1st and 2nd-year diploma students annually. Introducing complex build tools (Webpack, Vite) or steep learning curves (React, Vue, Tailwind CSS) would severely hinder maintainability.

**Decision:**
We exclusively use Vanilla ES6+ JavaScript, Vanilla CSS, and standard Bootstrap 5 classes via CDN.

**Consequences:**
- **Pros:** Any student who has completed basic web development coursework can instantly understand and contribute to the repository.
- **Cons:** Lack of state management libraries makes complex DOM manipulation slightly more verbose.
