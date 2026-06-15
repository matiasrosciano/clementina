import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ShimmerButton } from '@/components/ui/shimmer-button'
import { Ticket } from 'lucide-react'

function formatPrice(n) {
  return new Intl.NumberFormat('es-AR', { style: 'currency', currency: 'ARS', maximumFractionDigits: 0 }).format(n)
}

export function ContactForm({ pack, onSubmit }) {
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '' })
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!form.nombre.trim()) e.nombre = 'Ingresá tu nombre completo'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Ingresá un email válido'
    if (!form.telefono.trim() || form.telefono.replace(/\D/g, '').length < 8)
      e.telefono = 'Ingresá un teléfono válido'
    return e
  }

  function handleSubmit(e) {
    e.preventDefault()
    const e2 = validate()
    if (Object.keys(e2).length > 0) { setErrors(e2); return }
    onSubmit(form)
  }

  function field(key, value) {
    setForm((f) => ({ ...f, [key]: value }))
    if (errors[key]) setErrors((err) => ({ ...err, [key]: undefined }))
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 px-4 pb-8 pt-2">
      {/* Pack summary */}
      <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 p-3">
        <Ticket className="h-5 w-5 shrink-0 text-amber-500" />
        <div>
          <p className="text-sm font-semibold text-zinc-900">
            {pack.cantidad} {pack.cantidad === 1 ? 'boleto' : 'boletos'}
          </p>
          <p className="text-xs text-zinc-400">{formatPrice(pack.precio)}</p>
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="nombre">Nombre completo</Label>
        <Input id="nombre" placeholder="Juan Pérez" value={form.nombre}
          onChange={(e) => field('nombre', e.target.value)} autoComplete="name" />
        {errors.nombre && <p className="text-xs text-red-500">{errors.nombre}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" placeholder="juan@ejemplo.com" value={form.email}
          onChange={(e) => field('email', e.target.value)} autoComplete="email" />
        {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="telefono">Teléfono</Label>
        <Input id="telefono" type="tel" placeholder="011 1234-5678" value={form.telefono}
          onChange={(e) => field('telefono', e.target.value)} autoComplete="tel" />
        {errors.telefono && <p className="text-xs text-red-500">{errors.telefono}</p>}
      </div>

      <ShimmerButton
        type="submit"
        className="h-12 w-full text-base font-semibold"
        shimmerColor="#fbbf24"
        background="rgba(180, 83, 9, 1)"
        borderRadius="12px"
      >
        Continuar al pago
      </ShimmerButton>
    </form>
  )
}
