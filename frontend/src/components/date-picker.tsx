import { ptBR } from "date-fns/locale"
import { DateInterval, DayPicker } from "react-day-picker"

interface DatePickerProps {
  startsAt: string
  endsAt: string
  eventDate?: Date
  setEventDate: (dates: Date | undefined) => void
}

export function DatePicker({
  startsAt, 
  endsAt,
  eventDate,
  setEventDate,
}: DatePickerProps) {

  const matcher: DateInterval = {
    before: new Date(startsAt),
    after: new Date(endsAt),
  };

  return (
    <div className="flex flex-col items-center">
      <DayPicker
        mode="single"
        selected={eventDate}
        onSelect={setEventDate}
        disabled={matcher}
        locale={ptBR}
        classNames={{
          caption_label: 'text-lg font-bold first-letter:uppercase',
          nav_button_next: ' text-white hover:text-lime-400 cursor-pointer',
          nav_button_previous: 'text-white hover:text-lime-400 cursor-pointer',
          button: 'hover:bg-zinc-950 rounded-full',
          day: 'cursor-pointer size-9 hover:text-lime-400',
          day_disabled: 'opacity-10',
          day_selected: 'bg-transparent',
          day_range_start: 'border-2 border-lime-500 ',
          day_range_middle: 'border-2 border-lime-500 ',
          day_range_end: 'border-2 border-lime-500 ',
          day_today: 'text-lime-400 font-bold',
        }}
      />
    </div>
  )
}