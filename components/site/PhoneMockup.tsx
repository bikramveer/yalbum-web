/**
 * PhoneMockup — Guide §3.2
 *
 * ⚠ BLOCKED ON ASSETS. §4.1 asset #1 is 2x/3x exports of the *redesigned*
 * app (Albums home for the hero, Album view for the showcase). The old
 * screenshots in /public/screenshots are the pre-redesign UI, so shipping
 * them would advertise a product that no longer exists.
 *
 * Until then this renders a device frame with a labelled placeholder.
 * To swap in the real thing later, replace the placeholder <div> with:
 *     <img src={...} alt="" className="h-full w-full object-cover" />
 * Nothing else needs to change.
 *
 * `fadeTo` handles the mobile crop treatment: the phone sits in a fixed
 * height overflow-hidden box, and a gradient tinted to the section's own
 * background fades the bottom out. Without it the device gets chopped by
 * a hard line and reads as a rendering bug.
 */

/**
 * Reference frame the `scale` prop multiplies. The guide's "~0.6 scale"
 * is 0.6 of the *design* artboard, not of a CSS-pixel phone — 650 × 0.6
 * lands on 390px, a real iPhone width. Getting this base wrong is what
 * makes the mockup come out doll-sized.
 */
const FRAME_WIDTH = 650
const FRAME_HEIGHT = 1406

interface PhoneMockupProps {
  screen: 'albums-home' | 'album-view'
  /** Multiplier on the 650×1406 design frame. §3.3 uses 0.6 / 0.56. */
  scale?: number
  /**
   * Scale below `md`. §3.4 uses ~0.5 (hero) and ~0.48 (showcase).
   *
   * Props can't be made responsive — there's no `md:scale={0.6}` — so this
   * is applied as a CSS transform through a custom property, which media
   * queries *can* switch off. Hence `scale-[var(--phone-scale)] md:scale-100`.
   */
  mobileScale?: number
  /**
   * Height the frame is cropped to below `md`, in px (§3.2). The phone is
   * taller than a phone screen, so it gets trimmed and faded rather than
   * shrunk to fit.
   */
  cropHeight?: number
  /** Idle float, desktop only (§1.6). */
  float?: 'floaty' | 'floaty2' | false
  /** CSS colour the mobile crop fades into. Must match the section bg. */
  fadeTo?: string
  className?: string
}

const LABELS: Record<PhoneMockupProps['screen'], string> = {
  'albums-home': 'Albums home',
  'album-view': 'Album view',
}

export default function PhoneMockup({
  screen,
  scale = 0.6,
  mobileScale,
  cropHeight,
  float = false,
  fadeTo,
  className = '',
}: PhoneMockupProps) {
  const width = FRAME_WIDTH * scale
  const height = FRAME_HEIGHT * scale

  // Float is desktop-only, so the animation class is gated behind `lg:`.
  const floatClass =
    float === 'floaty' ? 'lg:animate-floaty' : float === 'floaty2' ? 'lg:animate-floaty2' : ''

  // Ratio, not an absolute size — the frame renders at desktop dimensions and
  // is scaled down below `md`. `origin-top` keeps it anchored under the text
  // instead of shrinking toward its own centre.
  const scaleClass = mobileScale
    ? 'origin-top scale-[var(--phone-scale)] md:scale-100'
    : ''

  const cropClass = cropHeight
    ? 'max-h-[var(--phone-crop)] overflow-hidden md:max-h-none md:overflow-visible'
    : ''

  return (
    <div
      className={`relative ${cropClass} ${className}`}
      style={
        {
          '--phone-scale': mobileScale ? String(mobileScale / scale) : undefined,
          '--phone-crop': cropHeight ? `${cropHeight}px` : undefined,
        } as React.CSSProperties
      }
    >
      <div
        style={{ width, height }}
        className={`relative overflow-hidden rounded-[44px] border-[10px] border-ink-web bg-surface-alt drop-shadow-phone ${scaleClass} ${floatClass}`}
      >
        {/* Dynamic island — what makes the frame read as a phone */}
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-3 z-10 h-7 w-28 -translate-x-1/2 rounded-full bg-ink-web"
        />

        {/* Placeholder — replace with the real screenshot (§4.1) */}
        <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[image:var(--brand-gradient)] p-6 text-center">
          <span className="font-display text-lg font-bold text-white">{LABELS[screen]}</span>
          <span className="text-xs text-white/80">Screenshot pending app release</span>
        </div>
      </div>

      {/* Mobile crop fade (§3.2) — only rendered when a tint is supplied */}
      {fadeTo && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 md:hidden"
          style={{ background: `linear-gradient(to bottom, transparent, ${fadeTo})` }}
        />
      )}
    </div>
  )
}
