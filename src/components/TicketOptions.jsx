import { ticketPacks } from '@/data/raffle'
import { Ticket } from 'lucide-react'

function formatPrice(n) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n)
}

export function TicketOptions({ onSelect }) {
  return (
    <section className="mx-auto max-w-lg px-4 pb-10">
      <h2 className="mb-1 text-center text-xl font-bold text-zinc-900">Elegí tu pack de boletos</h2>
      <p className="mb-5 text-center text-sm text-zinc-500">Cuantos más boletos, más chances de ganar</p>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {ticketPacks.map((pack) => (
          <TicketCard key={pack.id} pack={pack} onSelect={onSelect} />
        ))}
      </div>
    </section>
  )
}

function TicketCard({ pack, onSelect }) {
  const pricePerTicket = Math.round(pack.precio / pack.cantidad)
  const isPopular = pack.cantidad === 3

  return (
    <button
      onClick={() => onSelect(pack)}
      className={`relative w-full rounded-2xl border-2 p-5 text-left transition-all active:scale-[0.98] ${
        isPopular
          ? 'border-zinc-900 bg-zinc-900 text-white shadow-lg'
          : 'border-zinc-200 bg-white text-zinc-900 hover:border-zinc-400 hover:shadow-md'
      }`}
    >
      {isPopular && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 px-3 py-0.5 text-xs font-bold text-zinc-900">
          MÁS POPULAR
        </span>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Ticket className={`h-6 w-6 ${isPopular ? 'text-amber-400' : 'text-zinc-400'}`} />
          <span className="text-2xl font-extrabold">
            {pack.cantidad} {pack.cantidad === 1 ? 'boleto' : 'boletos'}
          </span>
        </div>
      </div>

      <div className="mt-3">
        <p className="text-3xl font-black">{formatPrice(pack.precio)}</p>
        <p className={`mt-0.5 text-xs ${isPopular ? 'text-zinc-300' : 'text-zinc-400'}`}>
          {formatPrice(pricePerTicket)} por boleto
        </p>
      </div>

      <div
        className={`mt-4 flex items-center justify-center rounded-xl py-2 text-sm font-semibold ${
          isPopular ? 'bg-white/20 text-white' : 'bg-zinc-900 text-white'
        }`}
      >
        Comprar
      </div>
    </button>
  )
}
