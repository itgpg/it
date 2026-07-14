# Google Services & APIs

The ITGPG website relies heavily on Google Workspace APIs to act as a headless backend. This guide details how to manage the API Keys, the Google Cloud Console, and the Drive permissions.

## 1. The Google Cloud Project

The API keys and quotas for this repository are managed in a specific Google Cloud Project. 
> [!NOTE]
> If you do not have access to the Google Cloud Project, please meet with the lead developer or the managing faculty to request access. 

### Enabled APIs
To function, the Google Cloud Project must have the following APIs enabled:
- **Google Drive API v3**: Used for fetching certificates, study materials, and gallery images.
- **YouTube Data API v3**: Used for fetching study material playlists.

---

## 2. API Key Management

The site uses a single API key, stored in `_data/site_config.yml`:

```yaml
API_KEY: "AIzaSy..."
```

### Rotating the API Key
If the API key is compromised or accidentally deleted:
1. Log into the Google Cloud Console.
2. Navigate to **APIs & Services > Credentials**.
3. Click **Create Credentials > API Key**.
4. Copy the newly generated key.
5. Immediately click **Edit API Key** to apply security restrictions (see below).
6. Paste the new key into `_data/site_config.yml` and commit to `main`.

### Security Restrictions (Crucial)
Because the API key is visible in the frontend JavaScript, it **must** be restricted. Otherwise, anyone could steal it and exhaust our quota.

Under the API Key settings in Google Cloud:
- **Application Restrictions**: Set to `HTTP referrers (web sites)`.
- **Website Restrictions**: Add `*itgpg.github.io/*` and `http://localhost:4000/*`.
- **API Restrictions**: Restrict the key to only use the Google Drive API and YouTube Data API.

---

## 3. Google Drive Folder Permissions

The entire system breaks if the Drive folders are private.

Whenever a new folder is created for the website (e.g., a new semester's study materials, or a new batch of certificates):
1. Right-click the folder in Google Drive.
2. Select **Share**.
3. Under "General access", change the dropdown from "Restricted" to **"Anyone with the link"**.
4. Set the role to **Viewer**.

---

## 4. Quota Monitoring

Google provides a generous free tier (e.g., 10,000 queries per day for YouTube v3). However, sudden traffic spikes can exhaust this.

To monitor quotas:
1. Open Google Cloud Console.
2. Navigate to **APIs & Services > Dashboard**.
3. Check the traffic graphs for Google Drive and YouTube Data APIs.

If you consistently hit quotas, consider implementing a proxy server (like Cloudflare Workers) or increasing the strictness of the `sessionStorage` caching algorithms.
