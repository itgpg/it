# Security Policy

## Supported Versions

Currently, only the `main` branch deployed to GitHub Pages is supported with security updates.

| Version | Supported          |
| ------- | ------------------ |
| `main`  | :white_check_mark: |
| older   | :x:                |

---

## API Key Exposure & Restrictions

Due to the "Thick-Client Serverless" architecture of this project, the Google API key (used for Drive and YouTube Data access) is inherently exposed in the client-side JavaScript (`window.CONFIG.API_KEY`).

**This is a known and accepted design constraint.** 

To secure the key against malicious use, it **must** be protected via **HTTP Referrer Restrictions** within the Google Cloud Console. 

The key is configured to strictly allow requests originating from:
- `*itgpg.github.io/*`
- `http://localhost:4000/*` (For local development only)

If you suspect the API key is being abused (e.g., sudden quota exhaustion), it must be immediately regenerated and updated in `_data/site_config.yml`. See [Google Services](docs/GOOGLE_SERVICES.md) for instructions.

---

## Reporting a Vulnerability

We take the security of the department website seriously. If you discover a vulnerability (e.g., XSS, cache poisoning, bypass of the certificate verification engine), please do **not** open a public issue.

Instead, please privately report the vulnerability to the current managing faculty member or the lead student maintainer. 

When reporting, please include:
- A detailed description of the vulnerability.
- Step-by-step instructions to reproduce it.
- (Optional) A proposed patch or mitigation strategy.

The maintainer team will verify the vulnerability and deploy a patch as quickly as possible.
