import { raffleInfo } from '@/data/raffle'
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text'
import { ShieldCheck } from 'lucide-react'

export function PrizeSection() {
  return (
    <section className=" px-4 py-12">
      {/* Header */}
      <div className="mb-6 text-center">
        <div className="mb-3 inline-flex items-center rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5">
          <AnimatedShinyText
            className="text-xs font-semibold uppercase tracking-widest text-amber-400"
            shimmerWidth={110}
          >
            ✦ El Premio
          </AnimatedShinyText>
        </div>
        <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
          {raffleInfo.prize}
        </h2>
      </div>

      {/* Photo */}
      <div className="mx-auto max-w-lg overflow-hidden rounded-2xl shadow-2xl shadow-black/60">
        <img
          src="/images/camioneta.jpeg"
          alt={raffleInfo.prize}
          className="w-full object-cover"
        />
      </div>

      {/* Detail pills */}
      <div className="mx-auto mt-6 flex max-w-lg flex-wrap justify-center gap-2">
        {['Volkswagen Amarok', 'Highline', 'Sorteo en vivo'].map((detail) => (
          <div
            key={detail}
            className="flex items-center gap-1.5 rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-xs text-zinc-300"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-amber-500" />
            {detail}
          </div>
        ))}
      </div>
    </section>
  )
}
