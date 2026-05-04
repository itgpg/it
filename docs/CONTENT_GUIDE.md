# Content Guide (Zero-JS Workflow)

This site is designed so that **you never need to edit JavaScript or HTML** to update standard content. All content is managed through simple YAML/JSON data files and Google Drive.

---

## 1. Study Materials

### Adding a Google Drive Folder

When a professor creates a new Drive folder for study materials:

1. **Set folder permissions** → "Anyone with the link can view"
2. **Copy the Folder ID** from the URL:
   ```
   https://drive.google.com/drive/folders/1aBcDeFgHiJkLmNoPqRsT
                                           └──────────────────────┘
                                              This is the Folder ID
   ```
3. **Edit** `_data/site_config.yml` → add the ID under `FOLDER_IDS`:
   ```yaml
   FOLDER_IDS:
     pyq:
       sem_3:
         dbms: '1rKihco_dxwB9gB9xKAW96U8WaS9s8SX9'
         new_subject: 'PASTE_FOLDER_ID_HERE'   # ← add here
   ```
4. **Register in StudyData.js** → open `assets/js/components/StudyData.js` and add the subject under the correct semester block:
   ```javascript
   semester3: {
       'New Subject': {
           modules: [{
               name: 'PYQ Papers',
               files: [`https://drive.google.com/drive/folders/${CONFIG.FOLDER_IDS.pyq.sem_3.new_subject}`]
           }]
       },
       // ...existing subjects
   }
   ```

### Adding a YouTube Playlist

1. **Copy the Playlist ID** from the URL:
   ```
   https://www.youtube.com/playlist?list=PLxyz123abc
                                          └──────────┘
                                           Playlist ID
   ```
2. **Edit** `_data/site_config.yml` → add under `PLAYLIST_IDS`:
   ```yaml
   PLAYLIST_IDS:
     new_subject: 'PLxyz123abc'
   ```
3. **Register in StudyData.js** → add a module with `playlistId`:
   ```javascript
   'New Subject': {
       modules: [{
           name: 'Video Lectures',
           playlistId: CONFIG.PLAYLIST_IDS.new_subject
       }]
   }
   ```

---

## 2. Faculty Profiles

Faculty data lives in `_data/faculty.json`.

### Adding a Faculty Member

1. **Open** `_data/faculty.json`
2. **Add** a new entry at the end of the array:
   ```json
   {
       "name": "Dr. Example Name",
       "designation": "Lecturer",
       "qualification": "M.Tech",
       "email": "example@gmail.com",
       "shortName": "EXM"
   }
   ```
3. **Add their photo** → save a 1:1 aspect ratio headshot to:
   ```
   assets/images/faculty_imgs/exm.jpeg
   ```
   - Filename must match `shortName` in **lowercase**
   - Supported formats: `.jpeg`, `.jpg`, `.png`

### Removing a Faculty Member

Delete their entry from the JSON array and optionally remove their photo.

---

## 3. Events

Events are Jekyll collection items stored as Markdown files in `_events/`.

### Adding an Event

Create a new file: `_events/YYYY-event-name.md`

```markdown
---
title: "Workshop on AI"
date: 2025-03-15
description: "One-day workshop on practical AI applications"
image: /assets/images/events/ai-workshop.jpg
---

Event details go here in standard Markdown.
```

The event will automatically appear on the events page.

---

## 4. Newsletters

Newsletters are served directly from Google Drive. **No code changes needed.**

1. Upload the newsletter PDF to the Drive folder with ID: `14OT-O9JooQKzKxxL2bhLUUZkdB3MOSf8`
2. The newsletter page automatically fetches and lists all PDFs from this folder

To change the newsletter folder, update `_data/site_config.yml`:
```yaml
FOLDER_IDS:
  newsletters: 'NEW_FOLDER_ID'
```

---

## 5. Academic Calendar

Similar to newsletters — upload PDFs to the correct Drive folder.

The folder structure should be:
```
Root Folder (16a58BgCLN8h0SnGxjnYFGDdkfWqcuS49)
├── 2024-2025/
│   ├── Calendar_Odd_Sem.pdf
│   └── Calendar_Even_Sem.pdf
└── 2025-2026/
    └── Calendar.pdf
```

> **Note**: The academic calendar root folder ID is currently hardcoded in `academic-calendar.js` rather than pulled from `site_config.yml`. If you need to change the root folder, you must edit `assets/js/pages/academic-calendar.js` line 9.

---

## 6. Student Achievements

Achievement data lives in `_data/toppers_list.json`. Edit this file to add/remove student records.

---

## 7. API Key Management

The Google API key is stored in `_data/site_config.yml`:

```yaml
API_KEY: "AIzaSy..."
```

### If the key expires or is compromised:

1. Go to [Google Cloud Console](https://console.cloud.google.com/) → APIs & Services → Credentials
2. Create a new API key
3. **Apply HTTP referrer restriction**: `*itgpg.github.io/*`
4. Enable these APIs for the key:
   - Google Drive API
   - YouTube Data API v3
5. Paste the new key into `_data/site_config.yml`

> ⚠️ **Security note**: The API key is visible in client-side code. The HTTP referrer restriction prevents unauthorized use from other domains.

---

## 8. Gallery

The gallery fetches images from a Google Drive folder organized into subfolders (one per event/album).

**Drive folder structure**:
```
Gallery Root Folder
├── Annual Day 2025/
│   ├── photo1.jpg
│   └── photo2.jpg
├── Sports Week/
│   └── photo1.jpg
└── ...
```

Configure the gallery folder ID in `_data/site_config.yml`:
```yaml
FOLDER_IDS:
  gallery: 'YOUR_GALLERY_FOLDER_ID'
```

---

## Troubleshooting

| Problem | Cause | Fix |
|---------|-------|-----|
| Study materials not loading | Wrong/missing folder ID | Check `site_config.yml` → `FOLDER_IDS` |
| "No videos found" | Invalid playlist ID or private playlist | Verify playlist is public and ID is correct |
| Faculty photo not showing | Filename doesn't match `shortName` | Rename photo to `shortname.jpeg` (lowercase) |
| API errors (403/quota) | API key expired or quota exceeded | Generate new key (see §7) or wait 24h for quota reset |
| Changes not appearing | Browser cache | Hard-refresh (`Ctrl+Shift+R`) or clear sessionStorage |
| Newsletter not listing | Folder permissions | Ensure Drive folder is set to "Anyone with the link" |
