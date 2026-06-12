import * as React from 'react'
import * as TogglePrimitive from '@radix-ui/react-toggle'

import { cn } from '@/lib/utils'

function Toggle({ className, ...props }) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(
        'inline-flex h-5 w-10 items-center rounded-full border border-transparent transition-colors',
        'bg-slate-300 text-transparent data-[state=on]:bg-slate-900',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1',
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className={cn(
          'h-4 w-4 rounded-full bg-white transition-transform duration-150 ease-out',
          'translate-x-0.5 data-[state=on]:translate-x-5',
        )}
      />
    </TogglePrimitive.Root>
  )
}

export { Toggle }
