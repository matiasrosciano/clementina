import { useState } from 'react'
import { paymentInfo, whatsappNumber } from '@/data/raffle'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { Check, Copy, MessageCircle, Ticket } from 'lucide-react'

function formatPrice(n) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n)
}

export function PaymentInfo({ pack, contact }) {
  const [copiedField, setCopiedField] = useState(null)

  function copy(text, field) {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const waMessage = encodeURIComponent(
    `Hola! Quiero comprar ${pack.cantidad} ${pack.cantidad === 1 ? 'boleto' : 'boletos'} del sorteo por ${formatPrice(pack.precio)}.\n` +
    `Nombre: ${contact.nombre}\nTeléfono: ${contact.telefono}\n\nTe adjunto el comprobante de transferencia.`
  )
  const waLink = `https://wa.me/${whatsappNumber}?text=${waMessage}`

  const fields = [
    { label: 'Banco', value: paymentInfo.banco, key: 'banco' },
    { label: 'CBU', value: paymentInfo.cbu, key: 'cbu' },
    { label: 'Alias', value: paymentInfo.alias, key: 'alias' },
    { label: 'Titular', value: paymentInfo.titular, key: 'titular' },
    { label: 'CUIT/CUIL', value: paymentInfo.cuit, key: 'cuit' },
  ]

  return (
    <div className="flex flex-col gap-4 px-4 pb-8 pt-2">
      {/* Order summary */}
      <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3">
        <Ticket className="h-5 w-5 shrink-0 text-amber-500" />
        <div>
          <p className="text-sm font-semibold text-zinc-900">
            {pack.cantidad} {pack.cantidad === 1 ? 'boleto' : 'boletos'} — {formatPrice(pack.precio)}
          </p>
          <p className="text-xs text-zinc-400">A nombre de {contact.nombre}</p>
        </div>
      </div>

      {/* Payment data */}
      <div>
        <p className="mb-2.5 text-sm font-semibold text-zinc-700">Datos para la transferencia</p>
        <div className="divide-y divide-zinc-100 rounded-xl border border-zinc-200 bg-white">
          {fields.map(({ label, value, key }) => (
            <div key={key} className="flex items-center justify-between gap-2 px-3 py-2.5">
              <div>
                <p className="text-xs text-zinc-400">{label}</p>
                <p className="text-sm font-medium text-zinc-900">{value}</p>
              </div>
              <button
                onClick={() => copy(value, key)}
                className="shrink-0 rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600 transition-colors"
                aria-label={`Copiar ${label}`}
              >
                {copiedField === key
                  ? <Check className="h-4 w-4 text-amber-500" />
                  : <Copy className="h-4 w-4" />}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp notice */}
      <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-center">
        <p className="text-sm text-zinc-600">
          Una vez hecha la transferencia, envianos el comprobante a este WhatsApp para terminar con la operación.
        </p>
      </div>

      <ShimmerButton
        className="h-12 w-full gap-2 text-base font-semibold"
        shimmerColor="#4ade80"
        background="rgba(21, 128, 61, 1)"
        borderRadius="12px"
        onClick={() => window.open(waLink, '_blank', 'noopener,noreferrer')}
      >
        <MessageCircle className="h-5 w-5" />
        Enviar comprobante por WhatsApp
      </ShimmerButton>
    </div>
  )
}
