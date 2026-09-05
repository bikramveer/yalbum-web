'use client'

import Link from 'next/link'
import Logo from '@/components/Logo'
import MobileNav from './MobileNav'

export const NAV_LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'How it works', href: '#how-it-works' },
  // { label: 'Pricing', href: '#features' },
]

export default function Nav() {
  return (
    // outer wrapper
    <header className='sticky top-0 z-50 bg-white/[0.86] lg:absolute lg:inset-x-0 lg:bg-transparent'>
      {/* inner wrapper */}
      <div className='mx-auto flex max-w-content items-center justify-between px-5 py-4 md:px-10 lg:px-14 lg:py-[26px]'>

        {/* Logo and title that snap back to top */}
        <Link href='/' className='flex items-center gap-3 transition hover:scale-105'>
          <Logo width={28} height={28} />
          <span className='font-display text-2xl lg:text-[32px] font-bold text-ink-web'>YALBUM</span>
        </Link>

        {/* Desktop links + CTA, and the hamburger that replaces them below lg.
            Grouped so the parent's justify-between sees exactly two children. */}
        <div className='flex items-center gap-8'>
          <nav className='hidden lg:flex items-center gap-8'>
            {NAV_LINKS.map((link) => (
              <Link key={link.href} href={link.href} className='text-ink-nav font-semibold hover:text-brand transition-colors'>
                {link.label}
              </Link>
            ))}
          </nav>
          
          <Link href='/login'
            className='bg-[image:var(--brand-gradient)] h-11 hidden lg:inline-flex items-center px-6 shadow-btn text-white rounded-full transition font-bold hover:brightness-105'
          >
            Login / Sign Up
          </Link>
          

          <MobileNav links={NAV_LINKS}/>
        </div>
      
      </div>
    </header>
  )
}
