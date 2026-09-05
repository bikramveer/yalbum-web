import Eyebrow from './Eyebrow'

/**
 * How it works — Guide §3.3
 *
 * Three numbered steps. The number is the map index + 1.
 *
 * STEP_ACCENTS carries a per-accent coloured shadow as an arbitrary value —
 * Tailwind can't build those from a token, and underscores stand in for the
 * spaces a class name can't contain.
 */

const EYEBROW = 'Up and running in a minute'

const HEADING = 'Three steps to your shared album'

const STEP_ACCENTS = {
  blue: {
    border: 'border-blue-tint',
    text: 'text-blue-icon',
    shadow: 'shadow-[0_10px_24px_rgba(46,134,240,0.14)]',
  },
  mint: {
    border: 'border-mint-tint',
    text: 'text-mint-icon',
    shadow: 'shadow-[0_10px_24px_rgba(14,163,113,0.14)]',
  },
  violet: {
    border: 'border-violet-tint',
    text: 'text-violet-icon',
    shadow: 'shadow-[0_10px_24px_rgba(124,58,237,0.14)]',
  },
} as const

const STEPS: { accent: keyof typeof STEP_ACCENTS; title: string; body: string }[] = [
  {
    accent: 'blue',
    title: 'Create an album',
    body: 'Name it, pick a color or cover photo, and it’s yours in seconds.',
  },
  {
    accent: 'mint',
    title: 'Invite your people',
    body: 'Send the invite code. They tap it in and they’re part of the album.',
  },
  {
    accent: 'violet',
    title: 'Share the memories',
    body: 'Upload, comment, and relive it together — anytime, anywhere.',
  },
]

export default function Steps() {
  return (
    <section id="how-it-works" className='bg-[image:var(--steps-bg)] py-14 px-5 md:px-10 md:py-[70px] lg:px-14 lg:py-24 scroll-mt-24 text-center'>
      <div className='mx-auto max-w-content space-y-5'>
        <Eyebrow className='text-brand'>{EYEBROW}</Eyebrow>
        <h2 className='font-display font-bold text-h2-mobile lg:text-h2 text-ink-web'>{HEADING}</h2>
      </div>
      <div className='mx-auto max-w-[1000px] grid gap-6 md:grid-cols-3 text-center mt-10'>
        {STEPS.map((step, i) => {
          const accent = STEP_ACCENTS[step.accent]
          return (
            <div key={step.title} className='space-y-5'>
              <div className={`${accent.border} ${accent.shadow} w-16 h-16 bg-white border rounded-full grid place-items-center mx-auto`}>
                <span className={`font-display text-[26px] font-bold ${accent.text}`}>{i + 1}</span>
              </div>
              <h3 className='font-display text-card-title font-bold text-ink-web'>{step.title}</h3>
              <p className='text-ink-body'>{step.body}</p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
