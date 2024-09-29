import type { Participant } from "./guests"
import { Modal } from "../../components/modal"
import { Icon } from "../../components/icon"
import { Button } from "../../components/button"
import { FormEvent, useState } from "react"
import { useParams } from "react-router-dom"
import { api } from "../../lib/axios"
import { Input } from "../../components/input"

interface GuestsModalProps {
  closeGuestsModal: () => void
  participants: Participant[]
}

export function GuestsModal({ closeGuestsModal, participants }: GuestsModalProps) {
  const { tripId } = useParams()
  const [editParticipant, setEditParticipant] = useState<Participant | undefined>(undefined)
  const [name, setName] = useState('')
  const [isConfirmed, setIsConfirmed] = useState(false)

  async function handleInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const email = data.get('email')?.toString()

    if (!email) {
      return
    }

    const emailAlreadyInvite = participants.find(participant => participant.email === email)

    if (emailAlreadyInvite != undefined) {
      return
    }

    await api.post(`/trips/${tripId}/invites`, {
      email,
    })

    window.document.location.reload()
  }

  async function updateParticipant(participantId: string) {
    if (name.length === 0) {
      return
    }

    await api.put(`/participants/${participantId}`, {
      name,
      is_confirmed: isConfirmed
    })

    window.document.location.reload()
  }

  async function deleteParticipant() {
    await api.delete(`/participants/${editParticipant?.id}`)

    window.document.location.reload()
  }

  async function confirmParticipant(participantId: string) {
    await api.patch(`/participants/${participantId}/confirm`)

    window.document.location.reload()
  }

  async function cancelParticipant(participantId: string) {
    await api.patch(`/participants/${participantId}/cancel`)

    window.document.location.reload()
  }

  function openEditParticipant(participant: Participant) {
    setEditParticipant(participant)
    setIsConfirmed(participant.is_confirmed)
    if (participant.name) {
      setName(participant.name)
    }
  }

  function closeEditParticipant() {
    setEditParticipant(undefined)
    setName('')
    setIsConfirmed(false)
  }

  return (
    <Modal
      title="Gerenciar Convidados"
      description="Todos convidados podem visualizar os participantes."
      onClose={editParticipant == undefined ? closeGuestsModal : closeEditParticipant}
    >
      <div className="flex flex-col gap-6">
        {editParticipant !== undefined ? (
          <div className="space-y-1.5">
            <div className="flex gap-4">
              <Button
                size="full"
                variant={isConfirmed ? 'primary' : 'secondary'}
                onClick={() => setIsConfirmed(true)}
              >
                Confirmar
              </Button>
              <Button
                size="full"
                variant={isConfirmed ? 'secondary' : 'primary'}
                onClick={() => setIsConfirmed(false)}
              >
                Cancelar
              </Button>
            </div>
            <Input value={name} onChange={event => setName(event.target.value)} />
            <Input value={editParticipant.email} readOnly />
            <div className="flex gap-4">
              <Button onClick={() => updateParticipant(editParticipant.id)} variant="primary" size="full">
                Atualizar participante
              </Button>
              <Button onClick={deleteParticipant} variant="secondary" size="full">
                Excluir participante
              </Button>
            </div>
          </div>
        ) : (
          <>
            {participants.map((participant, index) => {
              return (
                <div className="space-y-4">
                  <div className="flex items-center justify-between" key={participant.id}>
                    <div className="flex items-center gap-4">
                      {participant.is_confirmed ? (
                        <Button title="Cancelar participante" variant="icon" onClick={() => cancelParticipant(participant.id)}>
                          <Icon
                            className="text-lime-500"
                            name="circle-check"
                          />
                        </Button>
                      ) : (
                        <Button title="Confirmar participante" variant="icon" onClick={() => confirmParticipant(participant.id)}>
                          <Icon
                            className="text-zinc-400"
                            name="circle-dashed"
                          />
                        </Button>
                      )}
                      <div className="space-y-1.5">
                        <span className="block font-medium text-zinc-100">
                          {participant.name ?? `Convidado ${index}`}
                        </span>
                        <span className="block text-sm text-zinc-400 truncate">
                          {participant.email}
                        </span>
                      </div>
                    </div>
                    <Button onClick={() => openEditParticipant(participant)} variant="secondary">
                      <Icon name="pen" />
                      Editar convidado
                    </Button>
                  </div>
                </div>
              )
            })}
            <form onSubmit={handleInvite} className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
              <div className="px-2 flex items-center flex-1 gap-2">
                <Icon name="at-sign" className="text-zinc-400 size-5" />
                <input
                  type="email"
                  name="email"
                  placeholder="Digite o e-mail do convidado"
                  className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                />
              </div>
              <Button type="submit" variant="primary" icon="plus">
                Convidar
              </Button>
            </form>
          </>
        )}
      </div>
    </Modal>
  )
}
