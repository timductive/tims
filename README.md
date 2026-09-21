# Tim's Blog

This repo contains the Jekyll source for `tims.io`. It builds on GitHub Pages
(the `github-pages` gem pins Jekyll and the plugin set) with a self-contained
theme — no remote theme, no jQuery.

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

## Build

```bash
bundle exec jekyll build
```

## How the site is put together

| Where | What |
| --- | --- |
| `_config.yml` | Site identity: wordmark, hero copy, page intros, author links, location. |
| `_layouts/` | `default` (shell), `home`, `blog`, `post`, `work`, `about`, `search`, `tags`, `page`. |
| `_includes/` | Header/footer, `post-card` / `post-row` / `post-featured` (all share `post-hero.html`), `work-card`, `gallery`, `icon` (inline SVGs), `toc.liquid` (vendored [jekyll-toc](https://github.com/allejo/jekyll-toc), MIT). |
| `_sass/` | `_tokens.scss` holds every color/font/size; one partial per page. Compiled by `assets/css/main.scss`. |
| `assets/js/site.js` | Progressive enhancement: mobile nav, `⌘K` / `/` to search, `?tag=` / `?filter=` list filtering, TOC scrollspy, copy buttons, hero gallery. |
| `assets/js/search.js` | Client-side search (vendored lunr 2.3.9) over `assets/js/search-data.json`, which Liquid builds from posts, work entries and pages. |
| `_data/` | `navigation.yml`, `gallery.yml` (home panel), `now.yml`, `career.yml` (About timeline), `repos.yml` (Work page). |
| `_work/` | Portfolio entries (collection, rendered on `/work/`). |

### Writing a post

```yaml
---
title: Post title
description: One-line lede shown on cards and at the top of the post.   # optional; falls back to the first paragraph
image: /assets/images/posts/cover.jpg                                    # optional; also used for og:image
image_alt: ""
tags: [engineering, management]
---
```

Posts without an `image` get a generated mark on cards (one of three CSS patterns, chosen by
day-of-year so it's stable per post). The first tag is the one shown on chips.

### Adding work

Create `_work/<slug>.md` with `title, org, role, period, status (active | in progress | shipped),
category (leadership | product | side), featured, order, image, image_label, summary, problem,
approach, outcome, outcome_label, stack`. `featured: true` entries (sorted by `order`) appear on the
home page.

Anything in `[BRACKETS]` in `_data/` or `_work/` is a placeholder waiting for real content.
