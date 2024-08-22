import { DateRange, DayPicker } from "react-day-picker"
import { ptBR } from "date-fns/locale"

export type DatePickerRange = DateRange 

interface DatePickerProps {
  eventStartAndEndDates: DatePickerRange | undefined
  setEventStartAndEndDates: (dates: DatePickerRange | undefined) => void
}

export function DatePicker({
  eventStartAndEndDates,
  setEventStartAndEndDates,
}: DatePickerProps) {
  return (
    <DayPicker
      className='border-'
      mode="range"
      selected={eventStartAndEndDates}
      onSelect={setEventStartAndEndDates}
      disabled={{ before: new Date() }}
      locale={ptBR}
      classNames={{
        caption_label: 'text-lg font-bold first-letter:uppercase',
        nav_button_next: ' text-white hover:text-lime-400 cursor-pointer',
        nav_button_previous: 'text-white hover:text-lime-400 cursor-pointer',
        button: 'hover:bg-zinc-950',
        day_disabled: 'opacity-50 cursor-not-allowed hover:text-white',
        day: 'cursor-pointer size-10 hover:text-lime-400',
        day_selected: 'bg-transparent',
        day_range_start: ' border-l-2 border-y-2  border-lime-500 rounded-l-lg',
        day_range_middle: 'border-y-2 border-lime-500 ',
        day_range_end: '  border-r-2 border-y-2  border-lime-500 rounded-r-lg',
      }}
    />
  )
}