import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { DateRange, DayPicker } from "react-day-picker"

import { Button } from "./button"

export type DatesPickerRange = DateRange 

interface DatesPickerProps {
  eventStartAndEndDates: DatesPickerRange | undefined
  setEventStartAndEndDates: (dates: DatesPickerRange | undefined) => void
  onClose: () => void

}

export function DatesPicker({
  eventStartAndEndDates,
  setEventStartAndEndDates,
  onClose,
}: DatesPickerProps) {

  const displayedStartDate = eventStartAndEndDates?.from &&
    format(eventStartAndEndDates.from, "d' de 'LLLL", { locale:  ptBR })

  const displayedEndDate = eventStartAndEndDates?.to &&
    format(eventStartAndEndDates.to, "d' de 'LLLL", { locale:  ptBR })
  
  return (
    <div className="flex flex-col items-center">
      <DayPicker
        mode="range"
        selected={eventStartAndEndDates}
        onSelect={setEventStartAndEndDates}
        disabled={{ before: new Date() }}
        locale={ptBR}
        classNames={{
          caption_label: 'text-lg font-bold first-letter:uppercase',
          nav_button_next: ' text-white hover:text-lime-400 cursor-pointer',
          nav_button_previous: 'text-white hover:text-lime-400 cursor-pointer',
          button: 'hover:bg-zinc-950 rounded-full',
          day: 'cursor-pointer size-9 hover:text-lime-400',
          day_disabled: 'opacity-50 cursor-not-allowed hover:text-white hover:bg-transparent',
          day_selected: 'bg-transparent',
          day_range_start: 'border-2 border-lime-500 ',
          day_range_middle: 'border-2 border-lime-500 ',
          day_range_end: 'border-2 border-lime-500 ',
          day_today: 'text-lime-400 font-bold',
        }}
      />
      
      <div className="w-full flex flex-col border-t-2 max-w-72 border-zinc-800">
        <div className="flex justify-evenly my-4">
          <span className="font-medium">
            {eventStartAndEndDates?.from && displayedStartDate}
          </span>

          até

          <span className="font-medium">
            {eventStartAndEndDates?.to && displayedEndDate}
          </span>
        </div>

        <Button
          icon="calendar-check"
          size="full"
          onClick={onClose}
        >
          Confirmar
        </Button>   
      </div>
    </div>
  )
}