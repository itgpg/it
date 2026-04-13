# Maintaining the GPG IT Website (Legacy Guide)

Welcome to the Government Polytechnic Gandhinagar IT Department Website! 

If you are reading this, you have likely been tasked with maintaining or updating this website. **Do not worry if you are a 1st-semester student or do not know how to code.** This architecture was specifically designed by the 2024-2025 development team with a "Zero-JS" rule. This means you can safely update the site's content *without* accidentally breaking the logic.

---

## 1. How the Architecture Works
This website is built using **Jekyll** and is hosted for free on **GitHub Pages**. Fast, secure, and incredibly lightweight.

Unlike traditional websites that use databases, this site relies on two mechanisms:
1. **Static Files (SSG)**: Things like Faculty Profiles and the Home Page are compiled seamlessly by Jekyll from simple `_data` files.
2. **The "Serverless" Study Material Portal**: The *Study Materials* section uses JavaScript to fetch PDFs and Videos directly from Google Drive and YouTube. This allows professors to just upload a PDF to a Drive folder, and the site updates instantly!

---

## 2. The "Zero Code" Editing Rule
We strongly adhere to the rule: **Never edit `.js` or `.html` files to update standard content.**

### 🛠️ Updating Faculty Profiles
1. Go to the `_data/faculty.json` file.
2. It is a simple list. Just copy the block of an existing professor, paste it at the bottom, and change the `name`, `designation`, and `shortName` (e.g., `ASP`).
3. Add their photo to `assets/images/faculty_imgs/asp.jpeg` (Ensure the name matches the `shortName` in lowercase).
4. The site will automatically build the new HTML!

### 🎓 Updating Study Materials (Google Drive IDs)
If a professor creates a new Google Drive folder for "Semester 5 Cloud Computing", you do **not** need to touch the complex JavaScript code.
1. Open the `_data/site_config.yml` file.
2. Under `FOLDER_IDS`, locate the correct semester.
3. Add the Google Drive Folder ID (e.g., `cloud_comp: '1qzlAm8Zi9RC11iwD2V2T0uU_8DMSlemE'`).
4. That's it! The javascript automatically pulls from this central config file.

---

## 3. High-Performance Caching
If you are worried about Google Drive API quotas crashing the site—don't be.
The architecture includes `sessionStorage` caching. When a student opens a module, the files are downloaded to their local browser cache. If they click back and reopen the module, it loads instantly (0ms delay) and costs you 0 API hits.

---

## 4. API Keys & Security
The Google Drive integration requires a Google Cloud API Key.
This key is stored in `_data/site_config.yml`.

> [!WARNING]
> Due to the nature of client-side fetching, this key is publicly visible. However, it is **HTTP Referrer Restricted** in the Google Cloud Console. This means the key will physically *fail* if anyone tries to steal it and use it on a website other than `https://itgpg.github.io`. 

If the key ever expires, have the HOD log into the IT Department's Google Cloud Console, generate a new specific Drive API key, apply the Referrer Restriction, and paste it into `_data/site_config.yml`.

---

## 5. Local Setup for Maintainers

If you wish to run the website on your local machine to test changes before pushing them live:

1. Install Ruby (minimum version 2.7+)
2. Install Bundler: `gem install bundler`
3. Clone the repository: `git clone https://github.com/itgpg/it.git`
4. Navigate to the folder: `cd it`
5. Install dependencies: `bundle install`
6. Run the local server: `bundle exec jekyll serve --livereload`
7. Open your browser and go to `http://localhost:4000/it/`

You are now ready to continue building upon this robust ecosystem!
