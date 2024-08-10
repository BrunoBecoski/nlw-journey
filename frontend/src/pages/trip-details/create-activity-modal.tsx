import { FormEvent } from "react"
import { useParams } from "react-router-dom"

import { Button } from "../../components/button"
import { Modal } from "../../components/modal"
import { api } from "../../lib/axios"
import { Input } from "../../components/input"

interface CreateActivityModalProps {
  closeCreateActivityModal: () => void
}

export function CreateActivityModal({ 
  closeCreateActivityModal
}: CreateActivityModalProps) {
  const { tripId } = useParams()

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const title = data.get('title')?.toString()
    const occurs_at = data.get('occurs_at')?.toString()

    await api.post(`/trips/${tripId}/activities`, {
      title,
      occurs_at
    })

    window.document.location.reload()
  }

  return (
    <Modal
      title="Cadastrar atividade"
      description="Todos convidados podem visualizar as atividades."
      onClose={closeCreateActivityModal}
    >          
      <form onSubmit={createActivity} className="space-y-3">
        <Input
          icon="tag"
          name="title"
          placeholder="Qual a atividade?"         
        />

        <Input
          icon="calendar"
          type="datetime-local"
          name="occurs_at"
          placeholder="Data e horário da atividade" 
        />

        <Button variant="primary" size="full">
          Salvar atividade
        </Button>
      </form>
    </Modal>
  )
}