# Blog SEO Reference

Every page emits SEO tags from `src/layouts/BaseLayout.astro`. Article pages pass extra values for Open Graph type, share image, and timestamps.

## What Each Page Emits

| Tag | Source | Coverage |
| --- | --- | --- |
| `<title>` | Frontmatter `title`, suffixed with `\| CODERMAN` | All pages |
| `<meta name="description">` | Frontmatter `description` | All pages |
| `<link rel="canonical">` | `site` in `astro.config.mjs` plus the page path | All pages |
| `hreflang` alternates | Paired translations by `translationKey` | All pages |
| `og:type` | `website` by default, `article` on posts | All pages |
| `og:title`, `og:description`, `og:url` | Page title, description, canonical URL | All pages |
| `og:image` | Per-post PNG path passed as `ogImage` | All pages |
| `og:locale`, `og:locale:alternate` | `zh_CN` / `en_US` by page language | All pages |
| `article:published_time` | Frontmatter `pubDate` | Article pages |
| `article:modified_time` | Frontmatter `updatedDate` | Article pages with `updatedDate` |
| `twitter:card` | Fixed `summary_large_image` | All pages |
| `<meta name="author">` | Fixed `CODERMAN` | All pages |

## Open Graph Images

`scripts/generate-og-images.mjs` renders one 1200x630 PNG per published post.

- Reads `src/content/blog/zh/` and `src/content/blog/en/`.
- Skips posts with `draft: true`.
- Writes `public/images/og/<lang>-<slug>.png`.
- Draws the post title, its category label, and the CODERMAN wordmark on a dark gradient.

`npm run build` runs this script first through `prebuild`. To regenerate alone:

```bash
npm run og:images
```

Regenerate after changing a post title, category, language, or slug. The script does not delete stale images, so remove `public/images/og/<lang>-<old-slug>.png` after renaming a slug.

## Adding a New Tag

1. Add the prop to the `Props` interface in `src/layouts/BaseLayout.astro`.
2. Emit the tag inside the `<head>` block.
3. Pass the value from `src/pages/blog/[...slug].astro` and `src/pages/en/blog/[...slug].astro` if it is post-specific.
4. Run `npm run build` and confirm the tag appears in `dist/blog/<slug>/index.html`.

## Verification

Check tag coverage across every built page:

```bash
for k in 'rel="canonical"' 'property="og:image"' 'name="twitter:card"' 'hreflang='; do
  printf '%s  %s\n' "$(rg -l "$k" dist --glob '*.html' | wc -l | tr -d ' ')" "$k"
done
```

The count should equal the total number of built HTML pages, except `article:published_time`, which only appears on article pages.

Check that every referenced share image exists:

```bash
for f in $(rg -o '/images/og/[a-z0-9-]+\.png' dist --glob '*.html' -N | sed 's/.*://' | sort -u); do
  [ -f "dist$f" ] || echo "MISSING: $f"
done
```

## Not Implemented

- JSON-LD structured data (`BlogPosting`, `Person`).
- `og:image` for the home page, blog index, and category pages. These fall back to `/images/site-icon.png`.
- Automatic internal links between related posts.
