import { format } from "date-fns"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Button } from "../../components/button"
import { Icon } from "../../components/icon"
import { api } from "../../lib/axios"
import { UpdateEventModal } from "./update-event-modal"

interface Trip {
  id: string
  destination: string
  starts_at: string 
  ends_at: string
  is_confirmed: boolean
}

export function DestinationAndDateHeader() {
  const { tripId } = useParams()
  const [trip, setTrip] = useState<Trip | undefined>()
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

  useEffect(() => {
    api.get(`/trips/${tripId}`).then(response => setTrip(response.data.trip))
  }, [tripId])

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