import React from 'react'
import { cn } from '@/lib/utils'

interface MainProps extends React.HTMLAttributes<React.ElementRef<'main'>> {
  fixed?: boolean
}

export const Main = React.forwardRef<React.ElementRef<'main'>, MainProps>(
  (props, ref) => {
    return (
      <main ref={ref} className="flex flex-1 flex-col gap-4 p-4" {...props} />
    )
  }
)

Main.displayName = 'Main'