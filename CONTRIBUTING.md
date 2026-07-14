# Contributing Guidelines

First off, thank you for considering contributing to the ITGPG website! As an open-source project maintained by and for the students of Government Polytechnic Gandhinagar, your help is essential for keeping this site modern and functional.

## Table of Contents
1. [Code of Conduct](#code-of-conduct)
2. [How Can I Contribute?](#how-can-i-contribute)
   - [Reporting Bugs](#reporting-bugs)
   - [Suggesting Enhancements](#suggesting-enhancements)
   - [Your First Code Contribution](#your-first-code-contribution)
3. [Local Development Setup](#local-development-setup)
4. [Pull Request Process](#pull-request-process)

---

## Code of Conduct

This project is maintained by an academic institution. All contributors are expected to maintain professional, respectful, and constructive communication. Any PRs containing inappropriate content, malicious code, or disrespectful language will be immediately closed and reported.

---

## How Can I Contribute?

### Reporting Bugs
If you find a bug (e.g., broken links, UI glitches, API failures):
1. Check the [Issues](https://github.com/itgpg/it/issues) tab to ensure it hasn't already been reported.
2. Open a new issue with a clear title.
3. Describe the exact steps to reproduce the bug.
4. Include screenshots and browser/OS information if possible.

### Suggesting Enhancements
Have an idea to improve the site's performance or design?
1. Open an issue detailing your proposal.
2. Explain *why* this enhancement is necessary and how it benefits the users.
3. Wait for a maintainer to approve the concept before you start writing code.

### Your First Code Contribution
Look for issues labeled **`good first issue`** or **`help wanted`**. These are specifically scoped for new contributors to get familiar with the codebase.

---

## Local Development Setup

We highly recommend running the site locally before submitting a Pull Request.

Please follow the step-by-step instructions in our **[Development Guide](docs/DEVELOPMENT.md)** to install Ruby, Bundler, and Jekyll on your machine.

---

## Pull Request Process

1. **Fork the repository** to your own GitHub account.
2. **Create a new branch** from `main` (`git checkout -b feature/your-feature-name`).
3. **Make your changes**. Ensure your code matches the existing style (Vanilla CSS, Bootstrap 5 classes, ES6 JavaScript).
4. **Test locally**. Ensure no build errors occur and the site renders correctly.
5. **Commit your changes**. Write clear, concise commit messages.
6. **Push to your fork** and submit a Pull Request against our `main` branch.
7. **Wait for review**. A core maintainer will review your code. They may request changes before merging.

### Important Constraints
- **Do not commit API Keys** beyond what is already public in `site_config.yml`.
- **Do not modify `_data/` files** in a code-focused PR unless it's strictly necessary for a new feature. Data files are meant for real content updates.
- Keep the **"Zero-JS Maintenance"** philosophy in mind. Avoid hardcoding IDs or text directly into JavaScript files.

Thank you for contributing to the IT Department!
