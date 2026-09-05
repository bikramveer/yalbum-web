'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import Logo from '@/components/Logo'
import StoreBadge from './StoreBadge'

/**
 * MobileNav — Guide §3.4
 *
 * The hamburger and its full-screen overlay. Rendered only below `lg`;
 * the desktop link row in Nav.tsx handles everything above that.
 *
 * Scroll lock, Escape-to-close and the focus trap all live in the effects
 * below; each comment says what breaks without it.
 *
 * ⚠ Don't put a `backdrop-filter` on the <header> that renders this. An
 * element with backdrop-filter becomes the containing block for `fixed`
 * descendants, which would shrink this overlay to the nav bar's height.
 */

interface MobileNavProps {
  links: { label: string; href: string }[]
}

export default function MobileNav({ links }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  // Refs let us reach real DOM nodes. `panelRef` scopes the focus trap to the
  // overlay; `triggerRef` remembers the hamburger so focus can return to it.
  const panelRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  // --- Scroll lock -------------------------------------------------------
  // Without this the page scrolls behind the overlay, which feels broken on
  // touch. The cleanup function restores the previous value, so we don't
  // clobber anything another component set.
  useEffect(() => {
    if (!isOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [isOpen])

  // --- Escape to close, and Tab cycling inside the panel -----------------
  // A focus trap keeps Tab from wandering into the page behind the overlay.
  // Without it a keyboard user tabs into links they can't see.
  useEffect(() => {
    if (!isOpen) return

    // The `[tabindex="-1"]` exclusions matter: the backdrop is a <button>, and
    // without them it would be treated as the first focusable thing in the
    // panel — focus would land on an invisible element on open.
    const FOCUSABLE =
      'a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])'
    const getFocusable = () =>
      Array.from(panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? [])

    // Move focus into the overlay when it opens.
    getFocusable()[0]?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
        return
      }
      if (event.key !== 'Tab') return

      const items = getFocusable()
      if (items.length === 0) return

      const first = items[0]
      const last = items[items.length - 1]

      // Wrap around at either end instead of escaping the overlay.
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  // --- Return focus to the hamburger on close ----------------------------
  // Otherwise focus falls back to <body> and the next Tab starts from the top
  // of the page, which is disorienting.
  useEffect(() => {
    if (!isOpen) triggerRef.current?.focus()
  }, [isOpen])

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Open menu"
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        className="grid h-11 w-11 place-items-center rounded-xl text-ink-web"
      >
        <Menu className="h-6 w-6" />
      </button>

      {isOpen && (
        <div
          ref={panelRef}
          id="mobile-menu"
          className="fixed inset-0 z-[60] animate-fadeIn bg-white flex flex-col"
        >
          {/* Backdrop — catches taps on empty space. The content wrapper below
              is pointer-events-none so those taps reach it; each interactive
              region opts back in with pointer-events-auto. */}
          <button
            type='button'
            tabIndex={-1}
            aria-hidden='true'
            onClick={() => setIsOpen(false)}
            className='absolute inset-0 cursor-default'
          />
          
          <div className='pointer-events-none relative flex flex-1 flex-col'>
            <div className='pointer-events-auto flex items-center justify-between px-5 py-4'>
              <Link href='/' className='flex items-center gap-3' onClick={() => setIsOpen(false)}>
                <Logo width={26} height={26} />
                <span className='font-display text-2xl font-bold text-ink-web'>YALBUM</span>
              </Link>
              <button
                type='button'
                onClick={() => setIsOpen(false)}
                aria-label='Close Menu'
                className='grid h-11 w-11 place-items-center rounded-xl text-ink-web'
              >
                <X className='h-6 w-6' />
              </button>
            </div>

            <div className='flex flex-1 flex-col pb-6 pl-6'>
              {links.map((link) => (
                <Link key={link.href} href={link.href} className='pointer-events-auto font-display text-[26px] font-bold text-ink-web border-b border-[color:var(--hairline)] py-4' onClick={() => setIsOpen(false)}>
                  {link.label}
                </Link>
              ))}
            </div>

            <div className='pointer-events-auto space-y-3 px-5 pb-8'>
              <Link href='/login'
                className='bg-[image:var(--brand-gradient)] h-11 inline-flex w-full justify-center items-center px-6 shadow-btn text-white rounded-full font-bold'
              >
                Login / Sign Up
              </Link>
              <div className='flex flex-wrap items-center justify-center gap-3 pt-6'>
                <StoreBadge store='apple' />
                <StoreBadge store='google' />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
