import { Image as ImageIcon, Users, MessageCircle, type LucideIcon } from 'lucide-react'

/**
 * Features — Guide §3.3
 *
 * Three cards, one per pastel accent. `scroll-mt-24` keeps the heading clear
 * of the floating nav when the anchor is jumped to (§3.5).
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
    gradient: 'linear-gradient(160deg, #f4f9ff, #ffffff)',
    border: 'border-blue-tint',
    chip: 'bg-blue-tint text-blue-icon',
  },
  mint: {
    gradient: 'linear-gradient(160deg, #f3fdf9, #ffffff)',
    border: 'border-mint-tint',
    chip: 'bg-mint-tint text-mint-icon',
  },
  violet: {
    gradient: 'linear-gradient(160deg, #faf7ff, #ffffff)',
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
    <section id="features" className='bg-white py-24 scroll-mt-24'>
      {/* TODO */}
      <div className='mx-auto max-w-content px-14'>
        
        <div>
          <h2 className='font-display text-h2 text-center font-bold text-ink-web'>
            {HEADING}
          </h2>
          <p className='max-w-[560px] mx-auto text-ink-body text-center py-6 mb-8'>
            {SUBHEAD}
          </p>
        </div>

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {FEATURES.map((feature) => {
            const Icon = feature.icon
            const accent = ACCENTS[feature.accent]
            return (
              <article key={feature.title} style={{ background: accent.gradient }} className={`rounded-card border p-8 ${accent.border} transition hover:-translate-y-1`}>
               <div className={`grid h-14 w-14 place-items-center rounded-2xl ${accent.chip}`}>
                 <Icon className='h-6 w-6' />
                </div>
                <h3 className='mt-6 font-display font-bold text-ink-web text-card-title'>
                {feature.title}
                </h3>
                <p className='mt-3 text-ink-body'>
                {feature.body}
                </p>
              </article>
            )
          })}
        </div>
      </div>

    </section>
  )
}
