import { ComponentProps, ReactNode } from "react"
import { tv, VariantProps } from "tailwind-variants"

import { Icon, IconName } from "./icon"

const buttonVariants = tv({
  base: 'rounded-lg px-5 font-medium flex items-center justify-center gap-2',
  
  variants: {
    variant: {
      primary: 'bg-lime-300 text-lime-950 hover:bg-lime-400',
      secondary: 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700',
      close: '',
    },

    size: {
      default: 'py-2',
      full: 'w-full h-11',
    },
  },

  defaultVariants: {
    variant: 'primary',
    size: 'default',
  }
})

interface ButtonProps extends ComponentProps<'button'>, VariantProps<typeof buttonVariants>{
  icon?: IconName,
  children?: ReactNode,
}

export function Button({ icon, variant, size, children, ...props }: ButtonProps) {

  if (variant === 'close') {
    return (
      <button  type="button" title="Fechar" {...props} >
        <Icon name="x" className="size-5 text-zinc-400 hover:text-zinc-50" />
      </button>
    )
  } 

  return (
    <button className={buttonVariants({ variant, size })} {...props}>
      {children}
      {icon && <Icon name={icon} className="size-5" /> }
    </button>
  )
}