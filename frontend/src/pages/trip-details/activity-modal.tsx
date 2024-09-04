import { format } from "date-fns"
import { FormEvent, useEffect, useState } from "react"
import { } from "react-day-picker"
import { useParams } from "react-router-dom"

import { Button } from "../../components/button"
import { DatePicker } from "../../components/date-picker"
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
  const [eventDate, setEventDate] = useState<Date>()
  const [eventHour, setEventHour] = useState<string>()
  const [eventDateAndHour, setEventDateAndHour] = useState<Date>(new Date)

  async function createActivity(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const title = data.get('title')?.toString()

    await api.post(`/trips/${tripId}/activities`, {
      title,
      occurs_at: eventDateAndHour
    })

    window.document.location.reload()
  }

  useEffect(() => {
    if (eventDate && eventHour) {
      const year = eventDate.getFullYear()
      const month = eventDate.getMonth()
      const date = eventDate.getDate()
      const hour = eventHour.split(':')

      const dateAndHour = new Date(year, month, date, Number(hour[0]), Number(hour[1]))

      setEventDateAndHour(dateAndHour)
    }

  }, [eventDate, eventHour])

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
          value={format(eventDateAndHour, "d'/'MM'/'y' 'HH':'mm'h" )}
        />

        <div className="flex">

          <DatePicker
            startsAt={startsAt}
            endsAt={endsAt}
            eventDate={eventDate}
            setEventDate={setEventDate}
          />

          <Input
            icon="calendar"
            type="time"
            name="occurs_at"
            placeholder="Data e horário da atividade"
            value={eventHour}
            onChange={(event) => setEventHour(event.currentTarget.value)}
          />
        </div>


        <Button variant="primary" size="full">
          Salvar atividade
        </Button>
      </form>
    </Modal>
  )
}