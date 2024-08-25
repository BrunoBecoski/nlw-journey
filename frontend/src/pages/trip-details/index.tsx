import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Button } from "../../components/button"
import { Activities } from "./activities"
import { CreateActivityModal } from "./create-activity-modal"
import { DestinationAndDateHeader } from "./destination-and-date-header"
import { Guests } from "./guests"
import { ImportantLinks } from "./important-links"
import { api } from "../../lib/axios"

export type Trip = {
  id: string
  destination: string
  starts_at: string 
  ends_at: string
  is_confirmed: boolean
}

export function TripDetailsPage() {
  const { tripId } = useParams()
  const [trip, setTrip] = useState<Trip | undefined>()
  const [isCreateActivityModalOpen, setIsCreateActivityModalOpen] = useState(false)

  function openCreateActivityModal() {
    setIsCreateActivityModalOpen(true)
  }

  function closeCreateActivityModal() {
    setIsCreateActivityModalOpen(false)
  }

  useEffect(() => {
    api.get(`/trips/${tripId}`).then(response => setTrip(response.data.trip))
  }, [tripId])

  return (
    <div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
      <DestinationAndDateHeader trip={trip}/>

      <main className="flex gap-16 px-4">
        <div className="flex-1 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-3xl font-semibold">Atividades</h2>
            <Button onClick={openCreateActivityModal} icon="plus">
              Cadastrar atividade
            </Button>
          </div>
          
          <Activities />          
        </div>

        <div className="w-80 space-y-6">
          <ImportantLinks />
          <div className="w-full h-px bg-zinc-800" />
          <Guests />
        </div>
      </main>

      {isCreateActivityModalOpen && (
        <CreateActivityModal 
          startsAt={trip?.starts_at}
          endsAt={trip?.ends_at}
          closeCreateActivityModal={closeCreateActivityModal}
        />
      )}
    </div>
  )
}