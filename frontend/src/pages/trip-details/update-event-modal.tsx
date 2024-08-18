import { format } from "date-fns"
import { useState } from "react"
import { DateRange, DayPicker } from "react-day-picker"

import { Button } from "../../components/button"
import { Input } from "../../components/input"
import { Modal } from "../../components/modal"

interface UpdateEventModalProps {
  closeUpdateEventModal: () => void
}

export function UpdateEventModal({ closeUpdateEventModal }: UpdateEventModalProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<DateRange | undefined>()

  const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
    ? format(eventStartAndEndDates.from, "d'de 'LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d' de 'LLL"))
    : ''

  function openDatePicker() {
    return setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    return setIsDatePickerOpen(false)
  }

  return (
    <Modal
      onClose={closeUpdateEventModal}
      title="Atualizar viagem"
    >
      {isDatePickerOpen? (
        <div className="flex flex-col items-center">       
          <DayPicker
            mode="range"
            selected={eventStartAndEndDates}
            onSelect={setEventStartAndEndDates}
          />
          <Button onClick={closeDatePicker}>Confirmar</Button>
        </div>
      ) : (
        <form className="space-y-2">
          <Input
            icon="pin"
            placeholder="Onde?"
          />

          <Input 
            icon="calendar"
            placeholder="Quando?"
            value={displayedDate}
            onClick={openDatePicker}
          />

          <Button variant="primary" size="full">
            Confirmar
          </Button>
        </form>
      )}
    </Modal>
  )
}