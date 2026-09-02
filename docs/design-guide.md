# Yalbum — Complete Design & Build Guide

**One document for the whole redesign: the mobile app and the marketing website.**

**Audience:** you (learning as you build) and Claude Code / a developer working from this file alone.
**Status:** design approved. Direction = "Playful Pop" — light mode, blue accent, pastel album themes.

**Prototypes to open alongside this doc:**
| File | What it shows |
|---|---|
| `Yalbum App.dc.html` | The mobile app — every screen, clickable |
| `Yalbum Web.dc.html` | The website, desktop (1280px) |
| `Yalbum Web Mobile.dc.html` | The website, mobile (390px) + nav overlay |

**Compare against:** your original screenshots (web landing; app login, album selection, album view, viewer, comments, upload, create modal, profile).

> **Ship order — important.** Build and release the **app redesign first**. The website shows previews of the redesigned app, so launching the site early would advertise a UI that doesn't exist yet.

---

## Table of contents

**Part 1 — Shared design system** (both platforms use this)
1.1 Why the redesign · 1.2 Color · 1.3 Typography · 1.4 Logo · 1.5 Shape & elevation · 1.6 Motion · 1.7 Rules of thumb

**Part 2 — Mobile app**
2.1 Scope · 2.2 Global chrome · 2.3 Screens (login → settings) · 2.4 Album settings notes · 2.5 Implementation notes

**Part 3 — Website**
3.1 Scope · 3.2 Components · 3.3 Desktop sections · 3.4 Responsive (tablet + mobile) · 3.5 Links & interactions · 3.6 Accessibility · 3.7 Copy reference

**Part 4 — Delivery**
4.1 Assets needed · 4.2 Build checklists · 4.3 Suggested build order

---

# Part 1 — Shared design system

Both the app and the website use the **same** tokens. Define them once per codebase; never fork a second palette.

## 1.1 Why the redesign

The original felt like an MVP: flat or harsh colors, a default system font, no motion, and no sense of interactivity. The structure and flows were fine — the surface wasn't.

The redesign keeps every existing flow and feature and changes only how it looks and feels: soft light surfaces, one confident blue accent, playful pastel album identities, friendly display type, and small purposeful animations. The goal is *orderly and warm* — Instagram-level calm, not constant movement — so the app feels like a place you want to keep memories.

## 1.2 Color

```css
:root {
  /* Brand — one accent carries all interactive meaning */
  --brand:          #2E86F0;
  --brand-light:    #4DA6FF;
  --brand-gradient: linear-gradient(135deg, #2E86F0, #4DA6FF);

  /* Text */
  --ink:            #1c1a24;   /* app headings/body   */
  --ink-web:        #141626;   /* web headings        */
  --ink-body:       #5a5f6e;   /* web paragraphs      */
  --ink-secondary:  #8b8896;   /* app secondary text  */
  --ink-muted:      #adaab6;   /* placeholders, inactive tabs, meta */

  /* Surfaces */
  --surface:        #ffffff;
  --surface-alt:    #f5f4f7;   /* app inputs, chips   */
  --surface-alt-web:#f5f7fa;
  --page-bg:        #fdfdfe;
  --footer-bg:      #0f1320;
  --footer-text:    #c2c7d6;
  --footer-muted:   #8a90a3;

  /* Feedback */
  --danger:         #FF5A5A;   /* app only: Delete, Report, Log Out */
  --hairline:       rgba(0,0,0,0.06);
}
```

**Warm page wash** (app home, web hero): `radial-gradient(120% 70% at 100% 0%, #fff6f4 0%, #ffffff 55%)`.

### Pastel album themes

Each album picks one. Used for its tile gradient, avatar stack, and viewer accents in the app; as decorative icon chips, numbered circles, and blur blobs on the web.

| Theme | Gradient | Deep text | Web tint bg | Web icon |
|---|---|---|---|---|
| Coral | `#FFE3DE → #FFC4BA` | `#8a2f28` | `#FFE3DE` | `#FF6B6B` |
| Blue | `#DCEEFF → #B4D9FF` | `#0b3d66` | `#DCEEFF` | `#2E86F0` |
| Mint | `#D6F7EC → #A6ECD3` | `#0a5a44` | `#D6F7EC` | `#0ea371` |
| Violet | `#EEE3FF → #D3BCFF` | `#4a1d8a` | `#EEE3FF` | `#7c3aed` |
| Amber | `#FFF0D6 → #FFDFA6` | `#8a5a09` | `#FFF0D6` | `#FBBF24` |
| Rose | `#FF6BAA` (solid swatch) | — | — | — |

**The one rule that keeps this coherent:** chrome is always **blue** (logo, active tab, links, primary buttons, FAB). Pastels are *identity and decoration only*. Red appears only for destructive actions, and never on the website.

## 1.3 Typography

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,600;12..96,700;12..96,800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

- **Display — `Bricolage Grotesque`** (500–800): wordmark, all headings, album names, screen titles, numbered circles, invite-code cells. This is what gives the product its character; the original's default font is the single biggest reason it read as generic.
- **Body / UI — `Plus Jakarta Sans`** (400–800): everything else.

Use `font-display: swap`. Apply `text-wrap: pretty` to headings and paragraphs.

**App type scale**

| Role | Size | Weight | Family |
|---|---|---|---|
| Screen title | 30px | 700 | Bricolage |
| Wordmark | 22–25px | 700 | Bricolage |
| Album name (tile) | 22px | 700 | Bricolage |
| Card / section title | 17–22px | 700 | Bricolage |
| Body | 15–16px | 400–600 | Jakarta |
| Secondary / meta | 12.5–14px | 400–600 | Jakarta |
| Tab label | 11px | 600 | Jakarta |

**Web type scale**

| Role | Desktop | Mobile | Weight | Family |
|---|---|---|---|---|
| Hero H1 | 66px / 1.02 / -1px | 38px / 1.06 | 700 | Bricolage |
| Section H2 | 44px / -0.5px | 30px | 700 | Bricolage |
| Showcase H2 | 40px / 1.08 | 28px | 700 | Bricolage |
| CTA H2 | 46px / 1.08 | 30px | 700 | Bricolage |
| Card title | 22px | 20px | 700 | Bricolage |
| Hero body | 19px / 1.55 | 17px | 400 | Jakarta |
| Body | 15.5–18px / 1.6 | 15.5px | 400 | Jakarta |
| Eyebrow | 13px, `letter-spacing:1.5px`, uppercase | same | 700 | Jakarta |
| Nav / buttons | 15–17px | 16px | 600–700 | Jakarta |

## 1.4 Logo

Keep the **original aperture / camera-iris mark** — circle, X crosshair, blue center dot. Not a plain single dot.

```html
<svg width="26" height="26" viewBox="0 0 26 26" role="img" aria-label="Yalbum">
  <circle cx="13" cy="13" r="11" fill="none" stroke="#2E86F0" stroke-width="1.6"/>
  <line x1="6.2" y1="6.2" x2="19.8" y2="19.8" stroke="#2E86F0" stroke-width="1.6" stroke-linecap="round"/>
  <line x1="19.8" y1="6.2" x2="6.2" y2="19.8" stroke="#2E86F0" stroke-width="1.6" stroke-linecap="round"/>
  <circle cx="13" cy="13" r="3.1" fill="#fff"/>
  <circle cx="13" cy="13" r="1.9" fill="#4DA6FF"/>
</svg>
```

Footer / dark variant: strokes `#4DA6FF`, inner circle filled with the dark background (`#0f1320`) instead of white.

## 1.5 Shape & elevation

**Radii**

| Element | Radius |
|---|---|
| Inputs, buttons, chips (app) | 13–15px |
| Cards (app) | 20–24px |
| Album tiles | 24px |
| Photo grid tiles | 14px |
| Bottom sheets / modals | 26–28px (top corners) |
| Web cards | 24px |
| Web large panels (showcase, CTA) | 34px desktop / 24px mobile |
| Avatars, pills | 99px |

**Shadows** — soft, and *colored* on brand elements. This is what replaces the old flat look.

| Element | Shadow |
|---|---|
| Primary button (app) | `0 10px 24px rgba(46,134,240,0.32)` |
| Primary button (web) | `0 12px 28px rgba(46,134,240,0.34)` |
| FAB | `0 12px 26px rgba(46,134,240,0.45)` |
| Card (app) | `0 8px 22px rgba(20,20,40,0.05)` |
| Card (web) | `0 10px 30px rgba(20,30,60,0.05)` |
| Album tile | `0 12px 26px rgba(<theme>, 0.18)` |
| CTA panel | `0 30px 70px rgba(46,134,240,0.32)` |
| Phone mockup | `filter: drop-shadow(0 34px 70px rgba(20,30,60,0.26))` |

**Layout:** web content max-width 1280px, section padding `90–100px` vertical / `56px` horizontal (desktop). App minimum tap target **44×44px** — same minimum on the web's mobile view.

## 1.6 Motion

Subtle and purposeful. Motion should confirm an action or introduce content — never decorate idly.

```css
@keyframes riseIn  { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:none} }   /* app  */
@keyframes riseInW { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:none} }   /* web  */
@keyframes popIn   { from{opacity:0;transform:scale(.96) translateY(20px)} to{opacity:1;transform:none} }
@keyframes sheetUp { from{transform:translateY(100%)} to{transform:translateY(0)} }
@keyframes fadeIn  { from{opacity:0} to{opacity:1} }
@keyframes floaty  { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
@keyframes floaty2 { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
```

| Where | What |
|---|---|
| App lists, tiles, grid | `riseIn`, staggered 60–70ms per item |
| Login card, FAB | `popIn` |
| Upload screen, modals | `sheetUp` (0.34s) over a `fadeIn` backdrop |
| Photo viewer sheet | height transition, `cubic-bezier(.4,0,.2,1)`, 0.4s |
| Web sections | `riseInW` on scroll into view (IntersectionObserver, ~0.5s, stagger 60–80ms), **once** — don't replay on scroll back |
| Web phone mockups | `floaty 6s` (hero), `floaty2 7s` (showcase) — **desktop only** |
| Press (app) | `transform: scale(.94–.98)` on `:active` |
| Hover | tiles/cards `translateY(-3–4px)`; buttons `filter:brightness(1.05–1.06)`; big web CTAs also `translateY(-2px)`. Transition `0.2s ease` |

**Required:** honor `prefers-reduced-motion: reduce` — no transforms, no float, content visible at rest.

## 1.7 Rules of thumb

Five things that make the difference between "MVP" and "designed". Keep these in mind while coding:

1. **One accent.** Blue means "you can act on this". If everything is colorful, nothing reads as interactive.
2. **Soft, colored shadows** instead of hard borders. Depth is what makes flat UI feel tactile.
3. **Display font on names and titles only.** Bricolage on headings, Jakarta everywhere else — mixing them per-element is what creates hierarchy.
4. **Motion on entry and on press, not in the background.** Staggered `riseIn` + a scale on tap gives the feeling of interactivity you were missing, without anything constantly moving.
5. **Generous space is fine.** A sparse screen (e.g. Upload) is a *focused* screen. Don't pad it with filler.

---

# Part 2 — Mobile app

## 2.1 Scope

Visual and interaction redesign **only**. All flows, data, routes, API behavior, and features stay exactly as they are. You are restyling existing screens, not rebuilding the product.

Screens covered: Login · Albums home · Album view · Photo/video viewer (two ownership states) · Upload · Create album modal · Join album modal · Album settings · Profile · Settings.

## 2.2 Global chrome

### Bottom tab bar — Albums / Profile / Settings
Frosted white: `background: rgba(255,255,255,0.9); backdrop-filter: blur(12px); border-top: 1px solid rgba(0,0,0,0.06)`. Three items, icon + 11px label. Active `--brand`, inactive `--ink-muted`. Icons: grid, person, gear.

### Floating action button (upload)
**Keep the FAB** — it works and you want it. Shown **only inside an album view**. 60px `--brand-gradient` circle at `right:20px; bottom:96px` (clears the tab bar), shadow `0 12px 26px rgba(46,134,240,0.45)`, `popIn` on mount, scale on press.

## 2.3 Screens

### Login
*(You liked the original — this only reskins it.)*
Centered white card, radius 28px, soft blue shadow, `popIn`. Aperture logo + "Yalbum" + "Welcome back — your memories await". Two `--surface-alt` inputs (Email; Password with an eye toggle), then a `--brand-gradient` **Sign In** button. Below: "Forgot your password? **Reset it**" and "New here? **Create an account**".
**Interaction:** Sign In → label swaps to "Signing in…" → app appears after ~650ms.

### Albums home (album selection)
Header: logo + wordmark left, circular avatar (blue gradient + initial) right. Subtitle "6 shared albums · 12 friends".

**2-column grid of large album tiles** — ~176px tall, radius 24px. Each tile carries its album's pastel gradient, an overlapping member avatar stack (top-left), the album name in Bricolage, and "N photos · N members" in the theme's deep text color. Tiles `riseIn` staggered, hover-lift, press-scale.

Final cell: dashed-border blue **"New album"** tile → Create modal.
Below the grid: "Have an invite code? **Join an album**" → Join modal.

### Album view (photo grid)
Sticky frosted header: back chevron (blue) · album name (Bricolage) · options (•••) button. Under it, filter/sort **chips** — active "All Photos · N" in a blue tint, "Newest" neutral.

**3-column photo grid**, 6px gaps, 14px radius, `riseIn` staggered. Videos show a play badge. Tap → viewer. FAB visible on this screen only.

### Photo / video viewer
*(Keep the swipe-up interaction — it's one of the best things about the current app.)*

Full-screen overlay `rgba(18,14,20,0.94)`, `fadeIn`. Frosted close button top-left. Photo centered above a bottom sheet.

**Comments hidden by default:** sheet at 34% height, photo at 66%. Drag handle + author row. **Swipe up or tap the sheet** → sheet grows to 82%, photo shrinks to 18% (animated, 0.4s). The hint "Swipe up to read the conversation ↑" shows only while collapsed.

Two ownership states — this is the difference between your two original screenshots:

| | Your own photo | Someone else's |
|---|---|---|
| Author row | Name + "You · date" | Their name + date + ••• menu |
| Actions | **Download · Move · Delete** (Delete red) | **Download · Report** (Report red outline) |
| Comments | Empty state: "No comments yet / Be the first to share a memory here." | Populated thread |
| Per-comment action | Delete on your own comments | Report on others' |

Sticky composer at the bottom: pill input "Add a comment…" + blue-gradient send button.

### Upload
Slides up (`sheetUp`) full-screen. Header: **Cancel** (blue) · "Upload" · spacer. Selected thumbnails each with a red remove badge; a dashed **"Add more photos"** drop zone; a blue-gradient **"Upload N photo(s)"** button.

> The roomy layout here is intentional. It's a focused, single-purpose step — leave the space.

### Create album modal
*(Same sheet shell is reused for Join, Edit album, and Create folder.)*
Bottom sheet, `sheetUp`, 28px top radius, dimmed backdrop. Title "New Album" + close X. "ALBUM NAME" input. **THEME COLOR** row — six pastel swatches; the selected one gets a ring: `box-shadow: 0 0 0 3px #fff, 0 0 0 6px <that swatch's color>`. A dashed **"Or set a cover photo"** row (this is where the color / cover-photo choice lives). Cancel + **Create Album**.

### Join album modal
Same shell. "Join an Album" + one line of explanation. **Six single-character code cells** in Bricolage — filled cells get a blue border, empty cells stay neutral. Cancel + **Join**.

### Album settings
Grouped cards in the same language as Profile/Settings: album name + **Album Color** swatches, **Save Changes**, then Invite Code (with copy button), Members list with an amber **Owner** badge, and a **Danger Zone** card holding a red-outlined Delete Album.

Four refinements to apply (see §2.4).

### Profile
Title "Profile". Cards: **Profile Picture** (avatar + blue "Change"), **Display Name** (input + outlined "Update Name"), **Security** (neutral "Change Password"). Bottom: **Log Out** in `--danger` text on a white card.

### Settings
Title "Settings". Grouped white cards, each row = colored icon chip + label + chevron: Notifications, Privacy & Security, Storage ("2.4 GB"), Help & Support, About Yalbum ("v1.0.1"). Rows highlight on press.

## 2.4 Album settings — refinements

1. **Match the selected-swatch ring** to the create modal: white gap + a ring in *the swatch's own color* (`0 0 0 3px #fff, 0 0 0 6px <color>`), not a dark navy ring.
2. **Scope "Save Changes"** — it sits under Album Color, so it reads as saving name + color only. Disable it until one of those actually changes, so users don't think it saves the whole screen.
3. **Invite code affordance** — show a brief "Copied!" confirmation on tap, plus a one-line helper ("Share this code to invite people").
4. **Even out spacing** — the gap under the color swatches is larger than elsewhere; bring it to the standard section spacing.

## 2.5 Implementation notes

- Lift every value in Part 1 into real tokens (CSS variables, a theme object, or your RN theme file). No hardcoded hex outside that one place — the accent should be changeable in a single edit.
- Album theme color is **per-record data**, not a token. Store the theme key on the album.
- The prototype uses diagonal-stripe gradients as photo placeholders. Swap for real `<img>`/`<video>` with `object-fit: cover` and identical radii.
- Copy in the prototype is realistic placeholder — keep the tone ("your memories", "the people who were there") but wire it to real data.
- Honor `prefers-reduced-motion` for all entry animations and sheet transitions.

---

# Part 3 — Website

## 3.1 Scope

A single-page marketing site. Its job: explain Yalbum in one scroll and drive **App Store / Google Play** downloads.

**In scope:** one long-scroll landing page (7 sections), fully responsive (desktop / tablet / mobile). A static site is fine — Next.js, Astro, or plain HTML + CSS.

**Out of scope:** pricing page, blog, docs, in-browser app, account creation. Nav links to those are placeholders (§3.5).

## 3.2 Components

| Component | Props / variants | Used in |
|---|---|---|
| `<Logo>` | `variant: light \| dark` | Nav, footer |
| `<ButtonPrimary>` | label, href, optional arrow | Nav, hero |
| `<StoreBadge>` | `store: apple \| google`, `theme: dark \| light` | Hero (dark), CTA (light) |
| `<Eyebrow>` | text, color | Showcase, How-it-works |
| `<FeatureCard>` | icon, accent, title, body | Features ×3 |
| `<StepItem>` | number, accent, title, body | How-it-works ×3 |
| `<CheckItem>` | accent, text | Showcase ×3 |
| `<PhoneMockup>` | screen, scale, float | Hero, Showcase |
| `<AvatarStack>` | array of pastel gradients | Hero social proof |
| `<MobileNav>` | open state | Mobile only |

### Store badges
Two-line format: small "Download on the" / "Get it on" above a large "App Store" / "Google Play". 56px tall desktop (50–52px mobile), radius 14–15px, icon left.
- **Dark** (hero, on light background): `background:#141626`, white text.
- **Light** (CTA, on blue): white background, `#141626` text, `box-shadow: 0 12px 28px rgba(0,0,0,0.15)`.

> The prototypes use hand-drawn SVG marks. **Swap in the official Apple and Google badge assets before launch** and follow each store's branding rules (minimum size, clear space, no recoloring).

### Phone mockups
Two options for production:
1. **Static images (recommended)** — export 2x/3x PNGs of the redesigned app screens in a device frame. Simple, fast, no runtime cost.
2. **Live component** — render the real app UI in an iframe or shared component library. Always in sync, more complexity.

Screens shown: **Albums home** (hero) and **Album view** (showcase). Both must be the *redesigned* app.

**Crop treatment:** on mobile both phones sit in fixed-height `overflow:hidden` containers with a **fade overlay** as the last child, tinted to the section's own background — white in the hero, the panel's peach tone (`#fdf3f0`) in the showcase. Without the fade the device gets chopped by a hard line and reads as a bug.

## 3.3 Desktop sections (1280px)

```
Nav (absolute over hero)
Hero            — headline, CTAs, store badges, phone, social proof
Divider strip   — hairline + one-line tagline
Features        — 3 cards
Showcase        — "See it in action" + phone + checklist
How it works    — 3 numbered steps
CTA banner      — headline + store badges
Footer          — logo, tagline, 2 link columns, copyright
```

### Nav
Absolutely positioned over the hero, transparent, padding `26px 56px`. Logo + wordmark left. Right: Features · How it works · Pricing · Log in, then a **"Get started"** primary button (44px). Links `#4a4f5c`, hover `--brand`; "Log in" in `--ink-web`.

### Hero
Background `radial-gradient(90% 70% at 78% 12%, #e3f0ff 0%, #f3f8ff 42%, #ffffff 72%)` plus two blur blobs (mint ~340px left, violet ~300px bottom-right, each `radial-gradient(circle, rgba(...,0.16), transparent 70%)`). Padding `150px 56px 90px`. Two columns, `gap:40px`.

**Left:**
1. Pill badge — white, `1px solid rgba(46,134,240,0.2)`, green dot, "Private by invite · no algorithms, no ads".
2. H1 — "The photos that matter, shared with the people who **were there.**" (final phrase in `--brand`). Hard line breaks on desktop only.
3. Paragraph, max-width 480px.
4. CTA row: **"Start your first album →"** + Apple badge + Google badge.
5. Social proof: 4 overlapping pastel avatars (`2.5px` white borders, `-11px` margin) + "**12,000+ families** keep their memories here".

**Right:** `<PhoneMockup screen="albums-home">` at ~0.6 scale, `margin-top: 96px`, on a faint blue glow, `floaty`.
> **Keep that 96px offset.** Without it the phone overlaps the nav and makes the links unreadable.

### Divider strip
`border-top: 1px solid var(--hairline)` + centered uppercase eyebrow: "A calmer way to keep memories, together".

### Features
White. Centered H2 "Everything a shared album should be" + subhead (max-width 560px). 3-column grid, `gap:22px`:

| # | Accent | Icon | Title |
|---|---|---|---|
| 1 | Blue | landscape/photo | **Albums with a soul** |
| 2 | Mint | two people | **Invite-only, always** |
| 3 | Violet | speech bubble | **Talk about the moment** |

Each card: `linear-gradient(160deg, <tint>, #ffffff)`, matching 1px tinted border, radius 24px, padding 32px, 54px rounded icon chip. Hover-lift.

### Showcase — "See it in action"
Rounded panel (34px) on `radial-gradient(90% 90% at 15% 10%, #eaf3ff 0%, #f4f9ff 55%, #fef4f1 110%)`, padding `60px 56px`, two columns `gap:48px`.
- **Left:** eyebrow · H2 "Open a photo, and the conversation comes with it." · paragraph · three check items (blue / mint / violet).
- **Right:** `<PhoneMockup screen="album-view">` at ~0.56, `floaty2`.

### How it works
Background `radial-gradient(80% 60% at 20% 0%, #eef5ff 0%, #f7fafe 60%)`. Eyebrow "Up and running in a minute" + H2 "Three steps to your shared album". Three centered steps (max-width 1000px, `gap:26px`), numbered circles 64px — white, tinted 1px border, Bricolage 26px accent number, soft tinted shadow.

### CTA banner
Full blue-gradient panel, radius 34px, padding `72px 60px`, two translucent white circles bleeding off the edges (`rgba(255,255,255,0.12)` and `0.08`). White H2, `rgba(255,255,255,0.9)` paragraph, then both **light** store badges.

### Footer
`--footer-bg`, padding `52px 56px`. Left: footer logo + wordmark + tagline (max-width 300px). Right: two link columns, `gap:64px` — **Product** (Features · Pricing · Download) and **Company** (About · Privacy · Contact). Links `--footer-text`, hover white. Bottom hairline `rgba(255,255,255,0.08)` + copyright.

## 3.4 Responsive

| Breakpoint | Range | Content width | Side padding |
|---|---|---|---|
| Desktop | ≥1024px | max 1280px | 56px |
| Tablet | 768–1023px | fluid | 40px |
| Mobile | <768px | fluid | 20px |

### Tablet (768–1023px)
- Nav → logo + hamburger.
- Hero → one column: text first, phone centered below (~0.55). Top padding ~120px. H1 → 48px.
- Features → 2 columns (third card full width, or a 2+1 layout).
- Showcase → stacked: text, then phone centered.
- How it works → 3 columns if they fit, else 1.
- Section vertical padding → ~70px.

### Mobile (<768px) — see `Yalbum Web Mobile.dc.html`
- **Nav:** sticky frosted bar (`rgba(255,255,255,0.86)` + `blur(12px)`), logo left, 44px hamburger right. Tap → full-screen white overlay: links stacked at 26px Bricolage with hairline dividers, then **"Get started"** full-width pinned near the bottom above both store badges. Close via X or a link tap. Lock body scroll, trap focus, Escape closes. Fade + slight rise, ~0.25s.
- **Hero:** one column, left-aligned, top padding ~22px under the sticky nav. H1 → 38px, no hard breaks. Body 17px. CTA stack = full-width primary button, then the two store badges **side by side** (50px tall); stack them if narrower than ~360px. Social proof avatars 32px. Phone mockup below, centered at ~0.5, **cropped with a white fade**, float disabled.
- **Features:** single column, full-width cards, `gap:16px`, padding 24px.
- **Showcase:** panel radius 24px, padding `40px 24px`, single column — text, then phone at ~0.48 cropped with a **peach-tinted** fade (`#fdf3f0`).
- **How it works:** single column, 34px gaps, numbered circles 56px.
- **CTA:** radius 24px, padding `48px 24px`, H2 30px, badges **stacked** full-width.
- **Footer:** logo + tagline, then the two link columns side by side, then copyright.
- Minimum tap target 44×44px. Section vertical padding ~56px.

## 3.5 Links & interactions

Give the sections these ids: `#features`, `#how-it-works`, `#download` (the CTA banner).

| Element | Destination | Behavior |
|---|---|---|
| Logo (nav) | `/` | Scroll to top if already home |
| Features | `#features` | Smooth scroll |
| How it works | `#how-it-works` | Smooth scroll |
| Pricing | `/pricing` | **Placeholder** — page not built. Point at `#features` or hide until it exists |
| Log in | app login URL | New tab if a separate domain |
| Get started (nav) | `#download` | Smooth scroll |
| Start your first album | `#download` | Smooth scroll |
| App Store badge ×2 | App Store listing | `target="_blank" rel="noopener"` |
| Google Play badge ×2 | Play Store listing | `target="_blank" rel="noopener"` |
| Footer → Features / Download | `#features` / `#download` | Smooth scroll |
| Footer → Pricing | `/pricing` | Same placeholder caveat |
| Footer → About / Privacy / Contact | `/about`, `/privacy`, `/contact` | **Privacy is required** before store submission; About/Contact can be simple pages or `mailto:` |

**Interactions checklist**
- `scroll-behavior: smooth` for anchors, plus `scroll-margin-top` on targets so the nav doesn't cover headings.
- Hover states on every clickable element; `cursor: pointer`.
- Visible focus ring: `outline: 2px solid var(--brand); outline-offset: 2px`.
- Scroll-triggered `riseInW`, once per element.
- Mobile menu: open/close, scroll lock, Escape, focus trap.
- No modals, no forms, no client state beyond the mobile menu.

## 3.6 Accessibility

- Semantic landmarks: `<header>`, `<main>`, `<section>`, `<footer>`. One `<h1>` (hero), `<h2>` per section.
- Logo SVG `role="img"` + `aria-label="Yalbum"`; decorative icons and blobs `aria-hidden="true"`.
- Store badges need descriptive labels — "Download Yalbum on the App Store", not "App Store".
- Verify **AA (4.5:1)**: `--ink-body` on white, and white on the blue gradient.
- Hamburger: `aria-expanded`, `aria-controls`, accessible name.
- Full keyboard operability, logical tab order, `prefers-reduced-motion` honored.

## 3.7 Copy reference

Final copy in page order.

**Nav:** Features · How it works · Pricing · Log in · Get started

**Hero**
- Badge: Private by invite · no algorithms, no ads *(mobile: "Private by invite · no ads")*
- H1: The photos that matter, shared with the people who were there.
- Body: Yalbum is a cozy, invite-only home for your group's memories. Create an album, drop a code to your people, and relive the moments together.
- CTA: Start your first album
- Proof: 12,000+ families keep their memories here

**Divider:** A calmer way to keep memories, together

**Features**
- H2: Everything a shared album should be
- Sub: No feeds to scroll, no strangers, no noise. Just your people and the moments you made together.
- Albums with a soul — Give each album its own color or cover photo. Whistler, Sunday dinners, the group chat crew — each one instantly recognizable.
- Invite-only, always — Share a six-character code and your people are in. No public profiles, no follower counts, no strangers wandering by.
- Talk about the moment — Comments live right under each photo — swipe up to relive the inside jokes and the "remember when" all over again.

**Showcase**
- Eyebrow: See it in action
- H2: Open a photo, and the conversation comes with it.
- Body: Tap into any memory to see it full-screen. Swipe up and the comments rise into view — reactions, inside jokes, and all the "I remember this!" from the people who were there.
- Checks: Comments hidden until you want them · Download or save any shot in a tap · Your photos, your controls

**How it works**
- Eyebrow: Up and running in a minute
- H2: Three steps to your shared album
- 1 Create an album — Name it, pick a color or cover photo, and it's yours in seconds.
- 2 Invite your people — Send the invite code. They tap it in and they're part of the album.
- 3 Share the memories — Upload, comment, and relive it together — anytime, anywhere.

**CTA**
- H2: Your memories deserve a better home.
- Body: Start free today. Create your first album and invite the people who were there.

**Footer**
- Tagline: A private, invitation-only home for the memories you make together.
- Product: Features · Pricing · Download
- Company: About · Privacy · Contact
- © 2026 Yalbum. Made for the people who were there.

---

# Part 4 — Delivery

## 4.1 Assets needed

1. **App screenshots** — redesigned Albums home + Album view, 2x/3x, device-framed or transparent. *Blocked on the app shipping.*
2. **Official store badges** — Apple and Google, light and dark.
3. **Store URLs** — live App Store and Play Store listings.
4. **Favicon / app icon** — aperture mark at 32 / 180 / 512px.
5. **OG image** — 1200×630, hero headline + phone.
6. **Real stats** — confirm or replace "12,000+ families".

## 4.2 Build checklists

**App**
- [ ] Fonts loaded; tokens defined in one place
- [ ] Aperture logo replaces the old mark everywhere
- [ ] Bottom tab bar frosted, blue active state
- [ ] FAB on album view only, correct offset above the tab bar
- [ ] All 10 screens restyled per §2.3
- [ ] Album theme colors wired as per-album data
- [ ] Viewer: both ownership states + swipe-up sheet animation
- [ ] Modals share one sheet shell (Create / Join / Edit / Folder)
- [ ] Album settings refinements (§2.4) applied
- [ ] `riseIn` / `popIn` / `sheetUp` in place; press feedback on all tappables
- [ ] `prefers-reduced-motion` honored
- [ ] Real media replaces placeholder gradients

**Website**
- [ ] Fonts loaded with `font-display:swap`
- [ ] Tokens as CSS variables — no hardcoded hex outside the token block
- [ ] All 7 sections at desktop, matching `Yalbum Web.dc.html`
- [ ] Tablet + mobile per §3.4, matching `Yalbum Web Mobile.dc.html`
- [ ] Mobile nav overlay: open, close, Escape, scroll lock, focus trap
- [ ] Phone mockup crops have fade overlays tinted to their section
- [ ] Hero phone keeps its `96px` top offset (desktop)
- [ ] Every link wired per §3.5; store badges open in a new tab
- [ ] Scroll animations fire once; floats desktop-only
- [ ] `prefers-reduced-motion` honored
- [ ] Keyboard navigation + visible focus
- [ ] AA contrast verified
- [ ] Official store badges swapped in
- [ ] Real app screenshots (not the old UI)
- [ ] Meta tags: title, description, OG image, favicon
- [ ] Lighthouse performance and accessibility ≥ 90

## 4.3 Suggested build order

Doing it in this order means each step gives you something visible, and nothing gets built twice.

1. **Tokens + fonts + logo** in the app. Nothing else. Confirm the type and color read right on one screen.
2. **Login**, since it's the simplest full screen and you already like its structure.
3. **Albums home** — the tiles are the signature moment; get the gradients, avatar stacks, and `riseIn` stagger right here and the rest follows.
4. **Album view + FAB**, then the **photo viewer** (the swipe-up sheet is the most involved piece — budget time for it).
5. **Modals** — build the sheet shell once, reuse for Create / Join / Edit / Folder.
6. **Upload, Profile, Settings, Album settings** — these are mostly the card/row patterns you've already built.
7. **Ship the app.**
8. **Capture real screenshots** of Albums home and Album view for the website.
9. **Website desktop** — nav, hero, then straight down the page.
10. **Website responsive** — tablet, then mobile, then the nav overlay.
11. **Accessibility and Lighthouse pass**, swap in official store badges, ship.
