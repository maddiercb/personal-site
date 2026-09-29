---
name: add-reviews
description: Sync the Writing page (maddiercb.com/reviews) with Maddie's theatre reviews on Buzz Center Stage — find reviews published since the site was last updated, pick a pull quote for each, and add them as review cards. Use when asked to add, sync, or update reviews / the Writing page.
---

# Add new reviews to the Writing page

The Writing page renders one card per markdown file in
`extra-eclipse/src/content/reviews/` (component: `ReviewCard.astro`, schema:
`reviews` in `content.config.ts`). Adding a review means adding one
frontmatter-only markdown file — no code changes. Read `extra-eclipse/AGENTS.md`
for the rest of the site's conventions.

Source of truth for what exists: Maddie's author page on Buzz Center Stage,
<https://www.buzznews.net/theatre/theatre-reviews/itemlist/user/7400-maddieburroughs.html>.

## 1. Work on a branch

`main` auto-deploys to maddiercb.com. If on `main`, create a branch first
(e.g. `reviews-YYYY-MM-DD`). Never commit review work onto an unrelated feature
branch.

## 2. Find what's new

Buzz blocks plain `curl` (returns a ~200-byte stub), so use the built-in
browser: open the author page in a tab, then run this with `javascript_tool`.
It walks every page of the listing (10 per page, newest first).

```js
const base = location.origin + location.pathname;
const all = [];
for (let start = 0; ; start += 10) {
  const d = new DOMParser().parseFromString(
    await fetch(base + (start ? `?start=${start}` : "")).then((r) => r.text()),
    "text/html",
  );
  const items = [...d.querySelectorAll(".userItemView")];
  if (!items.length) break;
  for (const i of items) {
    const a = i.querySelector(".userItemTitle a");
    all.push({
      id: a.getAttribute("href").match(/item\/(\d+)/)[1],
      url: new URL(a.getAttribute("href"), location.origin).href,
      published: i.querySelector(".userItemDateCreated").textContent.trim(),
      headline: a.textContent.trim(),
      img: i.querySelector(".userItemImage img")?.getAttribute("src"),
    });
  }
  if (items.length < 10) break;
}
all;
```

A review is new if its item id (the number after `/item/` in the URL) isn't
already in any `url:` line under `extra-eclipse/src/content/reviews/`:

```bash
grep -ho 'item/[0-9]*' extra-eclipse/src/content/reviews/*.md
```

Match on id, not date or title — headlines get edited and older files' dates
aren't exact publish dates.

If nothing is new, say so and stop.

## 3. Read each new review in full

Pull the article body for each new URL (run from the same Buzz tab):

```js
const urls = [/* new review URLs */];
const out = {};
for (const u of urls) {
  const d = new DOMParser().parseFromString(await fetch(u).then((r) => r.text()), "text/html");
  out[u] = d.querySelector(".itemFullText")?.innerText.replace(/\n\s*\n/g, "\n").trim();
}
out;
```

Read the whole review before choosing a quote — the best line is often in the
middle or the close, not the lede.

## 4. Write one file per review

Filename: kebab-case of the show title, e.g. `catch-me-if-you-can.md`.

```markdown
---
title: "Catch Me If You Can"
venue: "Lincolnshire Marriott Theatre"
date: 2025-09-06
quote: "Put simply, he was flawless, stepping into a role once played by Leonardo DiCaprio on the big screen and making it entirely his own on the Marriott’s stage."
cover: "https://www.buzznews.net/media/k2/items/cache/27bd0e104ee21ff71d987076442d0ceb_L.jpg"
url: "https://www.buzznews.net/theatre/theatre-reviews/item/5994-review-catch-me-if-you-can-at-marriott-theatre.html"
---
```

- **title** — the show's name as it's billed, not the article headline
  ("The Attic", not "The Attic at Goodman Theatre Redefines Memoir…"). For a
  one-off evening with a performer, use the show's billed name.
- **venue** — the theater, taken from the headline or the "running at…" line
  near the end of the review. Drop the city unless it's part of the name.
- **date** — the Buzz publish date (`published` above), `YYYY-MM-DD`. Used only
  for newest-first sorting; never shown.
- **cover** — the listing's `img`, made absolute, with `_Generic.jpg` swapped
  for `_L.jpg` (same hash, the larger size every existing card uses).
- **url** — the review's full URL.
- Values are double-quoted YAML. The quote must not contain a straight `"` —
  keep the review's curly quotes/apostrophes as published.

## 5. Choose the quote

The card is a teaser for the show *and* for Maddie as a writer. What she's
said she wants, from reviewing the first batch:

- **Verbatim.** Her words exactly — keep her punctuation, en dashes (–) and
  curly apostrophes. No paraphrasing or tidying.
- **Reflects the review's verdict.** Her reviews lean positive; the quote
  should match the overall take, not cherry-pick a stray compliment from a
  mixed review or a stray gripe from a rave.
- **Critical lines are welcome** when they're sharp, specific, or well
  written — e.g. for *44 The Musical*: "Still, joy alone can't sustain a new
  musical. … Without meaning, satire risks becoming little more than noise."
- **About the production, not the premise.** Prefer lines about the
  performances, the staging/craft, or her experience of it over lines that
  explain the script's concept (rejected: *Everybody*'s role-lottery setup).
  If the review is really about a star, the quote should be too (*Catch Me If
  You Can* → the line about JJ Niemann).
- **Her voice.** Lines with a turn of phrase or personality beat generic
  praise ("captivatingly painful to watch", "believe me, the outrageousness is
  abundant").
- **Substantial, but fits.** Aim for ~130–190 characters: a full thought, not a
  fragment, that renders in 3–4 lines on the card (the card clamps at 4 and
  would cut the rest off with "…"). Very short picks read as thin.
- **Splicing** two sentences with " … " is fine occasionally when they're from
  the same passage; call it out when you present it.

Pick one quote per review and have one alternate ready.

## 6. Check it on the page

Start the dev server with `preview_start` name `site` (config in
`.claude/launch.json`), set the viewport to 1440×900 with `resize_window`,
open `/reviews`, and run the check below. If new cards or edited quotes don't
show up, the dev server's content watcher has missed the change — it does this
reliably after a branch switch, and then keeps missing edits for the life of
that server. `preview_stop` it and start it again, and do the same after each
round of quote swaps.

```js
// Covers are loading="lazy" and remote, so force them all in before checking.
const covers = [...document.querySelectorAll(".cover")];
covers.forEach((img) => (img.loading = "eager"));
await Promise.all(
  covers.map((img) =>
    img.complete
      ? null
      : new Promise((r) => {
          img.onload = img.onerror = r;
          setTimeout(r, 10000);
        }),
  ),
);
[...document.querySelectorAll(".polaroid")].map((c) => {
  const q = c.querySelector(".quote");
  const img = c.querySelector(".cover");
  const lines = Math.round(q.scrollHeight / parseFloat(getComputedStyle(q).lineHeight));
  return `${c.querySelector(".open").firstChild.textContent.trim()}: ${
    q.scrollHeight > q.clientHeight + 1 ? "CLIPPED" : lines + " lines"
  }${img.naturalWidth ? "" : " — COVER DIDN'T LOAD"}`;
});
```

Any `CLIPPED` quote needs a shorter pick; any missing cover needs the URL
checked. Also confirm the new cards sort to the top in publish order. Reset
the viewport with `resize_window` preset `desktop` when done, and take a
screenshot for Maddie.

## 7. Hand off

Show Maddie a table: show, venue, quote (flag any splice), and the alternate.
She picks the quotes — expect a round of swaps. Commit on the branch only once
she's happy, and ask before merging or pushing to `main`, since that deploys
the live site.
