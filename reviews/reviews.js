
// theatre = location
// books = author

const reviews = [
{
  title: "Black and Highly Flavored",
  image: "https://www.buzznews.net/media/k2/items/cache/d054faa07a98715a7d1de7165210509b_L.jpg",
  category: "Theatre",
  location: "The Second City's Up Comedy Club",
  date: "February 2026",
  excerpt: "Now in its fourth year as Second City's Black Excellence Revue, the show is a sharp and joyful two-act performance that blends sketch comedy, improv, music, and dance to uplift Black artists while remaining accessible, engaging, and enjoyable - and even relatable - for everyone in the audience.",
  link: "https://www.buzznews.net/theatre/theatre-reviews/item/6176-black-and-highly-flavored-ignites-second-city-s-up-a-joyride-of-wit-warmth-and-wild-energy.html",
  linkText: "Read the full Buzz Center Stage",
},

{
  title: "Everybody",
  image: "https://www.buzznews.net/media/k2/items/cache/945dc0e48c3ef9d21b0e553e4e8c6b4e_L.jpg",
  category: "Theatre",
  location: "Greenhouse Theater Center",
  date: "December 2025",
  excerpt: "At the start of each performance, the actors are randomly assigned their roles by lottery, creating 120 possible cast combinations. The performance I saw was effectively unrehearsed yet never unprepared. It was incredible, and knowing it was done only once, just for this audience, is an experience you can't get anywhere else. Rather than feeling unpolished or improvisational, the production felt confident, precise, and alive—a balance that speaks not only to the performers' skills but also to the steady hand of director Greta Mae Geiser.",
  link: "https://www.buzznews.net/theatre/theatre-reviews/item/6117-review-couch-penny-ensemble-s-everybody-at-greenhouse-theater-center.html",
  linkText: "Read the full review here with Buzz Center Stage",
},

{
  title: "Manual Cinema's Christmas Carol",
  image: "https://www.buzznews.net/media/k2/items/cache/00073c25017e2b17b3303bfd3435a224_L.jpg",
  category: "Theatre",
  location: "Studebaker Theater",
  date: "December 2025",
  excerpt: "At the center of it all - a smart adaptation of a classic, stunning puppetry, and haunting music - is everyone's new favorite aunt, Aunt Trudy, played by LaKecia Harris. Truly incredible on every level, Harris portrays a grieving widow and beginner puppeteer on the big screen while simultaneously operating as a vital part of the onstage puppeteering machine, grounding the production with warmth, humor, and emotional clarity.",
  link: "https://www.buzznews.net/theatre/theatre-reviews/item/6116-review-manual-cinema-s-christmas-carol-at-studebaker-theater.html",
  linkText: "Read the full review here with Buzz Center Stage",
},

{
  title: "The Jinkx & DeLa Holiday Show",
  image: "https://www.buzznews.net/media/k2/items/cache/76c374d8caf8fdc3be5951b0a5a053ad_L.jpg",
  category: "Theatre",
  location: "The Chicago Theatre",
  date: "December 2025",
  excerpt: "Jinkx Monsoon and BenDeLaCreme craft a completely fresh production - new themes, script, music, choreography, costumes - supported by months of writing and rehearsal. It takes a village of brilliant, authentic artists to pull off such a one-of-a-kind performance that feels both polished and chaotic. The end result is a show that feels handcrafted with love, humor, and both endless glitter and weed.",
  link: "https://www.buzznews.net/theatre/theatre-reviews/item/6110-outrageous-heartfelt-and-hilarious-jinkx-dela-s-holiday-magic-lands-in-chicago.html",
  linkText: "Read the full review here with Buzz Center Stage",
},

{
  title: "The Sporting Life",
  image: "https://www.buzznews.net/media/k2/items/cache/6f31a96f82a525fcca7d0a1f53c2d9ce_L.jpg",
  category: "Theatre",
  location: "Factory Theater",
  date: "October 2025",
  excerpt: "Not all art needs to be for everyone. That said, for anyone personally acquainted with (or at least comfortable around) Millennial and Gen-Z “femme fury”, Director Kayla Menz's production of The Sporting Life is a riot that will have you laughing from beginning to end.",
  link: "https://www.buzznews.net/theatre/theatre-reviews/item/6044-review-the-sporting-life-at-factory-theater.html",
  linkText: "Read the full review here with Buzz Center Stage",
},

{
  title: "House of the Exquisite Corpse V: Blood & Puppets",
  image: "https://www.buzznews.net/media/k2/items/cache/e972bf2e81bb6a237789d30168757aba_L.jpg",
  category: "Theatre",
  location: "Steppenwolf Merle Reskin Garage",
  date: "October 2025",
  excerpt: "More than a haunted house and not quite a play, the House of the Exquisite Corpse series' artistry on display is staggering, extending far beyond set design. Each vignette - created by a different team of artists - interprets the theme in personal and provocative ways, resulting in a thrilling range of styles and techniques.",
  link: "https://www.buzznews.net/theatre/theatre-reviews/item/6032-review-house-of-the-exquisite-corpse-v-blood-puppets-from-rough-house-theater-co-at-steppenwolf-s-merle-reskin-garage.html",
  linkText: "Read the full review here with Buzz Center Stage",
},

{
  title: "Ghost Fetus",
  image: "https://www.buzznews.net/media/k2/items/cache/68280b3682d8f58aceae62fa90e2215b_L.jpg",
  category: "Theatre",
  location: "Trap Door Theater",
  date: "September 2025",
  excerpt: "Ghost Fetus may not offer the polish of a mainstage production, but its rawness - feeling more like a communal act of introspection than a neatly packaged play - is precisely what makes it compelling.",
  link: "https://www.buzznews.net/theatre/theatre-reviews/item/6001-review-ghost-fetus-at-trap-door-theater.html",
  linkText: "Read the full review here with Buzz Center Stage",
},

{
  title: "Catch Me If You Can",
  image: "https://www.buzznews.net/media/k2/items/cache/27bd0e104ee21ff71d987076442d0ceb_L.jpg",
  category: "Theatre",
  location: "Lincolnshire Marriott Theatre",
  date: "September 2025",
  excerpt: "If anyone could have carried the entire production single-handedly, it would have been JJ Niemann - but fortunately, he didn't have to. Every member of the cast shone on the stage in every aspect, truly making the show a shared success.",
  link: "https://www.buzznews.net/theatre/theatre-reviews/item/5994-review-catch-me-if-you-can-at-marriott-theatre.html",
  linkText: "Read the full review here with Buzz Center Stage",
},

{
  title: "44 The Musical",
  image: "https://www.buzznews.net/media/k2/items/cache/f57c5c8fe50b3520286389f58aee96b5_L.jpg",
  category: "Theatre",
  location: "Studebaker Theater",
  date: "September 2025",
  excerpt: "Satire can be a powerful tool in art, but only when it pairs humor with meaning. 44 The Musical certainly delivers laughs, but too often without a clear purpose, leaving its comedy feeling flat rather than insightful.",
  link: "https://www.buzznews.net/theatre/theatre-reviews/item/5987-review-44-the-musical-at-studebaker-theater.html",
  linkText: "Read the full review here with Buzz Center Stage",
},

{
  title: "Fiddler on the Roof",
  image: "https://www.buzznews.net/media/k2/items/cache/e5839fb1c37d21e74877e07b06185241_L.jpg",
  category: "Theatre",
  location: "North Shore Center for the Performing Arts",
  date: "August 2025",
  excerpt: "Wonderfully directed by L. Walter Stearns, Music Theatre Works' production brought this struggle for balance to life with both humor and heart to North Shore Center for the Performing Arts.",
  link: "https://www.buzznews.net/theatre/theatre-reviews/item/5965-review-music-theatre-works-fiddler-on-the-roof-at-north-shore-center-for-the-performing-arts.html",
  linkText: "Read the full review here with Buzz Center Stage",
},

// Add more reviews here...

];
