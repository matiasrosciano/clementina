import { useState } from 'react'
import { HeroSection } from '@/components/HeroSection'
import { TicketOptions } from '@/components/TicketOptions'
import { PurchaseDrawer } from '@/components/PurchaseDrawer'

export default function App() {
  const [selectedPack, setSelectedPack] = useState(null)

  return (
    <div className="min-h-dvh bg-white">
      <HeroSection />
      <TicketOptions onSelect={setSelectedPack} />
      <PurchaseDrawer
        pack={selectedPack}
        open={!!selectedPack}
        onClose={() => setSelectedPack(null)}
      />
    </div>
  )
}
