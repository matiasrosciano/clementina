import { raffleInfo } from '@/data/raffle'
import { CalendarDays, Gift, Tv2 } from 'lucide-react'

export function HeroSection() {
  return (
    <section className="relative">
      {/* Hero image */}
      <div className="relative h-72 w-full overflow-hidden bg-zinc-900 sm:h-96">
        {raffleInfo.images[0] ? (
          <img
            src={raffleInfo.images[0]}
            alt="Sorteo Clementina"
            className="h-full w-full object-cover opacity-60"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-zinc-800 to-zinc-600" />
        )}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 text-center text-white">
          <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-widest backdrop-blur-sm">
            Sorteo oficial
          </span>
          <h1 className="text-3xl font-bold leading-tight sm:text-4xl">{raffleInfo.title}</h1>
          <p className="text-sm text-white/80 sm:text-base">{raffleInfo.subtitle}</p>
        </div>
      </div>

      {/* Info cards */}
      <div className="mx-auto max-w-lg space-y-4 px-4 py-6">
        <p className="text-center text-sm text-zinc-600">{raffleInfo.description}</p>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <InfoCard icon={<Gift className="h-5 w-5" />} label="Premio" value={raffleInfo.prize} />
          <InfoCard
            icon={<CalendarDays className="h-5 w-5" />}
            label="Fecha del sorteo"
            value={raffleInfo.drawDate}
          />
          <InfoCard
            icon={<Tv2 className="h-5 w-5" />}
            label="Modalidad"
            value={raffleInfo.drawMethod}
          />
        </div>
      </div>
    </section>
  )
}

function InfoCard({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-zinc-100 bg-zinc-50 p-3">
      <span className="mt-0.5 shrink-0 text-zinc-500">{icon}</span>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-zinc-400">{label}</p>
        <p className="text-sm font-semibold text-zinc-800">{value}</p>
      </div>
    </div>
  )
}
