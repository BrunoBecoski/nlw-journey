import { DateRange, DayPicker } from "react-day-picker"

import { Button } from "./button"

interface DatePickerProps {
  closeDatePicker: () => void
  eventStartAndEndDates: DateRange | undefined
  setEventStartAndEndDates: (dates: DateRange | undefined) => void
}

export function DatePicker({
  eventStartAndEndDates,
  setEventStartAndEndDates,
  closeDatePicker,
}: DatePickerProps) {
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Selecione a data</h2>

            <Button 
              onClick={closeDatePicker}
              variant="close"
            />
          </div>
        </div>

        <DayPicker
          mode="range"
          selected={eventStartAndEndDates}
          onSelect={setEventStartAndEndDates}
        />
      </div>
    </div>

  )
}