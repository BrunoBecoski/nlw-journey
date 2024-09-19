import { ComponentProps } from "react"

import { Icon } from "./icon"

interface GuestProps extends ComponentProps<'div'>{
  name: string | null
  email: string
  isConfirmed: boolean
  index: number
}

export function Guest({ name, email, isConfirmed, index, ...props }: GuestProps) {
  return (
    <div className="flex items-center justify-between gap-4" {...props}>
      <div className="space-y-1.5">
        <span className="block font-medium text-zinc-100">
          {name ?? `Convidado ${index}`}
        </span>

        <span className="block text-sm text-zinc-400 truncate">
          {email}
        </span>
      </div>
      {isConfirmed ? (
        <Icon 
          name="circle-check"
          className="text-lime-400 size-5"
        />
      ) : (
        <Icon 
          name="circle-dashed"
          className="text-zinc-400 size-5 shrink-0"
        />
      )}
    </div>
  )
}