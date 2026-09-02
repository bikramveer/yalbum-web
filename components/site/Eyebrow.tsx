/**
 * Eyebrow — Guide §3.2
 *
 * The small uppercase kicker above a section heading. 13px, 1.5px letter
 * spacing, weight 700, Jakarta. Used in the divider strip, Showcase, and
 * How it works.
 *
 * `className` is how the caller sets the colour, so this stays unopinionated.
 */
interface EyebrowProps {
  children: React.ReactNode
  className?: string
}

export default function Eyebrow({ children, className = 'text-ink-muted' }: EyebrowProps) {
  return (
    <p className={`text-eyebrow font-bold uppercase ${className}`}>{children}</p>
  )
}
