# Maintainer Handover Guide

Welcome to the ITGPG website maintainer team! If you have inherited this repository, you are now responsible for keeping the department website running, updated, and secure.

This document serves as your complete survival guide.

---

## 🛡️ The Golden Rule

**Never edit `.js` or `.html` files for standard content updates.** 

This site is designed with a "Zero-JS" maintenance philosophy. All daily and semesterly content (faculty members, study materials, certificates) is managed entirely through simple text files in the `_data/` folder and Google Drive.

For instructions on adding/removing content, you must read the **[Content Workflow Guide](docs/CONTENT_WORKFLOW.md)**.

---

## 📅 Maintenance Schedule

To keep the site healthy, follow this routine schedule:

### Daily / Weekly Maintenance
- **Review Pull Requests (PRs):** Approve or request changes on any PRs submitted by students.
- **Monitor API Quota:** The site relies on Google Drive and YouTube APIs. If the site receives a massive spike in traffic (e.g., exam week), the API might fail. Check the [Google Cloud Console](https://console.cloud.google.com/) to ensure quotas are healthy.

### Monthly Maintenance
- **Upload Certificates:** Collect any new event certificates and upload them to the correct Month/Year Google Drive folder. See the [Content Workflow](docs/CONTENT_WORKFLOW.md).
- **Upload Newsletters:** If a new departmental newsletter is released, drop the PDF into the Newsletter Drive folder.

### Semesterly Maintenance (Every 6 Months)
- **Update Academic Calendar:** Upload the new Odd/Even semester calendar PDF to Drive.
- **Update Study Materials:** If professors create new Google Drive folders for their subjects, map the new Folder IDs in `_data/site_config.yml`.
- **Update Student Achievements:** Edit `_data/toppers_list.json` with the latest exam toppers.

### Yearly Maintenance
- **Audit Faculty:** Update `_data/faculty.json` if new professors join or leave the department.
- **API Key Renewal:** Ensure the Google API Key has not been compromised. If you need to rotate the key, follow the instructions in [Google Services](docs/GOOGLE_SERVICES.md).

---

## 🚨 Emergency & Debugging Checklist

If the website breaks, don't panic. Check these common failure points first:

### 1. "No Data Found" / Endless Spinners
- **Cause:** Google API Quota Exceeded.
- **Fix:** Wait 24 hours for the quota to reset. If it happens frequently, see the [Troubleshooting Guide](docs/TROUBLESHOOTING.md).

### 2. "Changes are not showing up!"
- **Cause 1 (Local):** Browser `sessionStorage` is caching the old data.
- **Fix 1:** Press `Ctrl+Shift+R` to hard refresh, or close and reopen the browser tab.
- **Cause 2 (Production):** GitHub Pages hasn't finished building yet.
- **Fix 2:** Go to the repository's `Actions` tab and check if the latest deployment workflow passed successfully.

### 3. Study Materials Drive Folder returns "Error"
- **Cause:** The Google Drive folder is set to "Restricted".
- **Fix:** Ensure the specific Drive folder permissions are set to "Anyone with the link can view".

For more specific errors, check the comprehensive [Troubleshooting Guide](docs/TROUBLESHOOTING.md).

---

## 🔑 Access & Infrastructure

As the lead maintainer, you should ensure you have access to:
1. **GitHub Repository Admin Rights**: Ability to merge PRs and manage repository settings.
2. **Google Cloud Console**: Access to the project housing the API keys (Meet with the managing faculty to get access).
3. **Google Drive Root Folders**: Editor access to the IT Department's shared Drives containing the certificates, study materials, and galleries.

If you are graduating and need to pass the torch, strictly follow the [Handover Checklist](docs/HANDOVER.md).

---

## 📖 Required Reading

Before touching the codebase, familiarize yourself with:
- [Architecture Deep Dive](docs/ARCHITECTURE.md) - How the system actually works.
- [Configuration Map](docs/CONFIGURATION.md) - What every setting in `site_config.yml` does.
- [Google Services](docs/GOOGLE_SERVICES.md) - How the APIs and keys are secured.
