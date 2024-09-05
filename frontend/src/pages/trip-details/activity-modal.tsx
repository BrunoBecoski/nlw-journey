import { format } from "date-fns"
import { FormEvent, useState } from "react"
import { useParams } from "react-router-dom"

import { Button } from "../../components/button"
import { DateTimePicker } from "../../components/date-time-picker"
import { Input } from "../../components/input"
import { Modal } from "../../components/modal"
import { api } from "../../lib/axios"

interface ActivityModalProps {
  variant: 'create' | 'edit'
  startsAt: string
  endsAt: string
  closeActivityModal: () => void
}

export function ActivityModal({
  variant,
  startsAt,
  endsAt,
  closeActivityModal
}: ActivityModalProps) {
  const { tripId } = useParams()
  const [eventDateHour, setEventDateHour] = useState<Date>(new Date)

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const title = data.get('title')?.toString()

    await api.post(`/trips/${tripId}/activities`, {
      title,
      occurs_at: eventDateHour
    })

    window.document.location.reload()
  }

  return (
    <Modal
      title={variant === 'create' ? 'Cadastrar atividade': 'Editar atividade' }
      description="Todos convidados podem visualizar as atividades."
      onClose={closeActivityModal}
    >          
      <form onSubmit={createActivity} className="space-y-3">
        <Input
          icon="tag"
          name="title"
          placeholder="Qual a atividade?"         
        />

        <Input
          icon="tag"
          readOnly
          value={format(eventDateHour, "d'/'MM'/'y' 'HH':'mm'h" )}
        />

        <DateTimePicker />

        <Button variant="primary" size="full">
          Salvar atividade
        </Button>
      </form>
    </Modal>
  )
}