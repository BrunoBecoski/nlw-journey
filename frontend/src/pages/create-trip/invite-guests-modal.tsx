import { FormEvent } from "react"

import { Button } from "../../components/button"
import { Modal } from "../../components/modal"
import { Icon } from "../../components/icon"

interface InviteGuestsModalProps {
  closeGuestsModal: () => void
  emailsToInvite: string[]
  removeEmailFormInvites: (email: string) => void
  addNewEmailToInvite: (event: FormEvent<HTMLFormElement>) => void
}

export function InviteGuestsModal({
  closeGuestsModal,
  emailsToInvite,
  removeEmailFormInvites,
  addNewEmailToInvite
}: InviteGuestsModalProps) {
  return (
    <Modal
      title="Selecionar convidados"
      description="Convide seus amigos e planeje sua próxima viagem!"
      onClose={closeGuestsModal}
    >
      <div className="flex flex-wrap gap-2">
        {emailsToInvite.map(email => {
          return (
            <div key={email} className="py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2">
              <span className="text-zinc-300">{email}</span>
              <Button
                iconSize="sm"
                variant="close"
                title="Remover"
                onClick={() => removeEmailFormInvites(email)}
              />
          </div>
          )
        })}
      </div>

      <div className="w-full h-px bg-zinc-800" />

      <form onSubmit={addNewEmailToInvite} className="p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
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
    </Modal>
  )
}