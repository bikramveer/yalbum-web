import Link from 'next/link'
import Logo from '@/components/Logo'

/**
 * Footer — Guide §3.3
 *
 * ⚠ <Logo variant='dark' /> is required here — the light variant fills the
 * aperture's centre with white, which glows on the dark background (§1.4).
 */

const TAGLINE =
  'A private, invitation-only home for the memories you make together.'

const COPYRIGHT = '© 2026 Yalbum. Made for the people who were there.'

/**
 * §3.5 on destinations:
 *   - Features / Download are on-page anchors.
 *   - /pricing, /about, /contact don't exist yet. /privacy DOES, and is
 *     required before store submission.
 * Decide per link whether to ship a placeholder page or drop the link —
 * a footer link to a 404 is worse than no link.
 */
const LINK_COLUMNS = [
  {
    heading: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Download', href: '#download' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'Privacy', href: '/privacy' },
      { label: 'Support', href: '/support' },
    ],
  },
]

export default function Footer() {
  return (
    <footer className='bg-footer-bg px-5 py-10 md:px-10 md:py-12 lg:px-14 lg:py-14'>
      <div className='mx-auto max-w-content'>
        <div className='flex flex-col gap-10 md:flex-row md:justify-between'>
          <div className='flex gap-3 flex-col'>
            <span className='flex gap-3 items-center'>
              <Logo variant='dark' width={32} height={32} />
              <p className='font-display text-white font-bold text-2xl'>YALBUM</p>
            </span>
            <p className='text-footer-muted max-w-xs'>{TAGLINE}</p>
          </div>
          <div className='flex gap-16'>
            {LINK_COLUMNS.map((column) => (
              <div key={column.heading}>
                <p className='mb-4 font-semibold text-white'>{column.heading}</p>

                <ul className='space-y-3'>
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className='text-footer-text transition-colors hover:text-white'>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className='mt-10 pt-8 border-t border-white/[0.08]'>
          <p className='text-footer-muted text-sm'>{COPYRIGHT}</p>
        </div>
      </div>
    </footer>
  )
}
