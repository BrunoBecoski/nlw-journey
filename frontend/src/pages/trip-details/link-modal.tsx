import { FormEvent } from "react"
import { useParams } from "react-router-dom"

import { Button } from "../../components/button"
import { Input } from "../../components/input"
import { Modal } from "../../components/modal"
import { api } from "../../lib/axios"

interface LinkModalProps {
  variant: 'create' | 'edit'
  title?: string
  url?: string
  closeLinkModal: () => void
}

export function LinkModal({ variant, closeLinkModal, title, url }: LinkModalProps) {
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

  if (variant === 'edit') {
    return (
      <Modal
        title="Editar link"
        description="Todos convidados podem visualizar os links importantes."
        onClose={closeLinkModal}
      >
        <form onSubmit={() => {}} className="space-y-3">
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
    
            <Button variant="primary" size="full">
              Salvar link
            </Button>
            
            <Button variant="secondary" size="full">
              Excluir link
            </Button>
          </div>
        </form>
      </Modal>
    )
  }

  if (variant === 'create') {

    return (
      <Modal
        title="Cadastrar link"
        description="Todos convidados podem visualizar os links importantes."
        onClose={closeLinkModal}
      >
        <form onSubmit={createLink} className="space-y-3">
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
  
          <Button variant="primary" size="full">
            Salvar link
          </Button>
        </form>
      </Modal>
    )
  }
}