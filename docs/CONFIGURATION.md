# Configuration Map

The entire "Thick-Client Serverless" architecture revolves around a single configuration file: `_data/site_config.yml`. 

Editing this file alters the behavior, routing, and data-fetching of the live website without requiring JavaScript modifications.

## Understanding `site_config.yml`

This file is written in YAML. Indentation is critical.

### 1. Global Settings
```yaml
API_KEY: "AIzaSy..."
```
- **Purpose**: The Google Cloud API key used by `YouTubeHandler.js` to authenticate against Drive and YouTube APIs.
- **Risk Level**: High. Modifying this with an invalid key breaks all dynamic pages.

### 2. Folder IDs (`FOLDER_IDS`)
This block maps physical Google Drive folders to logic in the UI.
```yaml
FOLDER_IDS:
  certificates: '1vXU0c...'
  newsletters: '14OT-O...'
  gallery: '1vXU0c...'
```
- **certificates**: The root folder containing the `Month/Year/` hierarchy for the Certificate Verification system.
- **newsletters**: The folder containing PDF newsletters.
- **gallery**: The folder containing subfolders of event images.

### 3. Study Material Folder IDs
```yaml
FOLDER_IDS:
  pyq:
    sem_1:
      cse: '1ABC...'
      math: '1DEF...'
```
- **Purpose**: Maps semester and subject names to specific Google Drive folders containing PDFs (e.g., Previous Year Questions, Lab Manuals).
- **Integration**: The JS file `assets/js/components/StudyData.js` references these specific paths. If you add a new subject here, you **must** also map it in `StudyData.js`.

### 4. YouTube Playlist IDs (`PLAYLIST_IDS`)
```yaml
PLAYLIST_IDS:
  c_programming: 'PLxyz...'
  dbms: 'PLabc...'
```
- **Purpose**: Maps subjects to curated YouTube playlists.
- **Integration**: Accessed by `StudyData.js` to render embedded video galleries.

---

## How It Reaches the Browser

You might wonder how a `.yml` file is read by the browser. 

Jekyll compiles this file via a Liquid template located at `assets/js/config.js`:
```javascript
// Jekyll translates the YAML into a raw JS JSON object during build
window.CONFIG = {"API_KEY":"AIza...","FOLDER_IDS":{...}};
```
Every other `.js` file relies on `window.CONFIG` existing. If you introduce a YAML syntax error in `site_config.yml`, Jekyll will fail to build, and the site deployment will crash. Always validate your YAML before pushing.
