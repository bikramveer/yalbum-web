interface LogoProps {
  width?: number
  height?: number
  className?: string
  /**
   * `light` = for light backgrounds (nav, app screens).
   * `dark`  = for the footer: lighter strokes, and the inner circle is
   *           filled with the footer background instead of white so the
   *           "hole" in the aperture doesn't glow. (Guide §1.4)
   */
  variant?: 'light' | 'dark'
}

export default function Logo({
  width = 40,
  height = 40,
  className = '',
  variant = 'light',
}: LogoProps) {
  const stroke = variant === 'dark' ? '#4DA6FF' : '#2E86F0'
  const innerFill = variant === 'dark' ? '#0f1320' : '#ffffff'

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Yalbum"
    >
      {/* Lens ring */}
      <circle cx="13" cy="13" r="11" fill="none" stroke={stroke} strokeWidth="1.6" />

      {/* Crosshair */}
      <line x1="6.2" y1="6.2" x2="19.8" y2="19.8" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />
      <line x1="19.8" y1="6.2" x2="6.2" y2="19.8" stroke={stroke} strokeWidth="1.6" strokeLinecap="round" />

      {/* Center dot, punched out of the crosshair by an opaque backing circle */}
      <circle cx="13" cy="13" r="3.1" fill={innerFill} />
      <circle cx="13" cy="13" r="1.9" fill="#4DA6FF" />
    </svg>
  )
}
