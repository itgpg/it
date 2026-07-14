# API Reference

This document outlines the specific Google API endpoints invoked by the client-side JavaScript.

## Google Drive API v3

### `files.list`

Used universally across the site (Study Materials, Gallery, Newsletters) to retrieve the contents of a specific folder.

- **Endpoint**: `https://www.googleapis.com/drive/v3/files`
- **Method**: `GET`
- **Authentication**: Query parameter `key=CONFIG.API_KEY`

**Parameters Used:**
- `q`: `'${folderId}' in parents and trashed = false` (Filters search to children of a specific folder ID).
- `fields`: `files(id, name, webViewLink, iconLink, thumbnailLink)` (Reduces payload size to only required metadata).
- `orderBy`: `name` (Ensures consistent sorting in UI).

**Implementation:**
Located in `assets/js/components/YouTubeHandler.js` as `fetchFileName(folderId)`.

---

## YouTube Data API v3

### `playlistItems.list`

Used to fetch video details from curated study playlists.

- **Endpoint**: `https://www.googleapis.com/youtube/v3/playlistItems`
- **Method**: `GET`
- **Authentication**: Query parameter `key=CONFIG.API_KEY`

**Parameters Used:**
- `part`: `snippet`
- `playlistId`: `${playlistId}` (Mapped from `CONFIG.PLAYLIST_IDS`).
- `maxResults`: `50` (Maximum allowed per page).
- `pageToken`: Handled dynamically if a playlist exceeds 50 videos.

**Implementation:**
Located in `assets/js/components/YouTubeHandler.js` as `fetchPlaylistVideos(playlistId)`.

---

## Error Handling Standards

All fetch wrappers must implement a `try...catch` block. 
If an API fails (e.g., 403 Quota Exceeded, 404 Not Found), the application gracefully degrades by injecting an error state into the DOM rather than crashing the execution thread.
