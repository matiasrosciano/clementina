import { contactInfo } from '@/data/raffle'
import { MagicCard } from '@/components/ui/magic-card'
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text'
import { MessageCircle, Mail, MapPin, Phone } from 'lucide-react'

const items = [
  {
    key: 'whatsapp',
    icon: MessageCircle,
    label: 'WhatsApp',
    value: contactInfo.phone,
    href: `https://wa.me/${contactInfo.whatsapp}`,
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
  },
  {
    key: 'phone',
    icon: Phone,
    label: 'Teléfono',
    value: contactInfo.phone,
    href: `tel:${contactInfo.phone}`,
    color: 'text-amber-600',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
  {
    key: 'address',
    icon: MapPin,
    label: 'Showroom',
    value: contactInfo.address,
    href: `https://maps.google.com/?q=${encodeURIComponent(contactInfo.address + ', Tucumán, Argentina')}`,
    color: 'text-rose-600',
    bg: 'bg-rose-50',
    border: 'border-rose-200',
  },
]

export function ContactSection() {
  return (
    <section className="bg-white px-4 py-14">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mb-3 inline-flex items-center rounded-full border border-zinc-200 bg-zinc-50 px-4 py-1.5">
          <AnimatedShinyText
            className="text-xs font-semibold uppercase tracking-widest text-zinc-500"
            shimmerWidth={100}
          >
            Estamos para ayudarte
          </AnimatedShinyText>
        </div>
        <h2 className="text-2xl font-extrabold text-zinc-900 sm:text-3xl">Contactános</h2>
      </div>

      {/* Cards grid */}
      <div className="mx-auto grid max-w-lg grid-cols-2 gap-3">
        {items.map(({ key, icon: Icon, label, value, href, color, bg, border }) => (
          <MagicCard
            key={key}
            className={`rounded-2xl border ${border} bg-white shadow-sm`}
            gradientColor="#f4f4f5"
            gradientFrom="#d4d4d8"
            gradientTo="#a1a1aa"
            gradientSize={150}
            gradientOpacity={0.1}
          >
            <a
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="flex flex-col gap-3 p-4 transition-opacity active:opacity-70"
            >
              <div className={`w-fit rounded-xl p-2.5 ${bg}`}>
                <Icon className={`h-5 w-5 ${color}`} />
              </div>
              <div>
                <p className="text-xs font-medium text-zinc-400">{label}</p>
                <p className="mt-0.5 break-all text-sm font-semibold text-zinc-800">{value}</p>
              </div>
            </a>
          </MagicCard>
        ))}
      </div>

      <p className="mt-10 text-center text-xs text-zinc-300">
        © {new Date().getFullYear()} Clementina G Showroom
      </p>
    </section>
  )
}
