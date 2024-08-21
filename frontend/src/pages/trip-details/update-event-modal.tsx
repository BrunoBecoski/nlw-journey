import { useParams } from "react-router-dom"
import { format } from "date-fns"
import { FormEvent, useState } from "react"

import { Button } from "../../components/button"
import { Input } from "../../components/input"
import { Modal } from "../../components/modal"
import { api } from "../../lib/axios"
import { DatePicker, DatePickerRange } from "../../components/date-picker"

interface UpdateEventModalProps {
  destination?: string
  startsAt?: string 
  endsAt?: string
  closeUpdateEventModal: () => void
}

export function UpdateEventModal({ destination, startsAt, endsAt, closeUpdateEventModal }: UpdateEventModalProps) {
  const { tripId } = useParams()
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DatePickerRange | undefined>({
    from: startsAt ? new Date(startsAt) : new Date(), 
    to: endsAt ? new Date(endsAt) : new Date(),
  })

  const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
    ? format(eventStartAndEndDates.from, "d 'de 'LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d' de 'LLL"))
    : ''

  function openDatePicker() {
    return setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    return setIsDatePickerOpen(false)
  }

  async function updateEvent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const destination = data.get('destination')?.toString()

    await api.put(`/trips/${tripId}`, {
      destination,
      starts_at: eventStartAndEndDates?.from, 
      ends_at: eventStartAndEndDates?.to,
    })

    window.document.location.reload()
  }

  return (
    <Modal
      onClose={closeUpdateEventModal}
      title="Atualizar viagem"
    >
      {isDatePickerOpen? (
        <div className="flex flex-col items-center">       
          <DatePicker
            eventStartAndEndDates={eventStartAndEndDates}
            setEventStartAndEndDates={setEventStartAndEndDates}
          />
          <Button onClick={closeDatePicker}>Confirmar</Button>
        </div>
      ) : (
        <form onSubmit={updateEvent} className="space-y-2">
          <Input
            icon="pin"
            placeholder="Onde?"
            name="destination"
            defaultValue={destination}
          />

          <Input 
            icon="calendar"
            placeholder="Quando?"
            value={displayedDate}
            onClick={openDatePicker}
            readOnly
          />

          <Button variant="primary" size="full">
            Confirmar
          </Button>
        </form>
      )}
    </Modal>
  )
}