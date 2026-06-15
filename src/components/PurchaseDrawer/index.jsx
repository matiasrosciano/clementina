import { useState } from 'react'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from '@/components/ui/drawer'
import { ContactForm } from './ContactForm'
import { PaymentInfo } from './PaymentInfo'
import { X } from 'lucide-react'

export function PurchaseDrawer({ pack, open, onClose }) {
  const [step, setStep] = useState('form') // 'form' | 'payment'
  const [contact, setContact] = useState(null)

  function handleFormSubmit(data) {
    setContact(data)
    setStep('payment')
  }

  function handleOpenChange(isOpen) {
    if (!isOpen) {
      onClose()
      // reset after drawer closes
      setTimeout(() => {
        setStep('form')
        setContact(null)
      }, 300)
    }
  }

  if (!pack) return null

  return (
    <Drawer open={open} onOpenChange={handleOpenChange}>
      <DrawerContent className="max-h-[90dvh] overflow-y-auto">
        <DrawerHeader className="relative flex items-center justify-between px-4 pt-4 pb-2">
          <DrawerTitle>
            {step === 'form' ? 'Tus datos' : 'Datos de pago'}
          </DrawerTitle>
          <DrawerClose asChild>
            <button className="rounded-full p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700 transition-colors">
              <X className="h-5 w-5" />
            </button>
          </DrawerClose>
        </DrawerHeader>

        {step === 'form' ? (
          <ContactForm pack={pack} onSubmit={handleFormSubmit} />
        ) : (
          <PaymentInfo pack={pack} contact={contact} />
        )}
      </DrawerContent>
    </Drawer>
  )
}
