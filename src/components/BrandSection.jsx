import { AnimatedShinyText } from '@/components/ui/animated-shiny-text'

export function BrandSection() {
  return (
    <section className="bg-zinc-50 px-4 py-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="mb-3 inline-flex items-center rounded-full border border-zinc-200 bg-white px-4 py-1.5">
          <AnimatedShinyText
            className="text-xs font-semibold uppercase tracking-widest text-zinc-500"
            shimmerWidth={100}
          >
            ✦ 10 años juntos
          </AnimatedShinyText>
        </div>
        <h2 className="text-2xl font-extrabold text-zinc-900 sm:text-3xl">
          Clementina somos nosotras
        </h2>
        <p className="mx-auto mt-2 max-w-xs text-sm text-zinc-400">
          Una década de moda, pasión y comunidad desde Tucumán para todo el país.
        </p>
      </div>

      {/* Photos */}
      <div className="mx-auto grid max-w-lg grid-cols-2 gap-3">
        {/* Foto 1 — portrait vertical */}
        <div className="relative overflow-hidden rounded-2xl shadow-md">
          <img
            src="/images/flor1.jpeg"
            alt="Clementina showroom"
            className="h-full w-full object-cover object-top"
            style={{ aspectRatio: '3/4' }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/40 to-transparent" />
        </div>

        {/* Foto 2 — con caption */}
        <div className="flex flex-col gap-3">
          <div className="relative flex-1 overflow-hidden rounded-2xl shadow-md">
            <img
              src="/images/flor2.jpeg"
              alt="Clementina equipo"
              className="h-full w-full object-cover object-top"
              style={{ aspectRatio: '3/4' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/50 to-transparent" />
            <span className="absolute bottom-3 left-3 right-3 text-xs font-semibold text-white drop-shadow">
              La ofi de hoy 🙌
            </span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="mx-auto mt-8 grid max-w-lg grid-cols-2 gap-3 text-center">
        {[
          { value: '10', label: 'años' },
          { value: '70K+', label: 'clientas' },
        ].map(({ value, label }) => (
          <div key={label} className="rounded-xl border border-zinc-200 bg-white py-4">
            <p className="text-2xl font-black text-amber-600">{value}</p>
            <p className="text-xs text-zinc-400">{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
