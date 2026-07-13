# Friends of Planet Uganda

A multi-page marketing website for a Ugandan conservation nonprofit — built around the **"Verdant Heritage"** design system (see `DESIGN.md` if included in your source docs): an editorial, high-trust aesthetic pairing Libre Caslon Text serif headlines with Manrope body copy, on a deep forest green / earthy tan / heritage parchment palette.

Static HTML/CSS/JS. No build step required to run it — just open a page in a browser.

---

## Project structure

```
├── index.html                 Home
├── our_work.html               Programs / conservation pillars
├── about_us.html                Org story, team, leadership
├── get_involved.html            Donate, volunteer, corporate partnerships
├── donation_successful.html    Post-donation confirmation
├── blog.html                    Blog index (links to both posts)
├── blog_1.html                  Article: "Guardian of the Mist"
├── blog_2.html                  Article: "One Million Saplings"
├── privacy.html                 Privacy policy
├── terms.html                   Terms of service
├── css/
│   └── styles.css              Compiled, authoritative stylesheet (see below)
├── js/
│   ├── tailwind-config.js      Design tokens, used by the CDN backup only
│   └── main.js                 All site interactivity
└── README.md
```

Every page shares the same header/nav, footer, `css/styles.css`, and `js/main.js`.

---

## Styling

**`css/styles.css` is the single source of truth for all styling.** It's a fully compiled stylesheet — every Tailwind utility class actually used across the site (`bg-primary`, `font-headline-md`, `px-margin-desktop`, etc.) plus the hand-written custom rules (glass/blur effects, gradients, scroll-reveal animations) are baked in as plain CSS. It works with **no JavaScript and no internet connection** required for styling.

```html
<link rel="stylesheet" href="css/styles.css">
```

### Tailwind CDN — kept only as a backup

Each page also loads the Tailwind Play CDN and `js/tailwind-config.js` right before `</head>`:

```html
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
<script src="js/tailwind-config.js"></script>
```

This is **not** the primary styling path — it's a safety net that only kicks in if a class gets added to the markup later that isn't already compiled into `styles.css`. If you edit the HTML and add new utility classes, regenerate the compiled stylesheet (see below) rather than relying on the CDN long-term.

### Regenerating `css/styles.css`

If you add/change Tailwind classes in the HTML:

```bash
npm install -D tailwindcss@3 @tailwindcss/forms @tailwindcss/container-queries
npx tailwindcss -i css/input.css -o css/styles.css
```

You'll need a `tailwind.config.js` with `content: ["./*.html"]` and the design tokens from `js/tailwind-config.js` (colors, spacing, fontFamily, fontSize, borderRadius), plus an `input.css` containing:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* then paste in the custom rules currently at the bottom of css/styles.css */
```

---

## JavaScript (`js/main.js`)

One shared script, loaded on every page, handles:

- **Scroll-reveal animations** — `IntersectionObserver` fades/slides elements in as they enter the viewport.
- **Nav & CTA routing** — plain-text buttons like "Donate" and "Volunteer" route to `get_involved.html#donate` / `#volunteer`; "View All Updates" routes to `blog.html`, etc.
- **Mobile menu toggle** — a generic fallback that opens/closes the nav links on small screens for any page that doesn't define its own menu logic.
- **Donation flow** — the amount/name/email widget on `get_involved.html` validates input, stores the selection in `sessionStorage`, then redirects to `donation_successful.html`, which personalizes its greeting using that stored data.
- **Volunteer inquiry form** — submits inline (no page reload) and swaps in a thank-you message.
- **Newsletter signup** — same inline-confirmation pattern on `index.html` and `blog.html`.

All handlers are written defensively (`querySelector` checks, text-content matching) so the single script is safe to include on every page even though each page only has a subset of the relevant elements.

---

## Pages & navigation

All internal links are wired between real pages (no leftover `#` placeholders in primary navigation):

| Link | Destination |
|---|---|
| Logo | `index.html` |
| Our Work | `our_work.html` |
| About Us | `about_us.html` |
| Get Involved | `get_involved.html` |
| Blog | `blog.html` → `blog_1.html` / `blog_2.html` |
| Donate (any page) | `get_involved.html#donate` |
| Volunteer (any page) | `get_involved.html#volunteer` |
| Footer: Privacy Policy / Terms | `privacy.html` / `terms.html` |
| Footer: Impact Report / Partnerships | `get_involved.html#impact` / `#corporate` |

Decorative social icons (footer) remain `#` placeholders since no live social accounts were provided — swap in real URLs when available.

---

## Running locally

No build tools needed. From the project root:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

(Opening `index.html` directly by double-clicking also works, but a local server avoids any browser quirks with relative paths.)

---

## Notes

- Photography throughout uses placeholder AI-generated stock imagery matching the brand's art direction (Ugandan landscapes, wildlife, and community portraits). Swap these `src` attributes for licensed or original photography before launch.
- Fonts (Libre Caslon Text, Manrope, Material Symbols) load from Google Fonts — replace with self-hosted fonts if you need to work offline or avoid the external request.
- `privacy.html` and `terms.html` contain placeholder legal copy and should be reviewed by counsel before publishing.
