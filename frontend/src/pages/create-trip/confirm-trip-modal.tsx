import { FormEvent } from "react"
import { Mail, User } from "lucide-react"

import { Button } from "../../components/button"
import { Modal } from "../../components/modal"

interface ConfirmTripModalProps {
  closeConfirmTripModal: () => void
  setOwnerName: (name: string) => void
  setOwnerEmail: (email: string) => void
  createTrip: (event: FormEvent<HTMLFormElement>) => void
}

export function ConfirmTripModal({
  closeConfirmTripModal,
  createTrip,
  setOwnerName,
  setOwnerEmail
}: ConfirmTripModalProps) {
  return (
    <Modal
      title="Confirmar criação de viagem"
      description={<>Para concluir a criação da viagem para <span className="font-semibold text-zinc-100">Florianópolis, Brasil</span> nas datas de <span className="font-semibold text-zinc-100">16 a 27 de Agosto de 2024</span> preencha seus dados abaixo</>}
      closeModal={closeConfirmTripModal}
    >
      <form onSubmit={createTrip} className="space-y-3">
        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <User className="text-zinc-400 size-5"/>
          <input
            onChange={(event => setOwnerName(event.target.value))} 
            name="name"
            placeholder="Seu nome completo" 
            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" 
          />
        </div>
        
        <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
          <Mail className="text-zinc-400 size-5"/>
          <input
            onChange={(event => setOwnerEmail(event.target.value))} 
            type="email"
            name="email"
            placeholder="Seu e-mail pessoal" 
            className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" 
          />
        </div>

        <Button type="submit" variant="primary" size="full">
          Confirmar criação da viagem
        </Button>
      </form>
    </Modal>
  )
}