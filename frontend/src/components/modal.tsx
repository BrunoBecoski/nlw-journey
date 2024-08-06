import { X } from "lucide-react"
import { ReactNode } from "react"

interface ModalProps {
  title: string
  description: ReactNode
  closeModal: () => void
  children: ReactNode
}

  export function Modal({ title, description, closeModal, children }: ModalProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">{title}</h2>
            <button type="button" onClick={closeModal} title="Fechar">
              <X className="size-5 text-zinc-400 hover:text-zinc-50" /> 
            </button>
          </div>
          <p className="text-sm text-zinc-400">{description}</p>
        </div>
        {children}
      </div>
    </div>
  )
}