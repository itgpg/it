# Local Development Guide

To make changes to the UI, logic, or to preview new markdown events before pushing to GitHub, you need to run the site locally.

## Prerequisites

Because the site uses Jekyll, you need a Ruby development environment.

### 1. Install System Dependencies

**Ubuntu / Debian (WSL / Native):**
```bash
sudo apt update
sudo apt install -y ruby-full build-essential zlib1g-dev
```

**Fedora / RHEL:**
```bash
sudo dnf install -y ruby-devel gcc gcc-c++ make redhat-rpm-config
```

**macOS (via Homebrew):**
```bash
brew install ruby
```

### 2. Install Ruby Bundler
Once Ruby is installed, install Bundler, which manages the project's dependencies:
```bash
gem install bundler
```

---

## Running the Project

1. **Clone the repository:**
   ```bash
   git clone https://github.com/itgpg/it.git
   cd it
   ```

2. **Install Jekyll and dependencies:**
   This reads the `Gemfile` and installs all necessary gems locally.
   ```bash
   bundle install
   ```

3. **Start the local server:**
   ```bash
   bundle exec jekyll serve --livereload
   ```

4. **View the site:**
   Open your browser and navigate to `http://localhost:4000/it/`.
   
> [!NOTE]  
> The `--livereload` flag ensures that anytime you save a file (HTML, JS, CSS, or MD), your browser will automatically refresh instantly.

---

## Common Installation Errors

**Error: "You don't have write permissions for the /var/lib/gems directory."**
- **Fix**: Never run `sudo gem install`. Instead, configure Ruby to install gems to your user directory by adding this to your `~/.bashrc` or `~/.zshrc`:
  ```bash
  export GEM_HOME="$HOME/gems"
  export PATH="$HOME/gems/bin:$PATH"
  ```
  Then restart your terminal.

**Error: "Failed to build gem native extension" (ffi or wdm)**
- **Fix**: You are missing C compiler tools. Ensure you ran the `build-essential` or `gcc-c++` installation steps listed in the Prerequisites.
