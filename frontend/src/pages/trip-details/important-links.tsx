import { Plus } from "lucide-react"
import { useState } from "react"

import { Button } from "../../components/button"
import { Link } from "../../components/link"
import { CreateLinkModal } from "./create-link-modal"

export function ImportantLinks() {
  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false)

  function openCreateLinkModal() {
    setIsCreateLinkModalOpen(true)
  }

  function closeCreateLinkModal() {
    setIsCreateLinkModalOpen(false)
  }

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>
      
      <div className="space-y-5">
        <Link
          title="Reservado AirBnB"
          url="https://www.airbnb.com.br/rooms/012346578901234567890123456789"
        />

        <Link
          title="Regras da Casa"
          url="https://www.notion.com/pages/012346578901234567890123456789"
        />
      </div>
      
      <Button variant="secondary" size="full" onClick={openCreateLinkModal}>
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>

      {isCreateLinkModalOpen && (
        <CreateLinkModal closeCreateLinkModal={closeCreateLinkModal} />
      )}
    </div>
  )
}