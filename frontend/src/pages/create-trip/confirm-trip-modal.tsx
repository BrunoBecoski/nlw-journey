import { Mail, User } from "lucide-react"
import { FormEvent } from "react"

import { Button } from "../../components/button"
import { Input } from "../../components/input"
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
      description={<>
        Para concluir a criação da viagem para <span className="font-semibold text-zinc-100">Florianópolis, Brasil</span> nas datas de <span className="font-semibold text-zinc-100">16 a 27 de Agosto de 2024</span> preencha seus dados abaixo
      </>}
      onClose={closeConfirmTripModal}
    >
      <form onSubmit={createTrip} className="space-y-3">
        <Input
          name="name"
          placeholder="Seu nome completo"
          onChange={(event => setOwnerName(event.target.value))} 
        >
          <User className="text-zinc-400 size-5" />
        </Input>

        <Input
          type="email"
          name="email"
          placeholder="Seu e-mail pessoal" 
          onChange={(event => setOwnerEmail(event.target.value))} 
        >
          <Mail className="text-zinc-400 size-5" />
        </Input>

        <Button type="submit" variant="primary" size="full">
          Confirmar criação da viagem
        </Button>
      </form>
    </Modal>
  )
}