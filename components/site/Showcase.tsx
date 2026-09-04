import { Check } from 'lucide-react'
import Eyebrow from './Eyebrow'
import PhoneMockup from './PhoneMockup'

/**
 * Showcase — Guide §3.3
 *
 * A rounded panel sitting on the page, rather than a full-bleed section:
 * the <section>'s padding is the margin around the panel, and the panel's
 * own padding insets its contents.
 *
 * The mockup's `fadeTo` is the panel's peach corner, not white — the mobile
 * crop fade has to match whatever is behind it or it reads as a bug (§3.2).
 */

const EYEBROW = 'See it in action'

const HEADING = 'Open a photo, and the conversation comes with it.'

const BODY =
  'Tap into any memory to see it full-screen. Swipe up and the comments rise into view — reactions, inside jokes, and all the “I remember this!” from the people who were there.'

const CHECK_ACCENTS = {
  blue: 'bg-blue-tint text-blue-icon',
  mint: 'bg-mint-tint text-mint-icon',
  violet: 'bg-violet-tint text-violet-icon',
} as const

const CHECKS: { accent: keyof typeof CHECK_ACCENTS; text: string }[] = [
  { accent: 'blue', text: 'Comments hidden until you want them' },
  { accent: 'mint', text: 'Download or save any shot in a tap' },
  { accent: 'violet', text: 'Your photos, your controls' },
]

export default function Showcase() {
  return (
    <section className='py-24 px-14'>
      <div className='mx-auto max-w-content rounded-panel bg-[image:var(--showcase-bg)] px-12 py-16'>
        <div className='grid gap-12 lg:grid-cols-2'>
          <div className='px-12 space-y-5 my-auto'>
            <Eyebrow className='text-brand'>{EYEBROW}</Eyebrow>
            <h2 className='font-display text-showcase-h2 font-bold text-ink-web'>{HEADING}</h2>
            <p className='text-ink-body'>{BODY}</p>
            <ul className='space-y-3'>
              {CHECKS.map((check) => {
                const accent = CHECK_ACCENTS[check.accent]
                return (
                  <li key={check.accent} className='flex items-center gap-3'>
                    <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg ${accent}`}>
                      <Check className='h-4 w-4' />
                    </span>
                    <span className='text-ink-body font-semibold'>{check.text}</span>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className='lg:justify-self-center'>
            <PhoneMockup screen='album-view' scale={0.36} fadeTo='#fdf3f0' />
          </div>
        </div>
      </div>
    </section>
  )
}
