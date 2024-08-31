import { ComponentProps, useState } from "react"

import { LinkModal } from "../pages/trip-details/link-modal"
import { Button } from "./button"
import { Icon } from "./icon"

interface LinkProps extends ComponentProps<'div'> {
  id: string
  title: string
  url: string
}

export function Link({ id, title, url ,...props }: LinkProps) {
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false)

  function openLinkModal() {
    setIsLinkModalOpen(true)
  }

  function closeLinkModal() {
    setIsLinkModalOpen(false)
  }

  return (
    <div className="flex items-center justify-between gap-4" {...props}>
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <Button title="Editar" variant="icon" icon="pen" iconSize="sm" onClick={openLinkModal} />

          <span className="font-medium text-zinc-100">
            {title}
          </span>
        </div>
      
        <a 
          href={url}
          target="_blank"
          className="block text-xs text-zinc-400 truncate hover:text-zinc-200 hover:underline"
        >
          {url}
        </a>
      </div>

      <Icon 
        name="link-2"
        className="text-zinc-400 size-5 shrink-0"
      />

      {isLinkModalOpen && (
        <LinkModal 
          variant="edit"
          linkId={id}
          title={title}
          url={url}
          closeLinkModal={closeLinkModal}
        />
      )}
    </div>
  )
}