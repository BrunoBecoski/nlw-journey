import { Button } from "../../components/button"
import { Input } from "../../components/input"
import { Modal } from "../../components/modal"

interface CreateLinkModalProps {
  closeCreateLinkModal: () => void
}

export function CreateLinkModal({ closeCreateLinkModal }: CreateLinkModalProps) {
  return (
    <Modal
      title="Cadastrar link"
      description="Todos convidados podem visualizar os links importantes."
      onClose={closeCreateLinkModal}
    >
      <form className="space-y-3">
        <Input
          icon="tag"
          name="title"
          placeholder="Título do link"
        />

        <Input
          icon="link-2"
          name="url"
          placeholder="URL"
        />

        <Button variant="primary" size="full">
          Salvar link
        </Button>
      </form>
    </Modal>
  )
}