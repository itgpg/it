# Content Workflow Guide

*(Note: This document supersedes the legacy `CONTENT_GUIDE.md`.)*

This guide explains how to update the website content (study materials, events, faculty profiles, certificates) **without writing any JavaScript or HTML**.

---

## 1. Study Materials (Drive & YouTube)

When a professor provides new study materials or a YouTube playlist, you must map it in `_data/site_config.yml` and `assets/js/components/StudyData.js`.

### Adding a Google Drive Folder

1. **Permissions**: Open the folder in Google Drive > Share > "Anyone with the link can view".
2. **Get ID**: Extract the ID from the URL (`https://drive.google.com/drive/folders/[THIS_IS_THE_ID]`).
3. **Map Config**: Open `_data/site_config.yml` and add the ID under `FOLDER_IDS`:
   ```yaml
   FOLDER_IDS:
     pyq:
       sem_3:
         new_subject: 'PASTE_ID_HERE'
   ```
4. **Map UI**: Open `assets/js/components/StudyData.js` and add the module to the correct semester:
   ```javascript
   'New Subject': {
       modules: [{
           name: 'PYQ Papers',
           files: [`https://drive.google.com/drive/folders/${CONFIG.FOLDER_IDS.pyq.sem_3.new_subject}`]
       }]
   }
   ```

### Adding a YouTube Playlist
Follow the exact same steps, but place the ID under `PLAYLIST_IDS` in the config, and use `playlistId: CONFIG.PLAYLIST_IDS.new_subject` in `StudyData.js`.

---

## 2. Managing Faculty Profiles

Faculty profiles are dynamically rendered from a JSON file.

### Adding a Professor
1. Open `_data/faculty.json`.
2. Append a new object:
   ```json
   {
       "name": "Dr. Example Name",
       "designation": "Lecturer",
       "qualification": "M.Tech",
       "email": "example@gmail.com",
       "shortName": "EXM"
   }
   ```
3. Upload their photo to `assets/images/faculty_imgs/`.
   - **Crucial**: The filename must be the `shortName` in **exact lowercase** (e.g., `exm.jpeg`).

### Removing a Professor
Delete their object from `faculty.json` and optionally remove their photo from the assets folder.

---

## 3. Uploading Events

Events are managed natively via Jekyll Collections.

1. Navigate to the `_events/` directory.
2. Create a new markdown file named `YYYY-event-title.md` (e.g., `2025-ai-workshop.md`).
3. Add the required front-matter:
   ```markdown
   ---
   title: "AI Workshop"
   date: 2025-03-15
   description: "A workshop on AI."
   image: /assets/images/events/ai.jpg
   ---
   Write the full event details here.
   ```
4. Commit and push. The site will automatically build the new event page.

---

## 4. Digital Certificates

Certificates are entirely handled via Google Drive folder structures.

1. Navigate to the root Certificates Drive Folder.
2. Create folders for the current Month and Year (e.g., `09/` then `2025/` inside it).
3. Upload the PDF named exactly as the certificate ID (e.g., `GPG092025001.pdf`).
4. Ensure the folder is set to "Anyone with the link can view".

No code changes are required. The Certificate Verification Engine will automatically locate it.

---

## 5. Newsletters & Calendars

Newsletters and Academic Calendars are simply PDF dumps into specific Drive folders.

1. Locate the correct root folder (check `site_config.yml` for `FOLDER_IDS.newsletters` or `FOLDER_IDS.academic_calendar`).
2. Upload the new PDF.
3. It will immediately appear on the website.

---

## 6. Gallery

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
