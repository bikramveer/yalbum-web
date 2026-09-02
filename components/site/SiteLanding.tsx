import Nav from './Nav'
import Hero from './Hero'
import Divider from './Divider'
import Features from './Features'

/**
 * The marketing site — one long-scroll page, 7 sections (Guide §3.3).
 * Sections get added here as we build them, top to bottom.
 */
export default function SiteLanding() {
  return (
    <div className="min-h-screen bg-page font-sans text-ink-body">
      <Nav />
      <main>
        <Hero />
        <Divider />
        <Features />
        {/* Showcase        — §3.3 */}
        {/* How it works    — §3.3  id="how-it-works" */}
        {/* CTA banner      — §3.3  id="download" */}
      </main>
      {/* Footer          — §3.3 */}
    </div>
  )
}
