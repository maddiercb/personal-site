# extra-eclipse

Maddie Burroughs' personal site — <https://maddiercb.com>. Astro 7, static output.

`CLAUDE.md` is a symlink to this file. Edit `AGENTS.md`; both stay in sync.

## Repo layout

The Astro site lives in `extra-eclipse/`, a subdirectory of the `personal-site`
repo — not at the repo root. `attic/` holds the two previous versions of the
site (`old-postgrad/`, `college-site/`), kept for reference and for salvaging
content. Nothing in `attic/` is built or deployed; don't edit it.

## Development

```
npm run dev      # http://localhost:4321
npm run build    # -> dist/
npm run preview
```

There is a `.claude/launch.json` at the repo root, so `preview_start` with the
name `site` will start the dev server and open it in the browser pane. Prefer
that over running the server with Bash.

## Conventions

The site is deliberately dependency-light. Astro is the only runtime
dependency, and it should stay that way unless there's a real reason.

- **No UI framework.** There are no React/Vue/Svelte integrations installed and
  no plans for any. Interactive behavior is vanilla TypeScript in a page or
  component `<script>` block — see `src/pages/projects.astro` for the reference
  pattern (query the DOM, attach listeners, keep state in closures).
- **No CSS framework.** Scoped `<style>` blocks per component and page. Shared
  tokens and the handful of global rules live in `src/styles/global.css`.
- **Prefer platform features over libraries.** Native `<dialog>` +
  `showModal()`, CSS scroll-snap, `:has()`, `class:list`, `astro:assets`
  `<Image>`. This codebase reaches for the browser first.
- **Comments explain *why*, not *what*** — and they earn their place by
  documenting non-obvious behavior. The existing ones flag things like why
  `<Image>` needs `height: auto`, why focus is parked on the dialog after
  `showModal()`, why a scroll handler is debounced. Match that bar: no comment
  that restates the line below it.
- **Accessibility is not optional here.** Buttons for actions, `focus-visible`
  outlines, accessible names on stretched-link cards, `aria-current` /
  `aria-haspopup` where they apply, and motion that degrades under
  `prefers-reduced-motion`.

## Design system

Tokens are defined in `:root` in `src/styles/global.css`:

| Token | Value | Use |
| --- | --- | --- |
| `--bg` | `#222` | page background |
| `--accent` | `#f58f7c` | salmon; links, nav underline, borders |
| `--offwhite` | `#f2f3f4` | body text, polaroid frames |
| `--muted` | `#b8b8b8` | secondary text |
| `--font-display` | DynaPuff | headings, project titles |
| `--font-body` | Molengo | body copy |

Fonts load from Google Fonts in `src/layouts/Layout.astro`. Two intentional
one-off exceptions appear on the home page: "Hi Melody" and Orbitron, used as
decorative accents on the two degree names.

The visual signature is the **polaroid card** (`src/components/Polaroid.astro`):
white bottom-heavy frame, soft shadow, alternating ±1.5° rotation that
straightens on hover. Nav uses a wavy underline for the active link. Preserve
both when adding pages.

## Content

Projects are an Astro content collection — markdown in
`src/content/projects/`, schema in `src/content.config.ts`. Cover and gallery
images use the zod `image()` helper and resolve relative to the markdown file,
so they live in `src/assets/projects/<slug>/`, not `public/`. Adding a project
means adding a markdown file; no code change.

Reviews are a second collection — markdown in `src/content/reviews/`, rendered
by `src/pages/reviews.astro`. They are frontmatter-only (no body): a review card
links straight out to the published piece in a new tab instead of opening a
modal, so there is nothing to render on this site. Covers are remote URLs on the
publication's server rather than the `image()` helper, so there are no files to
add alongside the markdown. Sorting is newest-first by `date`, which is used
only for ordering and never shown on the card.

To pull in newly published reviews, use the `add-reviews` skill
(`.claude/skills/add-reviews/SKILL.md` at the repo root). It finds reviews on
Maddie's Buzz Center Stage author page that aren't here yet, picks pull quotes
to her standards, and writes the markdown files.

`public/` is only for assets that must keep a stable URL and skip processing —
currently favicons and the resume PDF.

## Deploy

Cloudflare Pages, auto-deploying from `main` in `maddiercb/personal-site`.
**None of this config is in the repo** — no workflow, no `wrangler.toml` — it
exists only in the Cloudflare dashboard:

- Root directory `extra-eclipse`, build `npm run build`, output `dist`
- Build system v2; Node pinned to 22.12.0 by `.node-version` because Astro 7
  needs >=22.12 and the v2 image defaults lower

Gotchas learned the hard way:

- Saving build settings does **not** trigger a deploy. Only a new commit or a
  manual "Retry deployment" does. An empty commit is the fastest force-build.
- HTML is served with `s-maxage=604800` (7 days), so `/` can serve badly stale
  HTML after a fix ships. Purge the cache before concluding a deploy failed.
- `src/pages/404.astro` must keep existing — it emits `dist/404.html`, which is
  what makes Pages return a real 404. Without it every dead link returns 200
  with the homepage.

## Docs

<https://docs.astro.build> — [routing](https://docs.astro.build/en/guides/routing/),
[components](https://docs.astro.build/en/basics/astro-components/),
[content collections](https://docs.astro.build/en/guides/content-collections/),
[styling](https://docs.astro.build/en/guides/styling/).
