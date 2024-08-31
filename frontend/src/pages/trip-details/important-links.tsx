import { Plus } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { Button } from "../../components/button"
import { Link } from "../../components/link"
import { api } from "../../lib/axios"
import { LinkModal } from "./link-modal"

interface Link {
  id: string
  title: string
  url: string
}

export function ImportantLinks() {
  const { tripId } = useParams()
  const [links, setLinks] = useState<Link[]>([])
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false)

  function openLinkModal() {
    setIsLinkModalOpen(true)
  }

  function closeLinkModal() {
    setIsLinkModalOpen(false)
  }

  useEffect(() => {
    api.get(`/trips/${tripId}/links`).then(response => setLinks(response.data.links))
  }, [tripId])

  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>
      
      <div className="space-y-5">
        {links.map(link => {
          return (
            <Link
              id={link.id}
              key={link.id}
              title={link.title}
              url={link.url}
            />
          )
        })}
      </div>
      
      <Button variant="secondary" size="full" onClick={openLinkModal}>
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>

      {isLinkModalOpen && (
        <LinkModal variant="create" closeLinkModal={closeLinkModal} />
      )}
    </div>
  )
}