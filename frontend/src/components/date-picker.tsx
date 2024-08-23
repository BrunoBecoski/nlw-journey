import { DateRange, DayPicker } from "react-day-picker"
import { ptBR } from "date-fns/locale"

export type DatePickerRange = DateRange 

interface DatePickerProps {
  eventStartAndEndDates: DatePickerRange | undefined
  setEventStartAndEndDates: (dates: DatePickerRange | undefined) => void
  displayedDate: string
}

export function DatePicker({
  eventStartAndEndDates,
  setEventStartAndEndDates,
  displayedDate
}: DatePickerProps) {
  return (
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
        tfoot: 'text-center border-t-2 border-zinc-800',
      }}
      footer={eventStartAndEndDates && displayedDate}
    />
  )
}