import { format } from "date-fns"
import { ComponentProps } from "react"

import { Icon } from "./icon"

interface ActivityProps extends ComponentProps<'div'> {
  title: string
  occursAt: string
}

export function Activity({ title, occursAt, ...props }: ActivityProps) {
  return (
    <div className="space-y-2" {...props}>
      <div className="px-4 py-2.5 bg-zinc-900 rounded-xl shadow-shape flex items-center gap-3">
        <Icon name="circle-check" className="size-5 text-lime-300" />
        <span className="text-zinc-100">{title}</span>
        <span className="text-zinc-400 text-sm ml-auto">
          {format(occursAt, 'HH:MM')}h
        </span>
      </div>
    </div>
  )
}