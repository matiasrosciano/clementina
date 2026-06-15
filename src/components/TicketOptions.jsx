import { useState, useEffect } from 'react'
import { ticketPacks, raffleInfo } from '@/data/raffle'
import { MagicCard } from '@/components/ui/magic-card'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { Ticket, Check } from 'lucide-react'

function formatPrice(n) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(n)
}

const POPULAR_ID = 3
const CLOSE_DATE = new Date('2026-06-29T23:55:00')

function useCountdown(target) {
  const [timeLeft, setTimeLeft] = useState(() => Math.max(0, target - Date.now()))

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(Math.max(0, target - Date.now()))
    }, 1000)
    return () => clearInterval(id)
  }, [target])

  const totalSeconds = Math.floor(timeLeft / 1000)
  const days    = Math.floor(totalSeconds / 86400)
  const hours   = Math.floor((totalSeconds % 86400) / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60

  return { days, hours, minutes, seconds, expired: timeLeft === 0 }
}

export function TicketOptions({ onSelect }) {
  const [selectedId, setSelectedId] = useState(POPULAR_ID)
  const selectedPack = ticketPacks.find((p) => p.id === selectedId)
  const { days, hours, minutes, seconds, expired } = useCountdown(CLOSE_DATE.getTime())

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

      {/* Cards */}
      <div className="mx-auto grid max-w-lg grid-cols-1 gap-3">
        {ticketPacks.map((pack) => (
          <TicketCard
            key={pack.id}
            pack={pack}
            selected={selectedId === pack.id}
            onSelect={() => setSelectedId(pack.id)}
          />
        ))}
      </div>

      {/* Countdown box */}
      <div className="mx-auto mt-6 max-w-lg rounded-2xl border-2 border-amber-400 bg-amber-50 px-5 py-4">
        <p className="mb-3 text-center text-sm font-semibold text-amber-900">
          Sorteo {raffleInfo.prize} — {raffleInfo.drawDate} — cierra en
        </p>
        {expired ? (
          <p className="text-center text-sm font-bold text-red-600">¡El sorteo cerró!</p>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <CountUnit value={days} label="días" />
            <Colon />
            <CountUnit value={hours} label="hs" />
            <Colon />
            <CountUnit value={minutes} label="min" />
            <Colon />
            <CountUnit value={seconds} label="seg" />
          </div>
        )}
      </div>

      {/* Buy CTA — aparece cuando hay selección */}
      <div className="mx-auto mt-4 max-w-lg">
        <ShimmerButton
          onClick={() => onSelect(selectedPack)}
          className="h-13 w-full text-base font-bold"
          shimmerColor="#fbbf24"
          background="rgba(180, 83, 9, 1)"
          borderRadius="14px"
        >
          {`Comprar ${selectedPack.cantidad} ${selectedPack.cantidad === 1 ? 'boleto' : 'boletos'} — ${formatPrice(selectedPack.precio)}`}
        </ShimmerButton>
      </div>
    </section>
  )
}

function TicketCard({ pack, selected, onSelect }) {
  const isPopular = pack.id === POPULAR_ID

  return (
    <div className="relative rounded-2xl">
      {isPopular && (
        <div className="absolute -top-3 left-1/2 z-50 -translate-x-1/2">
          <span className="rounded-full bg-amber-500 px-4 py-1 text-xs font-bold text-white shadow-md shadow-amber-200">
            ⭐ MÁS POPULAR
          </span>
        </div>
      )}

      <MagicCard
        className={`rounded-2xl border-2 bg-white shadow-sm transition-colors ${
          selected
            ? 'border-amber-500'
            : 'border-zinc-200'
        }`}
        gradientColor={isPopular ? '#fef3c7' : '#f4f4f5'}
        gradientFrom={isPopular ? '#f59e0b' : '#a1a1aa'}
        gradientTo={isPopular ? '#d97706' : '#71717a'}
        gradientSize={180}
        gradientOpacity={0.12}
      >
        <button
          onClick={onSelect}
          className="flex w-full items-center gap-4 p-4 text-left"
        >
          {/* Radio indicator */}
          <div
            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
              selected
                ? 'border-amber-500 bg-amber-500'
                : 'border-zinc-300 bg-white'
            }`}
          >
            {selected && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
          </div>

          {/* Info */}
          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-center gap-2">
              <div className={`rounded-lg p-1.5 ${isPopular ? 'bg-amber-100' : 'bg-zinc-100'}`}>
                <Ticket className={`h-4 w-4 ${isPopular ? 'text-amber-600' : 'text-zinc-500'}`} />
              </div>
              <span className={`text-sm font-semibold ${isPopular ? 'text-amber-700' : 'text-zinc-700'}`}>
                {pack.cantidad} {pack.cantidad === 1 ? 'boleto' : 'boletos'}
              </span>
            </div>

            <p className={`text-xl font-black ${isPopular ? 'text-amber-600' : 'text-zinc-900'}`}>
              {formatPrice(pack.precio)}
            </p>
          </div>
        </button>
      </MagicCard>
    </div>
  )
}

function CountUnit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <span className="min-w-[2.5ch] text-center text-2xl font-black tabular-nums text-amber-800">
        {String(value).padStart(2, '0')}
      </span>
      <span className="text-[10px] font-medium uppercase tracking-wide text-amber-600">{label}</span>
    </div>
  )
}

function Colon() {
  return <span className="mb-3 text-xl font-black text-amber-400">:</span>
}
