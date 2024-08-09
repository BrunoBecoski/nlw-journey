import { ComponentProps } from "react"

interface InputProps  extends ComponentProps<'input'> {}

export function Input({ children, ...props }: InputProps) {
  return (
    <div className="h-14 px-4 bg-zinc-950 border border-zinc-800 rounded-lg flex items-center gap-2">
      {children}
      <input 
        className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1" 
        {...props}
      />
    </div>
  )
}