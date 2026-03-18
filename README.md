# Tim's Blog

This repo contains the Jekyll source for `tims.io`.

## Requirements

- Ruby
- Bundler

## Install Dependencies

```bash
bundle install
```

If you want to keep gems local to the repo instead of your user gem path:

```bash
mkdir -p vendor/bundle .bundle-cache
HOME="$PWD" BUNDLE_PATH=vendor/bundle BUNDLE_CACHE_PATH="$PWD/.bundle-cache" bundle install
```

## Run Locally

```bash
bundle exec jekyll serve
```

The site will be available at `http://127.0.0.1:4000` or `http://localhost:4000`.

If you are using local bundle paths:

```bash
HOME="$PWD" BUNDLE_PATH=vendor/bundle BUNDLE_CACHE_PATH="$PWD/.bundle-cache" bundle exec jekyll serve --host 127.0.0.1
```

## Build

```bash
bundle exec jekyll build
```

## Notes

- The site uses the `minimal-mistakes` remote theme.
- Main site configuration lives in `_config.yml`.
- The current terminal-style UI enhancements live in `assets/css/main.scss` and `assets/js/terminal-ui.js`.
