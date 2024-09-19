import { UserCog } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Button } from "../../components/button"
import { Guest } from "../../components/guest"
import { api } from "../../lib/axios"
import { GuestsModal } from "./guests-modal"

export interface Participant {
  id: string
  name: string | null
  email: string
  is_confirmed: boolean
}

export function Guests() {
  const { tripId } = useParams()
  const [participants, setParticipants] = useState<Participant[]>([])
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false)

  function openGuestsModal() {
    setIsGuestsModalOpen(true)
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false)
  }

  useEffect(() => {
    api.get(`/trips/${tripId}/participants`).then(response => setParticipants(response.data.participants))
  }, [tripId])
  
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>
      <div className="space-y-5">
        {participants.map((participant, index) => {
          return (
            <Guest 
              key={participant.id}
              index={index}
              name={participant.name}
              email={participant.email}
              isConfirmed={participant.is_confirmed}
            />
          )
        })}
      </div>
     
      <Button onClick={openGuestsModal} variant="secondary" size="full" >
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>

      {isGuestsModalOpen && (
        <GuestsModal
          closeGuestsModal={closeGuestsModal}
          participants={participants}
        />
      )}
    </div>
  )
}