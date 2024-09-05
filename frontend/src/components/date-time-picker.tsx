import { setHours, setMinutes } from "date-fns"
import { ChangeEvent, useState } from "react"
import { DayPicker } from "react-day-picker"

export function DateTimePicker() {
  const [selected, setSelected] = useState<Date>()
  const [timeValue, setTimeValue] = useState<string>('00:00')

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

  return (
    <div className="flex flex-col items-center">
      <form>
        <label>
          Selecione a hora
          <input type="time" value={timeValue} onChange={handleTimeChange} />
        </label>
      </form>

      <DayPicker
        mode="single"
        selected={selected}
        onSelect={handleDaySelect}
        footer={`Dia selecionado: ${selected ? selected.toLocaleString(): 'nenhum'}`}
      />
    </div>
  )
}