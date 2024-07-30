import { ReactNode } from "react"
import { 
  Platform, 
  TextInput, 
  TextInputProps, 
  View, 
  ViewProps
} from "react-native"
import clsx from "clsx"

import { colors } from "@/styles/colors"

type Variants = 'primary' | 'secondary' | 'tertiary'

interface InputProps extends ViewProps{
  children: ReactNode
  variant?: Variants
}

function Input({ 
  children,
  className,
  variant = 'primary',
  ...props
}: InputProps) {
  return (
    <View
      className={clsx(
        'min-h-16 max-h-16 flex-row items-center gap-2',
        { 
          'h-14 px-4 rounded-lg border border-zinc-800': variant !== 'primary',
          'bg-zinc-950': variant === 'secondary',
          'bg-zinc-900': variant === 'tertiary',
        }, 
      className
    )}
      {...props}
    >
      {children}
    </View>
  )
}

function Field({ ...props }: TextInputProps) {
  return (
    <TextInput 
      className="flex-1 text-zinc-100 text-lg font-regular"
      placeholderTextColor={colors.zinc[400]}
      cursorColor={colors.zinc[100]}
      selectionColor={Platform.OS === "ios" ? colors.zinc[100] : undefined}
      {...props}
    />
  )
}

Input.Field = Field

export { Input }