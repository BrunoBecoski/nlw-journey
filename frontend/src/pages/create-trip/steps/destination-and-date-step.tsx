import { format } from "date-fns"
import { Calendar } from "lucide-react"
import { useState } from "react"
import { DateRange } from "react-day-picker"
import "react-day-picker/dist/style.css"

import { Button } from "../../../components/button"
import { DatePicker } from "../../../components/date-picker"
import { Input } from "../../../components/input"

interface DestinationAndDateStepProps {
  isGuestsInputOpen: boolean
  eventStartAndEndDates: DateRange | undefined
  closeGuestsInput: () => void
  openGuestsInput: () => void
  setDestination: (destination: string) => void
  setEventStartAndEndDates: (dates: DateRange | undefined) => void
}

export function DestinationAndDateStep({
  isGuestsInputOpen,
  closeGuestsInput,
  openGuestsInput,
  setDestination,
  eventStartAndEndDates,
  setEventStartAndEndDates
}: DestinationAndDateStepProps) {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  function openDatePicker() {
    return setIsDatePickerOpen(true)
  }

  function closeDatePicker() {
    return setIsDatePickerOpen(false)
  }

  const displayedDate = eventStartAndEndDates && eventStartAndEndDates.from && eventStartAndEndDates.to
    ? format(eventStartAndEndDates.from, "d' de 'LLL").concat(' até ').concat(format(eventStartAndEndDates.to, "d' de 'LLL"))
    : null
  
  return (
    <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
      <Input
        icon="map-pin"
        variant="secondary"
        placeholder="Para onde você vai?"
        disabled={isGuestsInputOpen}
        onChange={(event) => setDestination(event.target.value)}
      />

      <button onClick={openDatePicker} disabled={isGuestsInputOpen} className="flex items-center gap-2 text-left w-[240px]">
        <Calendar className="size-5 text-zinc-400" />
        <span className="text-lg text-zinc-400 w-40 flex-1">
          {displayedDate || 'Quando?'}
        </span>
      </button>

      {isDatePickerOpen && (
        <DatePicker
          eventStartAndEndDates={eventStartAndEndDates}
          setEventStartAndEndDates={setEventStartAndEndDates}
          closeDatePicker={closeDatePicker}
        />
      )}

      <div className="w-px h-6 bg-zinc-800" />

      {isGuestsInputOpen ? (
        <Button onClick={closeGuestsInput} variant="secondary" icon="settings-2">
          Alterar local/data
        </Button>
      ) : (
        <Button onClick={openGuestsInput} variant="primary" icon="arrow-right">
          Continuar
        </Button>
      )}
    </div>
  )
}