# Yalbum — marketing site

Next.js 16 (App Router) + Tailwind 3 + Supabase. This repo is the **website**,
not the mobile app.

`app/page.tsx` renders `components/site/SiteLanding` for logged-out visitors and
redirects everyone else into the app pages (`/albums`, `/album/[id]`, …).

## Current work: landing page redesign

Spec: **`docs/design-guide.md`** (the whole redesign, both platforms — Part 3 is
this site). Section references like "§3.3" throughout the code point at it.

Live status and next steps: **`docs/REDESIGN-PROGRESS.md`** — read it first.

### How we're working (agreed with the user)

The user is **learning as we build**, not outsourcing. Working split:

- **Claude does** — config, tokens, build setup, reusable primitives that are
  mostly data (`StoreBadge`, `PhoneMockup`, `Eyebrow`), and cleanup of its own
  scaffolding comments.
- **The user writes** — all section layout and visual JSX.

So: scaffold a file with the copy constants, a docblock describing the spec, and
a `{/* TODO */}`, then hand it over. **Don't write the section's JSX for them.**
When they submit, review it — name the bug, explain the underlying rule, let
them apply the fix. Explaining *why* matters more than the diff.

## Conventions established

**Tokens are the single source of truth.** All colour lives in the `:root` block
of `app/globals.css`. No hex anywhere else (§4.2). If the guide introduces a
colour that isn't a token (it does occasionally), add a token rather than
inlining it.

**Colours are stored as RGB channels**, not hex: `--brand: 46 134 240`. Tailwind
consumes them as `rgb(var(--brand) / <alpha-value>)`, which is what makes
`bg-brand/20` work. In raw CSS always wrap: `rgb(var(--brand))`.

**Gradients need a type hint**: `bg-[image:var(--brand-gradient)]`. Without
`image:` Tailwind guesses `background-color` and the value is discarded.

**Never build class names from fragments** — `bg-${accent}-tint` produces
nothing, because Tailwind scans source as text and never runs the code. Use a
lookup map of complete class strings (see `ACCENTS` in `Features.tsx`).

**Outer/inner section pattern**: the `<section>` owns background, position and
vertical padding and is full-bleed; an inner `<div>` owns
`mx-auto max-w-content px-14`. Don't put `max-w-content` on the section — it
caps the background too.

**Tailwind spacing is 0.25rem steps, not pixels.** `px-14` is 56px. Values off
the scale need arbitrary syntax: `pt-[150px]`.

## Known deviations from the guide

These are deliberate user decisions — don't "fix" them:

- Nav has one **"Login / Sign Up"** button (`/login`, new tab) instead of the
  guide's separate "Log in" link + "Get started" button.
- **Pricing** nav link is commented out rather than pointed at `#features`
  (§3.5 allows either).
- Hero social proof reads **"Join the community that listens to your
  suggestions"** instead of the unverified "12,000+ families" (§4.1 asset #6).
- Hero CTA is `rounded-badge` at 56px to match the store badges, not
  `rounded-pill`.

## Blocked

`PhoneMockup` renders a placeholder. It needs 2x/3x screenshots of the
**redesigned** app (§4.1 asset #1), which ships first. The old images in
`public/screenshots/` are pre-redesign — do not use them.

## Commands

```
npm run dev     # localhost:3000
npm run build
npx tsc --noEmit
```

Backgrounded dev servers get killed between turns in this setup — ask the user
to run `!npm run dev` in their own session instead.
