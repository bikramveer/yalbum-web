import StoreBadge from './StoreBadge'

/**
 * CTA banner — Guide §3.3
 *
 * The panel's `overflow-hidden` clips the two decorative circles to its
 * rounded corners, so they read as inside the panel rather than floating
 * on the page. They're anchored to the edges they bleed off, never to a
 * fixed offset from the opposite side — the panel width changes.
 *
 * Store badges are the LIGHT variant here because they sit on blue (§3.2).
 */

const HEADING = 'Your memories deserve a better home.'

const BODY =
  'Start free today. Create your first album and invite the people who were there.'

export default function CtaBanner() {
  return (
    <section id="download" className='py-14 px-5 md:px-10 md:py-[70px] lg:px-14 lg:py-24 scroll-mt-24'>
      <div className='mx-auto max-w-content rounded-panel shadow-cta bg-[image:var(--brand-gradient)] px-12 py-16 relative overflow-hidden'>

        <div aria-hidden='true' className='pointer-events-none absolute -bottom-28 left-40 h-[270px] w-[270px] bg-white/[0.12] rounded-[90px]' />
        <div aria-hidden='true' className='pointer-events-none absolute -top-24 -right-8 h-[270px] w-[270px] bg-white/[0.08] rounded-[90px]' />
        
        <div className='relative space-y-5 max-w-[580px]'>
          <h2 className='font-display text-h2-mobile lg:text-cta-h2 font-bold text-white'>{HEADING}</h2>
          <p className='text-white/90 max-w-[520px]'>{BODY}</p>
          <div className='flex flex-wrap gap-3'>
            <StoreBadge store="apple" theme="light" />
            <StoreBadge store="google" theme="light" />
          </div>
        </div>
      </div>
    </section>
  )
}
