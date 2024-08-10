import { lazy, Suspense } from "react"
import dynamicIconImports from "lucide-react/dynamicIconImports"

export type Name = keyof typeof dynamicIconImports

interface IconProps {
  name: Name
  className?: string
}

export const Icon = ({ name, className }: IconProps) => {
  const LucideIcon = lazy(dynamicIconImports[name])

  return(
    <Suspense>
      <LucideIcon className={className} />
    </Suspense>
  )
}  