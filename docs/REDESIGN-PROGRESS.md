# Landing page redesign — progress

Spec: [`design-guide.md`](./design-guide.md) — Part 3 is this site.
Working agreement and conventions: [`../CLAUDE.md`](../CLAUDE.md).

Branch: `Redesign`. Last updated: 2026-09-03.

---

## Where we are

**All seven sections of §3.3 are built.** Desktop layout only — the responsive
and motion passes have not started.

| # | Piece | Status |
|---|---|---|
| — | Fonts (Bricolage + Jakarta via `next/font`) | ✅ |
| — | Design tokens (`globals.css` + `tailwind.config.ts`) | ✅ |
| — | `Logo.tsx` → aperture mark, light/dark variants | ✅ |
| 1 | Nav | ✅ |
| 2 | Hero | ✅ |
| 3 | Divider strip | ✅ |
| 4 | Features | ✅ |
| 5 | Showcase | ✅ |
| 6 | How it works | ✅ |
| 7 | CTA banner | ✅ |
| 8 | Footer | ✅ |
| — | Responsive pass, tablet + mobile (§3.4) | ⬜ **next** |
| — | Motion + accessibility pass (§3.5, §3.6) | ⬜ |

## Session log

### 2026-09-01 — foundation + nav + hero

- Fonts loaded via `next/font/google` (self-hosted, `display: swap`), exposed
  as `--font-display` / `--font-sans` on `<html>`.
- Ported §1.2 colour, §1.5 radii/shadows and §1.6 motion into `globals.css`
  and `tailwind.config.ts`. Colours stored as **RGB channels** so Tailwind's
  `<alpha-value>` works (`bg-brand/20`).
- `Logo.tsx` rewritten from the 8-blade gradient mark to the §1.4 aperture
  mark, with a `variant` prop for the dark footer.
- Old `components/LandingPage.tsx` replaced by `components/site/SiteLanding.tsx`
  as the composition root; `app/page.tsx` repointed.
- Built `StoreBadge`, `PhoneMockup`, `Eyebrow` as shared primitives.
- Nav and Hero written by the user.

### 2026-09-02 — divider, features, handoff docs

- Divider strip and Features section built.
- Added `CLAUDE.md` and this file so the work survives a machine switch;
  copied the design guide into `docs/` (it previously only existed in
  `~/Downloads`).
- First commit of the redesign: `dfdbb30 "Redesign started."`

### 2026-09-03 — showcase, steps, CTA, footer

- Showcase, How it works, CTA banner and Footer built — the page is
  structurally complete.
- Footer link columns diverge from §3.3 on purpose: **Pricing / About /
  Contact were dropped** because those routes don't exist. Shipped
  Features · Download and Privacy · Support instead, all of which resolve.

## Bugs found and fixed this session

Recurring themes, all in user-written JSX, all caught in review:

- **Tailwind numeric scale read as pixels** — `pt-150`, `px-56`, `top-30`,
  `max-w-250`. Values off the scale emit no CSS at all and fail silently.
- **Layout property on the wrong element** — `justify-between` / `flex-row` /
  `justify-center` without a flex container; `items-center` on a flex *item*
  instead of the container.
- **Two utilities targeting one property** — `shadow-btn` + `shadow-lg`,
  `h-11` + `h-[56px]`, `text-footer-muted` + `text-white`. Winner is decided
  by stylesheet order, not source order.
- **Interpolated class fragments** — `bg-${accent}-tint`, `border-[accent]/40`.
  Tailwind scans source as text and never runs the code. Fixed with the
  `ACCENTS` / `CHECK_ACCENTS` / `STEP_ACCENTS` lookup maps.
- **`style` vs `className` confusion** — passing a class-name string to
  `style={{ background }}`.
- **Typos in class names** — `transitionll`, `var-(-hero-bg)`, `flex-centered`,
  `from-md`, `text-showcase`. All silent no-ops.
- **Invalid / non-semantic HTML** — `<button>` wrapping `<a>`; `<article>` for
  a list item; `<p>` where `<h3>` belonged.
- **Duplicate React keys** — keyed on `href` when two nav links shared one.
- **Self-closing separator div** — `border-t` + `pt-8` on an empty element
  instead of wrapping the copyright.
- **`PhoneMockup` scale base was wrong (Claude's bug)** — multiplied 390×844
  by 0.6 and produced a doll-sized phone. The guide's "0.6 scale" is 0.6 of a
  650px design frame. Now `FRAME_WIDTH = 650`.
- **Brittle decorative positioning** — `left-[1040px]` to reach the right edge
  of a panel whose width changes. Re-anchored to `-right-8`.

## Files

```
components/site/
  SiteLanding.tsx   composition root
  Nav.tsx           user
  Hero.tsx          user
  Divider.tsx       user
  Features.tsx      user
  Showcase.tsx      user
  Steps.tsx         user
  CtaBanner.tsx     user
  Footer.tsx        user
  Eyebrow.tsx       Claude
  StoreBadge.tsx    Claude
  PhoneMockup.tsx   Claude
constants/storeLinks.ts
docs/design-guide.md
```

Modified: `app/globals.css`, `app/layout.tsx`, `app/page.tsx`,
`components/Logo.tsx`, `tailwind.config.ts`.

**`components/LandingPage.tsx` is the old page** — still on disk, no longer
rendered. Delete once the redesign ships.

## Open items

- **Nothing responsive yet.** Only `md:`/`lg:` grid switches exist. §3.4 (tablet
  + mobile) and the mobile nav overlay are entirely unbuilt — the nav links are
  `hidden` below `md` with no hamburger to replace them.
- **No scroll animations.** `riseInW` is defined in the Tailwind config but
  never used; §3.5 wants IntersectionObserver-driven reveals, firing once.
- **Blob opacity** is `0.74` / `0.733` in `globals.css`; §3.3 specifies `0.16`.
  Turned up while debugging, never dialled back.
- **Phone mockups blocked** on redesigned-app screenshots (§4.1 asset #1).
  `public/screenshots/` is the pre-redesign UI — do not use.
- **Store badges** are hand-drawn SVGs; swap for official assets (§3.2).
  `PLAY_STORE_URL` is still `null`, rendering a disabled "Coming soon" badge.
- **Not verified:** AA contrast, keyboard nav, focus rings, Lighthouse (§4.2).
- Next.js warns about **two lockfiles** (one here, one at `C:\Users\bubly\`)
  and infers the wrong workspace root.
- Uncommitted as of this writing: `Showcase.tsx`, `Steps.tsx`, `CtaBanner.tsx`,
  `Footer.tsx`, plus edits to `Features.tsx` and `SiteLanding.tsx`.
