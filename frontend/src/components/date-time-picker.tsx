import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useEffect, useState } from "react"
import { DayPicker } from "react-day-picker"

import { Button } from "./button"
import { Input } from "./input"

interface DateTimePickerProps {
  startsAt: string
  endsAt: string
  eventDateTime: Date
  setEventDateTime: (eventDateTime: Date) => void
}

export function DateTimePicker({ 
  startsAt,
  endsAt,
  eventDateTime,
  setEventDateTime
}: DateTimePickerProps) {
  const [isDateTimePickerOpen, setIsDateTimePickerOpen] = useState(false)

  const [timeValue, setTimeValue] = useState('12:00')
  const [dateValue, setDateValue] = useState<Date | undefined>(new Date(startsAt))

  useEffect(() => {
    if (dateValue  != undefined) {

      const [hours, minutes] = timeValue.split(":").map((str) => parseInt(str, 10));

      const newDate = new Date(
        dateValue.getFullYear(),
        dateValue.getMonth(),
        dateValue.getDate(),
        hours,
        minutes,
      )

      setEventDateTime(newDate)
    }

  }, [timeValue, dateValue, setEventDateTime])

  return (
    <div>
      <div className="flex gap-4">
        <Input
          icon="calendar-clock"
          readOnly
          value={format(eventDateTime, "d'/'MM'/'y' 'HH':'mm'h")}
        />

        <Button variant="secondary" type="button" onClick={() => setIsDateTimePickerOpen(!isDateTimePickerOpen)}>
          {isDateTimePickerOpen
            ? 'Fechar seletor de dia e hora'
            : 'Abrir seletor de dia e hora'
          }
        </Button>
      </div>

      {isDateTimePickerOpen &&
        <div className="flex mt-6 justify-center">
          <div className="space-y-4">
            <label className="text-lg font-semibold">Selecione o dia:</label>
            <DayPicker
              mode="single"
              defaultMonth={dateValue && new Date(dateValue)}
              selected={dateValue && new Date(dateValue)}
              onSelect={setDateValue}
              locale={ptBR}
              disabled={{
                before: new Date(startsAt),
                after: new Date(endsAt),
              }}
              classNames={{
                caption_label: 'text-lg font-bold first-letter:uppercase',
                nav_button_next: ' text-white hover:text-lime-400 cursor-pointer',
                nav_button_previous: 'text-white hover:text-lime-400 cursor-pointer',
                button: 'hover:bg-zinc-950 rounded-full',
                day: 'cursor-pointer size-9 hover:text-lime-400',
                day_disabled: 'opacity-10',
                day_selected: 'border-2 border-lime-500',
                day_today: 'text-lime-400 font-bold',
              }}
            />
          </div>

          <div className="space-y-4">
            <label className="text-lg font-semibold">Selecione o hora:</label>
            <Input
              type="time"
              value={timeValue}
              onChange={(event) => setTimeValue(event.target.value)}
            />
          </div>
        </div>
      }
    </div>
  )
}