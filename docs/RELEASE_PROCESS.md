# Release Process

This document outlines the procedure for safely pushing changes to the production environment (the live website). 

Because we use GitHub Pages, the `main` branch is our production branch. Any code merged into `main` is instantly built and deployed to the public.

## 1. Local Verification (Required)

Before creating a Pull Request, you must verify your changes locally:
1. Run `bundle exec jekyll serve`
2. Navigate the site.
3. If you changed JS, open the Chrome/Firefox DevTools (F12) Console and ensure there are no red syntax errors or undefined object errors.
4. If you changed CSS, ensure the site still looks correct on a mobile viewport (responsive design).

## 2. Pull Request Protocol

Never commit directly to `main`. 
1. Create a feature branch: `git checkout -b feature/update-gallery-css`
2. Make your commits.
3. Push the branch and open a Pull Request against `main`.
4. Ensure a core maintainer reviews the PR.
5. Merge the PR.

## 3. Post-Release Verification

After merging:
1. Wait ~60 seconds for the GitHub Actions deployment to finish.
2. Visit the live site: `https://itgpg.github.io/it/`
3. Perform a Hard Refresh (`Ctrl+Shift+R`) to clear your local cache.
4. Verify the new feature works.

### Rollbacks
If a merged PR breaks the live site:
1. Go to the PR on GitHub and click **Revert**.
2. This creates a new PR that undoes your changes.
3. Merge the Revert PR immediately to restore the site to a working state.
