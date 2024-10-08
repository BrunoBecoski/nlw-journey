import { format } from "date-fns"
import { ComponentProps, useState } from "react"

import { ActivityModal } from "../pages/trip-details/activity-modal"
import { Button } from "./button"
import { Icon } from "./icon"

interface ActivityProps extends ComponentProps<'div'> {
  title: string
  startsAt: string
  endsAt: string
  occursAt: string
  activityId: string
}

export function Activity({ title, startsAt, endsAt, occursAt, activityId, ...props }: ActivityProps) {
  const [isActivityModalOpen, setIsActivityModalOpen ] = useState(false)

  function openActivityModal() {
    setIsActivityModalOpen(true)
  }

  function closeActivityModal() {
    setIsActivityModalOpen(false)
  }

  return (
    <div className="space-y-2" {...props}>
      <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
        <Icon name="circle-check" className="size-5 text-lime-300" />

        <span className="text-zinc-100">{title}</span>
        
        <span className="text-zinc-400 text-sm ml-auto">
          {format(occursAt, 'HH:mm')}h
        </span>

        <Button title="Editar" variant="icon" icon="pen" iconSize="sm" onClick={openActivityModal} />
      </div>

      { isActivityModalOpen && 
        <ActivityModal
          title={title}
          variant="edit"
          startsAt={startsAt}
          endsAt={endsAt}
          occursAt={occursAt}
          closeActivityModal={closeActivityModal}
          activityId={activityId}
        />
      }
    </div>
  )
}