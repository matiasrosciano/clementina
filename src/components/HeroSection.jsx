import { raffleInfo } from '@/data/raffle'
import logo from '@/data/logo.webp'
import { Particles } from '@/components/ui/particles'
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text'
import { CalendarDays, Gift, Tv2, ChevronDown } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative min-h-[92dvh] flex flex-col overflow-hidden bg-white">
      {/* Background image */}
      {raffleInfo.images[0] && (
        <div className="absolute inset-0">
          <img
            src={raffleInfo.images[0]}
            alt=""
            className="h-full w-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/50 to-white" />
        </div>
      )}

      {/* Ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(251,191,36,0.18),transparent)]" />

      {/* Particles */}
      <Particles
        className="absolute inset-0 z-0"
        quantity={60}
        color="#d97706"
        size={0.5}
        staticity={60}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-5 pt-16 pb-8 text-center">
        {/* Logo */}
        <img
          src={logo}
          alt="Clementina"
          className="mb-6 h-auto w-full object-cover"
        />

        {/* Badge */}
        <div className="mb-5 inline-flex items-center rounded-full border border-amber-300 bg-amber-50 px-4 py-1.5">
          <AnimatedShinyText
            className="text-xs font-semibold uppercase tracking-widest text-amber-700"
            shimmerWidth={120}
          >
            ✦ Sorteo Oficial
          </AnimatedShinyText>
        </div>

        {/* Title */}
        <h1 className="mb-4 max-w-sm text-4xl font-black leading-[1.05] tracking-tight text-zinc-900 sm:max-w-lg sm:text-5xl">
          {raffleInfo.title}
        </h1>

        {/* Subtitle */}
        <p className="mb-3 max-w-xs text-base text-zinc-500 sm:max-w-sm">
          {raffleInfo.subtitle}
        </p>

        {/* Prize highlight */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-5 py-2.5">
          <Gift className="h-4 w-4 shrink-0 text-amber-600" />
          <span className="text-sm font-semibold text-amber-800">{raffleInfo.prize}</span>
        </div>

        {/* Info pills */}
        <div className="flex flex-wrap justify-center gap-2">
          <InfoPill icon={<CalendarDays className="h-3.5 w-3.5" />} text={raffleInfo.drawDate} />
          <InfoPill icon={<Tv2 className="h-3.5 w-3.5" />} text={raffleInfo.drawMethod} />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="relative z-10 flex justify-center pb-6">
        <button
          onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
          className="opacity-30 transition-opacity hover:opacity-70"
          aria-label="Ir hacia abajo"
        >
          <ChevronDown className="h-5 w-5 animate-bounce text-zinc-500" />
        </button>
      </div>
    </section>
  )
}

function InfoPill({ icon, text }) {
  return (
    <div className="flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1.5 text-xs text-zinc-500">
      <span className="text-zinc-400">{icon}</span>
      {text}
    </div>
  )
}
