import { ComponentProps } from "react"

import { Icon, IconName } from "./icon"

interface InputProps  extends ComponentProps<'input'> {
  icon: IconName
}

export function Input({ icon, ...props }: InputProps) {
  return (
    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
      <Icon name={icon} className="text-zinc-400 size-5" />
      <input 
        className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" 
        {...props}
      />
    </div>
  )
}