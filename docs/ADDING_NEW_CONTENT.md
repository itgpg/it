# Providing New Content (Zero-JS Handover Workflow)

This website was intentionally engineered so that future contributors **never natively need to write, edit, or touch JavaScript code** to update standardized department content. All fundamental configuration variables, Drive IDs, and profile arrays have been extracted natively into safe, purely-text-based payload files located strictly in the `_data/` directory.

Here is the exact step-by-step documentation for universally common update requests.

---

## 1. Managing Study Materials (`_data/site_config.yml`)

When professors upload fresh syllabus textbooks (PDFs) or share new YouTube lecture sequences, you must link them back natively into the global site configuration file.

### A. Updating a Google Drive File Folder ID
*Example Protocol for linking a new Drive Folder for Semester 3 Database Management Systems (DBMS):*
1. **Create** the folder natively in the main IT Department Google Drive workspace.
2. **Assign Permissions**: Ensure the folder's sharing configurations are correctly set to exactly: **"Anyone with the link can view."**
3. **Extract ID:** Grab the specific Folder ID from the URL: `drive.google.com/drive/folders/YOUR_FOLDER_ID_HERE`
4. **Open configuration:** Edit `_data/site_config.yml` inside the repository.
5. **Paste and Save:** Locate the `FOLDER_IDS` parameter section natively, find `sem_3`, and cleanly update the `dbms` key mapping just like this:
```yaml
FOLDER_IDS:
  pyq:
    sem_3:
      dbms: 'YOUR_FOLDER_ID_HERE'
```

### B. Updating YouTube Playlists
Similar to integrating Drive folders, directly copy the pure Playlist ID uniquely from a YouTube URL: `youtube.com/playlist?list=PLAYLIST_ID_HERE`.
Directly update `_data/site_config.yml` locally scrolling down into the `PLAYLIST_IDS` section:
```yaml
PLAYLIST_IDS:
  database_systems: 'PLAYLIST_ID_HERE'
```

---

## 2. Updating the Faculty Roster (`_data/faculty.json`)

When a new professor technically joins or an existing one transfers onward, formatting their profile is as simple natively as managing a JSON block matrix.

1. Natively open `_data/faculty.json`.
2. Scroll to the absolute bottom safely and cleanly copy the full open/close format bracket of an existing entry.
3. Paste the natively copied entry directly below dynamically and rigorously update the parameters:
```json
{
    "name": "Dr. Example Name",
    "designation": "Lecturer",
    "qualification": "Doctorate",
    "email": "example.faculty@gmail.com",
    "shortName": "EXM"
}
```
4. **Photo Linking:** Navigate rawly to `assets/images/faculty_imgs/` and cleanly upload their 1:1 portrait headshot image ensuring it is named EXACTLY mimicking their `shortName` precisely in lowercase characters natively (Example file name: `exm.jpeg`).
5. Successfully commit exactly. The Jekyll Static Site Generator will automatically natively re-compile the Faculty route HTML block, loop completely over the new object, and seamlessly populate the UI!

---

## 3. Updating the Global Google API Key (Emergency Override)

In the rare event that the backend Google Cloud Project API Key gets universally expired, leaked, or deleted, the Thick-Client frontend will globally stop natively loading Study Materials, YouTube streams, and Certificate Verify Lookups. 

Here is exactly how to mitigate the outage via Zero-JS patching:
1. Log into your IT Department Administration Google Cloud Console and generate a heavily restricted native API Key via the Credentials tab.
2. **Critical Security**: Ensure you physically add an *HTTP Referrer Restriction* natively bound strictly to `*itgpg.github.io/*` so thieves cannot export the key to spoof traffic.
3. Open `_data/site_config.yml` identically as before and cleanly overwrite the primary parameter safely:
```yaml
API_KEY: "AIzaSy_PASTE_YOUR_NEW_KEY_HERE"
```
