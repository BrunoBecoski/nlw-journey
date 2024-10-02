import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useState } from "react"


import { Button } from "../../components/button"
import { Trip } from "./index"

import { Icon } from "../../components/icon"
import { UpdateEventModal } from "./update-event-modal"

interface DestinationAndDateHeaderProps {
  trip?: Trip
}

export function DestinationAndDateHeader({ trip }: DestinationAndDateHeaderProps) {

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)

  const displayedDate = trip
    ? format(trip.starts_at, "d' de 'LLL", { locale: ptBR }).concat(' até ').concat(format(trip.ends_at, "d' de 'LLL", { locale: ptBR }))
    : null

  function openUpdateEventModal() {
    setIsUpdateModalOpen(true)
  }

  function closeUpdateEventModal() {
    setIsUpdateModalOpen(false)
  }

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon name="map-pin" className="size-5 text-zinc-400" />
        <span className="text-zinc-100">{trip?.destination}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Icon name="calendar" className="size-5 text-zinc-400" />
          <span className="text-zinc-100">{displayedDate}</span>
        </div>

        <div className="w-px h-6 bg-zinc-800" />

        <Button onClick={openUpdateEventModal} variant="secondary" icon="settings-2">
          Alterar local/data
        </Button>
      </div>

      {isUpdateModalOpen &&(
        <UpdateEventModal
          closeUpdateEventModal={closeUpdateEventModal}
          destination={trip?.destination}
          startsAt={trip?.starts_at}
          endsAt={trip?.ends_at}
        />
      )}
    </div>
  )
}