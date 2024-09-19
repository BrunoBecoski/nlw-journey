import type { Participant } from "./guests"
import { Modal } from "../../components/modal"
import { Icon } from "../../components/icon"
import { Button } from "../../components/button"

interface GuestsModalProps {
  closeGuestsModal: () => void
  participants: Participant[]
}

export function GuestsModal({ closeGuestsModal, participants }: GuestsModalProps) {
  return (
    <Modal
      title="Gerenciar Convidados"
      onClose={closeGuestsModal}
    >
      <div className="flex flex-col gap-6">
        <div className="space-y-4">
          {participants.map((participant, index) => {
            return (
              <div className="flex items-center justify-between" key={participant.id}>
                <div className="flex items-center gap-4">
                  <Button variant="icon">
                    {participant.is_confirmed ? (
                      <Icon 
                        name="circle-check"
                      />
                      ) : (
                      <Icon 
                        name="circle-dashed"
                      />
                    )}
                  </Button>

                  <div className="space-y-1.5">
                    <span className="block font-medium text-zinc-100">
                      {participant.name ?? `Convidado ${index}`}
                    </span>

                    <span className="block text-sm text-zinc-400 truncate">
                      {participant.email}
                    </span>
                  </div>
                </div>
                <Button variant="icon" title="editar">
                  <Icon name="pen" />
                </Button>
              </div>
            )
          })}
        </div>

        <form className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
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
      </div>
    </Modal>

  )
}
