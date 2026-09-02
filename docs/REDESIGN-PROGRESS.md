# Landing page redesign — progress

Spec: [`design-guide.md`](./design-guide.md) — Part 3 is this site.
Working agreement and conventions: [`../CLAUDE.md`](../CLAUDE.md).

Branch: `Redesign`. Last updated: 2026-09-02.

---

## Where we are

Building the seven sections of §3.3 top to bottom. Sections 1–3 done, on the
fourth.

| # | Piece | Status |
|---|---|---|
| — | Fonts (Bricolage + Jakarta via `next/font`) | ✅ |
| — | Design tokens (`globals.css` + `tailwind.config.ts`) | ✅ |
| — | `Logo.tsx` → aperture mark, light/dark variants | ✅ |
| 1 | Nav (§3.3) | ✅ |
| 2 | Hero (§3.3) | ✅ |
| 3 | Divider strip (§3.3) | ✅ |
| 4 | Features (§3.3) | 🟡 in progress — see below |
| 5 | Showcase (§3.3) | ⬜ not started |
| 6 | How it works (§3.3) | ⬜ not started |
| 7 | CTA banner (§3.3) | ⬜ not started |
| 8 | Footer (§3.3) | ⬜ not started |
| — | Responsive pass, tablet + mobile (§3.4) | ⬜ not started |
| — | Motion + accessibility pass (§3.5, §3.6) | ⬜ not started |

## Immediate next step

`components/site/Features.tsx` has a first draft from the user with **six
outstanding review notes**, already delivered and not yet applied:

1. `border-[accent]/40` → `${accent.border}` from the `ACCENTS` map, in a
   template literal. (Interpolated fragments don't work — see CLAUDE.md.)
2. Card row is `flex … space-evenly`; should be
   `grid gap-[22px] md:grid-cols-2 lg:grid-cols-3`. Flex sizes by content so
   cards come out unequal, and `space-evenly` isn't a class.
3. The 54px icon chip was never built — an empty `<div>` currently wraps the
   icon, title and body. Chip should hold only the icon, with `${accent.chip}`;
   title and body are its siblings.
4. `text-showcase` doesn't exist → `text-card-title` on the `<h3>`.
   The `<h2>` should be `text-h2` (44px), not `text-showcase-h2` (40px).
5. Padding: section `py-3 pb-16` → `py-24`; `px-14` is duplicated on the section
   *and* the inner div (keep the inner one); card `p-12` → `p-8`;
   `rounded-xl` → `rounded-card`.
6. Missing `transition hover:-translate-y-1` on the card, and `text-ink-body`
   on the body paragraph.

## Files

New, all untracked as of this writing:

```
components/site/
  SiteLanding.tsx   composition shell — sections get added here
  Nav.tsx           ✅ user-written
  Hero.tsx          ✅ user-written
  Divider.tsx       ✅ user-written
  Features.tsx      🟡 user-written, mid-review
  Eyebrow.tsx       Claude — reused in divider, showcase, how-it-works
  StoreBadge.tsx    Claude — apple/google × dark/light, disabled state
  PhoneMockup.tsx   Claude — device frame, placeholder inside
constants/storeLinks.ts
docs/design-guide.md
```

Modified: `app/globals.css` (tokens), `app/layout.tsx` (fonts),
`app/page.tsx` (renders `SiteLanding`), `components/Logo.tsx`,
`tailwind.config.ts`.

**`components/LandingPage.tsx` is the old page.** Still on disk, no longer
rendered. Delete it once the new page is complete.

## Open items

- **Blob opacity** in `globals.css` is `0.74` / `0.733`; §3.3 specifies `0.16`.
  Turned up during debugging — needs dialing back or a deliberate middle ground.
- **Phone mockups blocked** on redesigned-app screenshots (§4.1 asset #1).
- **Official store badges** still hand-drawn SVGs; swap before launch (§3.2).
- **`/pricing`, `/about`, `/contact`** don't exist. `/privacy` does and is
  required before store submission (§3.5).
- Next.js warns about **two lockfiles** — one here, one at `C:\Users\bubly\`.
  It infers the wrong workspace root. Harmless so far; worth removing the stray.
- Hero CTA row has `flex-wrap` but still needs the §3.4 mobile treatment
  (full-width primary, badges side by side).
