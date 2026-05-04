# Certificate Verification System

## Overview

The certificate verification system allows students to look up and download their workshop/event certificates by entering a unique certificate ID. The system searches a structured Google Drive folder hierarchy and returns the matching PDF.

**Files involved**:
- `co-curricular/certificate-verification/index.html` — Page markup
- `assets/js/pages/certificate-verification.js` — Search engine logic
- `assets/css/pages/certificate-verification.css` — Page styling

---

## Certificate ID Format

```
GPG  MM  YYYY  NNN
 │    │    │    │
 │    │    │    └── 3-digit unique number (001–999)
 │    │    └── 4-digit year
 │    └── 2-digit month (01–12)
 └── Institution prefix (always "GPG")
```

**Example**: `GPG092025001` → September 2025, certificate #001

---

## Google Drive Folder Structure

The root certificates folder (configured in `site_config.yml` as `FOLDER_IDS.certificates`) must be organized as:

```
Root Folder
├── 01/                    ← January
│   ├── 2024/
│   │   ├── GPG012024001.pdf
│   │   └── GPG012024002.pdf
│   └── 2025/
│       └── GPG012025001.pdf
├── 02/                    ← February
│   ├── 2024/
│   └── 2025/
├── ...
├── 09/                    ← September
│   └── 2025/
│       ├── GPG092025001.pdf
│       └── GPG092025002.pdf
└── 12/                    ← December
    ├── 2024/
    └── 2025/
```

**Rules**:
- Month folders are named with zero-padded numbers: `01`, `02`, ... `12`
- Year folders are 4-digit: `2024`, `2025`, etc.
- Certificate files are named exactly as the certificate ID + extension
- Supported extensions: `.pdf`, `.png`, `.jpg`, `.jpeg`
- All folders must have sharing set to "Anyone with the link can view"

---

## Search Algorithm

```
Input: GPG092025001
           │
           ├─ Parse month: "09"
           ├─ Parse year: "2025"
           └─ Parse ID: "GPG092025001"
           │
           ▼
Step 1: List subfolders of Root Folder
        → Find folder named "09"
           │
           ▼
Step 2: List subfolders of "09"
        → Find folder named "2025"
           │
           ▼
Step 3: List files in "2025"
        → Find file starting with "GPG092025001"
           │
           ├── Found → Show success state + download link
           └── Not found → Show error state
```

Each step is a separate Google Drive API call using folder traversal.

---

## UI Features

| Feature | Description |
|---------|-------------|
| Real-time validation | Validates format as user types (length, prefix, month range) |
| Loading spinner | Shown during API calls with submit button disabled |
| Success animation | Confetti effect on successful certificate match |
| Download options | Direct download link to the certificate file |
| QR code generation | On-demand QR code pointing to the certificate (uses QRCode.js) |
| Error handling | Clear messages for invalid format, not found, and API errors |
| Particle background | Subtle animated canvas background |

---

## Configuration

Certificate folder ID is managed in `_data/site_config.yml`:

```yaml
FOLDER_IDS:
  certificates: '1vXU0cCwrYplFhmrGLu3MYuf1fVJeylWQ'
```

The API key used for Drive lookups is the global `API_KEY` in the same file.

---

## Adding Certificates

1. Navigate to the root certificates Drive folder
2. Create month/year subfolders if they don't exist (e.g., `03/2025/`)
3. Upload the certificate file named as the certificate ID (e.g., `GPG032025001.pdf`)
4. Ensure folder sharing is set to "Anyone with the link can view"

No code changes needed — the search engine dynamically traverses the folder structure.

---

## Dependencies

- **QRCode.js** — loaded via CDN on the certificate verification page
- **Google Drive API v3** — file listing and folder traversal
- **Canvas API** — particle background animation and confetti effect
