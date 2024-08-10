import { lazy, Suspense } from "react"
import dynamicIconImports from "lucide-react/dynamicIconImports"

export type IconName = keyof typeof dynamicIconImports

interface IconProps {
  name: IconName
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