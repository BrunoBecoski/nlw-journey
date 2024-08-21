import { DateRange, DayPicker } from "react-day-picker"

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
      mode="range"
      selected={eventStartAndEndDates}
      onSelect={setEventStartAndEndDates}
      disabled={{ before: new Date() }}
      classNames={{
        day_range_start: 'border-2 border-lime-400 bg-transparent',
        day_range_middle: 'border-2 border-lime-400 bg-transparent',
        day_range_end: 'border-2 border-lime-400 bg-transparent',
      }}
    />
  )
}