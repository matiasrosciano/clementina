import { useState } from 'react'
import { paymentInfo, whatsappNumber } from '@/data/raffle'
import { Button } from '@/components/ui/button'
import { Check, Copy, MessageCircle, Ticket } from 'lucide-react'

function formatPrice(n) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(n)
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
    <div className="flex flex-col gap-5 px-4 pb-6 pt-2">
      {/* Order summary */}
      <div className="flex items-center gap-3 rounded-xl bg-zinc-50 p-3">
        <Ticket className="h-5 w-5 shrink-0 text-zinc-400" />
        <div>
          <p className="text-sm font-semibold text-zinc-800">
            {pack.cantidad} {pack.cantidad === 1 ? 'boleto' : 'boletos'} — {formatPrice(pack.precio)}
          </p>
          <p className="text-xs text-zinc-500">A nombre de {contact.nombre}</p>
        </div>
      </div>

      {/* Payment data */}
      <div>
        <p className="mb-3 text-sm font-semibold text-zinc-700">Datos para la transferencia</p>
        <div className="divide-y divide-zinc-100 rounded-xl border border-zinc-200 bg-white">
          {fields.map(({ label, value, key }) => (
            <div key={key} className="flex items-center justify-between gap-2 px-3 py-2.5">
              <div>
                <p className="text-xs text-zinc-400">{label}</p>
                <p className="text-sm font-medium text-zinc-900">{value}</p>
              </div>
              <button
                onClick={() => copy(value, key)}
                className="shrink-0 rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors"
                aria-label={`Copiar ${label}`}
              >
                {copiedField === key ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* WhatsApp CTA */}
      <div className="rounded-xl bg-green-50 p-4 text-center">
        <p className="text-sm text-zinc-700">
          Una vez hecha la transferencia, envianos el comprobante a este WhatsApp para terminar con la operación.
        </p>
      </div>

      <Button
        asChild
        className="h-12 w-full gap-2 bg-green-600 text-base hover:bg-green-700"
      >
        <a href={waLink} target="_blank" rel="noopener noreferrer">
          <MessageCircle className="h-5 w-5" />
          Enviar comprobante por WhatsApp
        </a>
      </Button>
    </div>
  )
}
