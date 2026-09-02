import { Image as ImageIcon, Users, MessageCircle, type LucideIcon } from 'lucide-react'

/**
 * Features — Guide §3.3
 *
 * YOUR TURN.
 *
 * Section shell:
 *   - id="features"  (§3.5 — the nav links here)
 *   - white background, ~90-100px vertical padding, 56px sides
 *   - scroll-mt-24 so the floating nav doesn't cover the heading when
 *     you jump to the anchor
 *   - inner wrapper: mx-auto max-w-content
 *
 * Header block, centred:
 *   - <h2> HEADING — font-display text-h2 font-bold text-ink-web
 *   - <p>  SUBHEAD — text-ink-body, max-w-[560px], mx-auto
 *
 * Card grid:
 *   - 3 columns from `lg`, 2 from `md`, 1 below. gap-[22px].
 *   - Map over FEATURES. Each card:
 *       · background: the accent's `gradient`, via a style prop
 *       · border: 1px, the accent's `border` class
 *       · rounded-card, p-8
 *       · icon chip: 54px square, rounded-2xl, grid place-items-center,
 *         using the accent's `chip` classes, icon at h-6 w-6
 *       · title: font-display text-card-title font-bold text-ink-web
 *       · body:  text-ink-body
 *       · hover lift: transition hover:-translate-y-1  (§1.6)
 */

const HEADING = 'Everything a shared album should be'

const SUBHEAD =
  'No feeds to scroll, no strangers, no noise. Just your people and the moments you made together.'

/**
 * Accent lookup — read the note in the message about WHY this is a map of
 * complete class strings rather than something like `bg-${accent}-tint`.
 *
 * The card background is a per-accent gradient, so it goes through a style
 * prop (same as the hero avatars). Fixed class names stay as classes.
 */
const ACCENTS = {
  blue: {
    gradient: 'linear-gradient(160deg, #DCEEFF, #ffffff)',
    border: 'border-blue-tint',
    chip: 'bg-blue-tint text-blue-icon',
  },
  mint: {
    gradient: 'linear-gradient(160deg, #D6F7EC, #ffffff)',
    border: 'border-mint-tint',
    chip: 'bg-mint-tint text-mint-icon',
  },
  violet: {
    gradient: 'linear-gradient(160deg, #EEE3FF, #ffffff)',
    border: 'border-violet-tint',
    chip: 'bg-violet-tint text-violet-icon',
  },
} as const

interface Feature {
  icon: LucideIcon
  accent: keyof typeof ACCENTS
  title: string
  body: string
}

const FEATURES: Feature[] = [
  {
    icon: ImageIcon,
    accent: 'blue',
    title: 'Albums with a soul',
    body: 'Give each album its own color or cover photo. Whistler, Sunday dinners, the group chat crew — each one instantly recognizable.',
  },
  {
    icon: Users,
    accent: 'mint',
    title: 'Invite-only, always',
    body: 'Share a six-character code and your people are in. No public profiles, no follower counts, no strangers wandering by.',
  },
  {
    icon: MessageCircle,
    accent: 'violet',
    title: 'Talk about the moment',
    body: 'Comments live right under each photo — swipe up to relive the inside jokes and the “remember when” all over again.',
  },
]

export default function Features() {
  return (
    <section id="features" className='px-14 bg-white py-3 scroll-mt-24 pb-16'>
      {/* TODO */}
      <div className='mx-auto max-w-content px-14'>
        
        <div>
          <h2 className='font-display text-showcase-h2 text-center font-bold text-ink-web'>
            {HEADING}
          </h2>
          <p className='max-w-[560px] mx-auto text-ink-body text-center py-6'>
            {SUBHEAD}
          </p>
        </div>

        <div className='flex mx-auto max-w-content gap-5 space-evenly'>
          {FEATURES.map((feature) => {
            const Icon = feature.icon
            const accent = ACCENTS[feature.accent]
            return (
              <article key={feature.title} style={{ background: accent.gradient }} className='rounded-xl p-12 border border-[accent]/40'>
               <div className=''>
                 <Icon className='h-6 w-6' />
                 <h3 className='font-display font-bold text-ink-web text-showcase'>
                  {feature.title}
                 </h3>
                 <p>
                  {feature.body}
                 </p>
               </div>
              </article>
            )
          })}
        </div>
      </div>

    </section>
  )
}
