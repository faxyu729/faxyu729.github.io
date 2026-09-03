import FrameSequence from './FrameSequence.jsx'

export default function WorkFramePreview({ work }) {
  return (
    <div className="relative rounded-3xl border border-white/20 bg-white/10 p-3 shadow-inner shadow-black/20 backdrop-blur">
      <FrameSequence
        frames={work.frames ?? [work.image]}
        alt={work.imageAlt}
        interval={900}
        className="ring-1 ring-white/20"
      />
    </div>
  )
}
