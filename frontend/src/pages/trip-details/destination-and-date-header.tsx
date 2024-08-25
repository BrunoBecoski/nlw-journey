import { format } from "date-fns"
import { useState } from "react"

import { Button } from "../../components/button"
import { Trip } from "./index"

import { UpdateEventModal } from "./update-event-modal"
import { Icon } from "../../components/icon"

interface DestinationAndDateHeaderProps {
  trip?: Trip
}

export function DestinationAndDateHeader({ trip }: DestinationAndDateHeaderProps) {

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)

  const displayedDate = trip
    ? format(trip.starts_at, "d' de 'LLL").concat(' até ').concat(format(trip.ends_at, "d' de 'LLL"))
    : null

  function openUpdateEventModal() {
    return setIsUpdateModalOpen(true)
  }

  function closeUpdateEventModal() {
    return setIsUpdateModalOpen(false)
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