import Eyebrow from './Eyebrow'

const DIVIDER_COPY = 'A calmer way to keep memories, together'

export default function Divider() {
  return (
    <div className='text-center mx-auto max-w-content py-12 px-14 border-t border-[color:var(--hairline)] '>
      <Eyebrow className='text-ink-muted'>{DIVIDER_COPY}</Eyebrow>
    </div>
  )
}
