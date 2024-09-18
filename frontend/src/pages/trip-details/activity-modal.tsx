import { FormEvent, useState } from "react"
import { useParams } from "react-router-dom"

import { Button } from "../../components/button"
import { DateTimePicker } from "../../components/date-time-picker"
import { Input } from "../../components/input"
import { Modal } from "../../components/modal"
import { api } from "../../lib/axios"

interface ActivityModalProps {
  variant: 'create' | 'edit'
  title?: string
  occursAt?: string
  startsAt: string
  endsAt: string
  activityId?: string
  closeActivityModal: () => void
}

export function ActivityModal({
  variant,
  title,
  startsAt,
  endsAt,
  occursAt,
  activityId,
  closeActivityModal
}: ActivityModalProps) {
  const { tripId } = useParams()
  const [eventDateTime, setEventDateTime] = useState<Date>(occursAt ? new Date(occursAt) : new Date(startsAt))

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const title = data.get('title')?.toString()

    await api.post(`/trips/${tripId}/activities`, {
      title,
      occurs_at: eventDateTime
    })

    window.document.location.reload()
  }

  async function deleteActivity() {
    await api.delete(`/trips/${tripId}/activities/${activityId}`)

    window.document.location.reload()
  }

  async function updateActivity(event: FormEvent<HTMLFormElement>) {
    const data = new FormData(event.currentTarget)

    const title = data.get('title')?.toString()

    await api.put(`/trips/${tripId}/activities/${activityId}`, {
      title,
      occurs_at: eventDateTime,
    })

    window.document.location.reload()
  }

  return (
    <Modal
      title={variant === 'create' ? 'Cadastrar atividade': 'Editar atividade' }
      description="Todos convidados podem visualizar as atividades."
      onClose={closeActivityModal}
    >          
      <form onSubmit={variant === 'create' ? createActivity : updateActivity} className="space-y-3">
        <Input
          icon="tag"
          name="title"
          placeholder="Qual a atividade?"
          defaultValue={title}
        />

        <DateTimePicker
          startsAt={startsAt}
          endsAt={endsAt}
          eventDateTime={eventDateTime}
          setEventDateTime={setEventDateTime}
        />

        <div className="flex gap-4">
          <Button type="submit" variant="primary" size="full">
            { variant === 'create' ? 'Criar atividade' : 'Atualizar atividade' }
          </Button>
          
          { variant === 'edit' &&
            <Button type="button" onClick={deleteActivity} variant="secondary" size="full" >
              Excluir atividade
            </Button>
          }
        </div>

      </form>
    </Modal>
  )
}