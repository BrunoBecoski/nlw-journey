import { UserCog } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Button } from "../../components/button"
import { Guest } from "../../components/guest"
import { api } from "../../lib/axios"

interface Participant {
  id: string
  name: string | null
  email: string
  is_confirmed: boolean
}

export function Guests() {
  const { tripId } = useParams()
  const [participants, setParticipants] = useState<Participant[]>([])

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
     
      <Button variant="secondary" size="full" >
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>
    </div>
  )
}