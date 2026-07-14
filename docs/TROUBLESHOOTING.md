# Troubleshooting Guide

This guide helps maintainers quickly diagnose and fix common issues with the ITGPG website.

---

## Content & UI Errors

### 1. "Changes I made in `_data/` aren't showing up!"
- **Cause 1 (Local cache)**: The browser is caching old data via `sessionStorage`. 
- **Fix 1**: Press `Ctrl+Shift+R` to hard refresh, or manually clear session storage in DevTools (Application > Session Storage > Clear).
- **Cause 2 (Build pipeline)**: GitHub Pages hasn't finished deploying.
- **Fix 2**: Check the Actions tab on GitHub. Wait for the green checkmark on the `pages-build-deployment` workflow.

### 2. Study Materials / Videos return "No data found"
- **Cause 1**: The Folder ID or Playlist ID in `site_config.yml` is incorrect.
- **Fix 1**: Double-check the URL of the Google Drive folder or YouTube playlist.
- **Cause 2**: Google API Daily Quota Exceeded.
- **Fix 2**: Check the Google Cloud Console dashboard. If quota is 100%, wait 24 hours.

### 3. Faculty photo is missing
- **Cause**: The filename in `assets/images/faculty_imgs/` does not exactly match the `shortName` field in `_data/faculty.json` (it must be lowercase).
- **Fix**: Rename the image to match exactly (e.g., `shortName: "XYZ"` requires `xyz.jpeg`).

---

## Deployment & GitHub Actions Errors

### 1. GitHub Action fails with "YAML Exception"
- **Cause**: You broke the formatting in `_data/site_config.yml`, `_data/faculty.json`, or the front-matter of a markdown file.
- **Fix**: Revert your last commit. Use a YAML/JSON validator before pushing. Ensure all strings are properly quoted.

### 2. Certificate Verification is failing for everyone
- **Cause**: The Google Drive Root Folder permissions were changed, or the API key HTTP restrictions broke.
- **Fix**: Ensure the certificate root folder is set to "Anyone with the link can view". Ensure the API key allows requests from `itgpg.github.io`.

---

## Local Development Errors

### 1. "Could not find gem X in any of the gem sources"
- **Cause**: You haven't installed the Ruby dependencies.
- **Fix**: Run `bundle install` in the project root.

### 2. "Failed to build gem native extension" during `bundle install`
- **Cause**: Your operating system is missing C compilers needed for the `wdm` or `ffi` gems.
- **Fix**: 
  - Ubuntu: `sudo apt install build-essential`
  - Fedora: `sudo dnf install gcc-c++`
  - Then run `bundle install` again.
