import { FormEvent } from "react"
import { useParams } from "react-router-dom"

import { Button } from "../../components/button"
import { Input } from "../../components/input"
import { Modal } from "../../components/modal"
import { api } from "../../lib/axios"

interface LinkModalProps {
  variant: 'create' | 'edit'
  linkId?: string
  title?: string
  url?: string
  closeLinkModal: () => void
}

export function LinkModal({ variant, linkId, title, url, closeLinkModal, }: LinkModalProps) {
  const { tripId } = useParams() 

  async function createLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const title = data.get('title')?.toString()
    const url = data.get('url')?.toString()

    await api.post(`/trips/${tripId}/links`, {
      title,
      url,
    })

    window.document.location.reload()
  }

  async function updateLink(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const data = new FormData(event.currentTarget)

    const title = data.get('title')?.toString()
    const url = data.get('url')?.toString()

    await api.put(`/trips/${tripId}/links/${linkId}`, {
      title,
      url,
    })

    window.document.location.reload()
  }

  async function deleteLink() {
    await api.delete(`/trips/${tripId}/links/${linkId}`)

    window.document.location.reload()
  }

  return (
    <Modal
      title={variant === 'create' ? 'Cadastrar link': 'Editar link' }
      description="Todos convidados podem visualizar os links importantes."
      onClose={closeLinkModal}
    >
      <form 
        onSubmit={variant === 'create' ? createLink : updateLink}      
        className="space-y-3"
      >
        <Input
          icon="tag"
          name="title"
          placeholder="Título do link"
          defaultValue={title}
        />

        <Input
          icon="link-2"
          name="url"
          placeholder="URL"
          defaultValue={url}
        />

        <div className="flex gap-4">
          <Button type="submit" variant="primary" size="full">
            { variant === 'create' ? 'Salvar link' : 'Atualizar link' }
          </Button>

          { variant === 'edit' &&
            <Button type="button" onClick={deleteLink} variant="secondary" size="full">
              Excluir link
            </Button>
          }
        </div>
      </form>
    </Modal>
  )
}