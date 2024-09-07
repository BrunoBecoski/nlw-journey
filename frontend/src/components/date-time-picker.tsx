import { format, setHours, setMinutes } from "date-fns"
import { ChangeEvent, useEffect, useState } from "react"
import { DayPicker } from "react-day-picker"
import { ptBR } from "date-fns/locale"
import { Input } from "./input"
import { Button } from "./button"

interface DateTimePickerProps {
  startsAt: string
  endsAt: string
  setEventDateTime: (eventDateTime: Date) => void
}

export function DateTimePicker({ startsAt, endsAt, setEventDateTime }: DateTimePickerProps) {
  const [isDateTimePickerOpen, setIsDateTimePickerOpen] = useState(false)
  const [selected, setSelected] = useState(new Date())
  const [timeValue, setTimeValue] = useState('00:00')

  function handleTimeChange(event: ChangeEvent<HTMLInputElement>) {
    const time = event.target.value

    if (!selected) {
      setTimeValue(time)
      return
    }

    const [hours, minutes] = time.split(':').map((str) => parseInt(str, 10))
    const newSelectedDate = setHours(setMinutes(selected, minutes), hours)
    setSelected(newSelectedDate)
    setTimeValue(time)
  }

  function handleDaySelect(date: Date | undefined) {
    if (!timeValue || !date) {
      setSelected(date)
      return
    }

    const [hours, minutes] = timeValue
      .split(':')
      .map((str) => parseInt(str, 10))

    const newDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      hours,
      minutes,
    )

    setSelected(newDate)
  }

  useEffect(() => {
    if (selected != undefined) {
      setEventDateTime(selected)
    }
  }, [selected, setEventDateTime])

  return (
    <div>
      <div className="flex gap-4">
        <Input
          icon="calendar-clock"
          readOnly
          value={format(selected, "d'/'MM'/'y' 'HH':'mm'h")}
        />

        <Button variant="secondary" onClick={() => setIsDateTimePickerOpen(!isDateTimePickerOpen)}>
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
              selected={selected}
              onSelect={handleDaySelect}
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
                day_selected: 'bg-transparent',
                day_range_start: 'border-2 border-lime-500 ',
                day_range_middle: 'border-2 border-lime-500 ',
                day_range_end: 'border-2 border-lime-500 ',
                day_today: 'text-lime-400 font-bold',
              }}
            />
          </div>

          <div className="space-y-4">
            <label className="text-lg font-semibold">
              Selecione o hora:
            </label>
            <Input type="time" value={timeValue} onChange={handleTimeChange} />
          </div>
        </div>
      }
    </div>
  )
}