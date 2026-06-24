import { useState } from 'react'
import { HeroSection } from '@/components/HeroSection'
import { PrizeSection } from '@/components/PrizeSection'
import { TicketOptions } from '@/components/TicketOptions'
import { BrandSection } from '@/components/BrandSection'
import { ContactSection } from '@/components/ContactSection'
import { PurchaseDrawer } from '@/components/PurchaseDrawer'

export default function App() {
  const [selectedPack, setSelectedPack] = useState(null)

  return (
    <div className="min-h-dvh bg-white">
      <HeroSection />
      <PrizeSection />
      <TicketOptions onSelect={setSelectedPack} />
      <BrandSection />
      <ContactSection />
      <PurchaseDrawer
        pack={selectedPack}
        open={!!selectedPack}
        onClose={() => setSelectedPack(null)}
      />
    </div>
  )
}
