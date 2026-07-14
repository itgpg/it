# Deployment Guide

The ITGPG website leverages **GitHub Pages** for continuous deployment. There are no manual server uploads, FTP clients, or build scripts you need to run on your own machine.

## How it Works

1. **Commit & Push**: Whenever a developer or maintainer pushes changes to the `main` branch on GitHub, a deployment is triggered.
2. **GitHub Actions**: GitHub spins up a secure runner, checks out the codebase, and executes a Jekyll build.
3. **Static Generation**: Jekyll compiles all Markdown files, injects `_data` configurations, and generates the final static HTML/CSS/JS files into a hidden `_site/` directory.
4. **Publishing**: The runner takes the contents of `_site/` and serves it securely over HTTPS at `https://itgpg.github.io/it/`.

---

## Verifying Deployments

If you push a change and it doesn't appear on the live site:

1. Navigate to the **[Actions tab](https://github.com/itgpg/it/actions)** in the GitHub repository.
2. Look for the most recent workflow run (usually named `pages-build-deployment`).
3. A **Green Checkmark** means the build was successful. (If you still don't see changes, perform a hard refresh `Ctrl+Shift+R` to clear browser cache).
4. A **Red X** means the build failed. 

## Debugging Build Failures

If the deployment action fails, click on the failed run to view the logs. Common reasons include:

- **YAML Syntax Errors**: You forgot a space, quote, or bracket in `_data/site_config.yml` or a markdown file's front-matter.
- **Liquid Tag Errors**: A broken `{% include %}` tag or missing variable reference.

Fix the syntax error on your local machine, test via `bundle exec jekyll serve`, and push the fix to trigger a new deployment.

---

## Manual Deployments (Rare)

There are no hidden deployment steps or external CI/CD pipelines (e.g., Vercel, Netlify). If you ever need to manually force a rebuild without making a code change:
1. Go to the Actions tab.
2. Select the **pages-build-deployment** workflow on the left.
3. Click the **Run workflow** button on the right.
