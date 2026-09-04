import Nav from './Nav'
import Hero from './Hero'
import Divider from './Divider'
import Features from './Features'
import Showcase from './Showcase'
import Steps from './Steps'
import CtaBanner from './CtaBanner'
import Footer from './Footer'

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
        <Showcase />
        <Steps />
        <CtaBanner />
      </main>
      <Footer />
    </div>
  )
}
