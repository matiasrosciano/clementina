import { ticketPacks } from '@/data/raffle'
import { MagicCard } from '@/components/ui/magic-card'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { Ticket } from 'lucide-react'

function formatPrice(n) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(n)
}

const POPULAR_ID = 3

export function TicketOptions({ onSelect }) {
  return (
    <section className="bg-zinc-50 px-4 py-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-amber-600">
          Participá ahora
        </p>
        <h2 className="text-2xl font-extrabold text-zinc-900 sm:text-3xl">
          Elegí tu pack de boletos
        </h2>
        <p className="mt-1.5 text-sm text-zinc-400">Cuantos más boletos, más chances de ganar</p>
      </div>

      {/* Grid */}
      <div className="mx-auto grid max-w-lg grid-cols-1 gap-3">
        {ticketPacks.map((pack) => (
          <TicketCard key={pack.id} pack={pack} onSelect={onSelect} />
        ))}
      </div>
    </section>
  )
}

function TicketCard({ pack, onSelect }) {
  const isPopular = pack.id === POPULAR_ID
  const pricePerTicket = Math.round(pack.precio / pack.cantidad)

  return (
    <div className="relative rounded-2xl">
      {/* Popular badge */}
      {isPopular && (
        <div className="absolute -top-3 left-1/2 z-50 -translate-x-1/2">
          <span className="rounded-full bg-amber-500 px-4 py-1 text-xs font-bold text-white shadow-md shadow-amber-200">
            ⭐ MÁS POPULAR
          </span>
        </div>
      )}

      <MagicCard
        className="rounded-2xl border border-zinc-200 bg-white shadow-sm"
        gradientColor={isPopular ? '#fef3c7' : '#f4f4f5'}
        gradientFrom={isPopular ? '#f59e0b' : '#a1a1aa'}
        gradientTo={isPopular ? '#d97706' : '#71717a'}
        gradientSize={180}
        gradientOpacity={0.12}
      >
        <div className={`p-4 ${isPopular ? 'sm:p-5' : ''}`}>
          {/* Icon + quantity */}
          <div className="mb-3 flex items-center gap-2">
            <div className={`rounded-lg p-1.5 ${isPopular ? 'bg-amber-100' : 'bg-zinc-100'}`}>
              <Ticket className={`h-4 w-4 ${isPopular ? 'text-amber-600' : 'text-zinc-500'}`} />
            </div>
            <span className={`text-xs font-medium ${isPopular ? 'text-amber-600' : 'text-zinc-400'}`}>
              {pack.cantidad} {pack.cantidad === 1 ? 'boleto' : 'boletos'}
            </span>
          </div>

          {/* Price */}
          <div className="mb-4">
            <p className={`text-2xl font-black leading-none ${isPopular ? 'text-amber-600 sm:text-3xl' : 'text-zinc-900'}`}>
              {formatPrice(pack.precio)}
            </p>
            <p className="mt-1 text-xs text-zinc-400">
              {formatPrice(pricePerTicket)} c/u
            </p>
          </div>

          {/* CTA */}
          <ShimmerButton
            onClick={() => onSelect(pack)}
            className="w-full text-sm font-semibold"
            shimmerColor={isPopular ? '#fbbf24' : '#ffffff'}
            background={isPopular ? 'rgba(180, 83, 9, 1)' : 'rgba(24, 24, 27, 1)'}
            borderRadius="12px"
            shimmerDuration="2.5s"
          >
            Comprar
          </ShimmerButton>
        </div>
      </MagicCard>
    </div>
  )
}
