import { ComponentProps } from "react"
import { tv, VariantProps } from "tailwind-variants"

import { Icon, IconName } from "./icon"

const inputVariants = tv({
  base: 'h-14 px-4 rounded-lg flex items-center gap-2 flex-1',

  variants: {
    variant: {
      primary: 'bg-zinc-950 border border-zinc-800',
      secondary: '',
      },
    },

  defaultVariants: {
    variant: 'primary',
  },
})

interface InputProps extends ComponentProps<'input'>, VariantProps<typeof inputVariants> {
  icon: IconName
}

export function Input({ icon, variant, ...props }: InputProps) {

  return (
    <div className={inputVariants({variant})}>
      <Icon name={icon} className="text-zinc-400 size-5" />
      <input
        type="text"
        className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" 
        {...props}
      />
    </div>
  )
}