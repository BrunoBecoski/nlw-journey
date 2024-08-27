import { Button } from "./button"
import { Icon } from "./icon"

interface LinkProps {
  title: string
  url: string
}

export function Link({ title, url }: LinkProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="space-y-1.5">
        <div className="flex items-center gap-2">
          <Button title="Editar" variant="icon" icon="pen" iconSize="sm" />

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
    </div>
  )
}