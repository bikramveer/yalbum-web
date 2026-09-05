import Link from 'next/link'
import PhoneMockup from './PhoneMockup'
import StoreBadge from './StoreBadge'

const BADGE_COPY = 'Private by invite · no algorithms, no ads'

const HEADLINE = (
  <>
    The photos that matter, shared with the people who{' '}
    <span className='text-brand'>were there.</span>
  </>
)

const BODY =
  'Yalbum is a cozy, invite-only home for your group’s memories. Create an album, drop a code to your people, and relive the moments together.'

const CTA_LABEL = 'Start your first album →'

const PROOF = 'Join the community that listens to your suggestions'

// Pastel album themes used as decoration only
const AVATARS = [
  'linear-gradient(135deg, #FFE3DE, #FFC4BA)',
  'linear-gradient(135deg, #DCEEFF, #B4D9FF)',
  'linear-gradient(135deg, #D6F7EC, #A6ECD3)',
  'linear-gradient(135deg, #EEE3FF, #D3BCFF)',
]

export default function Hero() {
  return (
    <section className='relative overflow-hidden bg-[image:var(--hero-bg)] pt-24 px-5 pb-14 md:px-10 md:pt-[120px] md:pb-[70px] lg:px-14 lg:pt-[150px] lg:pb-[90px]'>
      {/* Decorative blobs — outside the content wrapper so they bleed past
          the 1280px edge. The wrapper below is `relative` so text paints
          above them. */}
      <div
        aria-hidden="true"
        className='pointer-events-none absolute -left-32 top-32 h-[340px] w-[340px] rounded-full bg-[image:var(--blob-mint)] blur-3xl'
      />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-0 h-[300px] w-[300px] rounded-full bg-[image:var(--blob-violet)] blur-3xl" />

      <div className='mx-auto max-w-content lg:grid lg:grid-cols-2 lg:gap-10 relative'>
        <div className='space-y-6'>
          <div className='items-center inline-flex bg-white border border-brand/20 px-5 py-1 rounded-pill gap-2 text-brand font-semibold'>
            <span className="h-2 w-2 rounded-full bg-mint-icon " aria-hidden="true" />{BADGE_COPY}
          </div>
          
          <h1 className='font-display text-hero-mobile md:text-[48px] lg:text-hero font-bold text-ink-web'>
            {HEADLINE}
          </h1>

          <p className='text-[17px] leading-relaxed lg:text-hero-body text-ink-body max-w-[480px]'>
            {BODY}
          </p>

          <div className='flex flex-wrap gap-3'>
            <Link 
              href='/login'
              target='_blank'
              className='bg-[image:var(--brand-gradient)] inline-flex items-center h-[56px] px-5 text-white rounded-badge shadow-btn transition font-bold hover:brightness-105'
            >
              {CTA_LABEL}
            </Link>
            <StoreBadge store='apple' />
            <StoreBadge store='google' />
          </div>

          <div className='flex items-center'>
            {AVATARS.map((gradient, i) => (
              <span
                key={gradient}
                style={{background: gradient}}
                className={`h-10 w-10 rounded-full ring-[2.5px] ring-white ${i>0 ? '-ml-[11px]' : ''}`}
              />
            ))}
            <div className='pl-[8px]'>
            {PROOF}
            </div>
          </div>
        </div>

        <div className='mt-24 lg:justify-self-center'>
          <PhoneMockup screen='albums-home' scale={0.6} float='floaty' fadeTo='#ffffff' />
        </div>

      </div>
    </section>
  )
}
