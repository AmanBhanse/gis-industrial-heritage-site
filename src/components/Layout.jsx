import { useState, useCallback } from 'react'
import { PanelLeftIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

function Layout({ header, sidebar, children }) {
  const [open, setOpen] = useState(true)

  const handleTransitionEnd = useCallback(() => {
    window.dispatchEvent(new Event('resize'))
  }, [])

  return (
    <div className="flex flex-col h-screen w-full overflow-hidden">
      {/* Header */}
      <header className="flex items-center gap-2 px-4 h-12 shrink-0 bg-[#1a2332] shadow-md z-50">
        <button
          onClick={() => setOpen((o) => !o)}
          className="inline-flex items-center justify-center rounded-md p-1.5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          aria-label="Toggle sidebar"
        >
          <PanelLeftIcon className="size-5" />
        </button>
        <div className="h-5 w-px bg-white/20" />
        {header}
      </header>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          onTransitionEnd={handleTransitionEnd}
          className={cn(
            'shrink-0 bg-white border-r border-gray-200 shadow-sm overflow-hidden transition-[width] duration-200 ease-in-out flex flex-col',
            open ? 'w-[340px]' : 'w-0'
          )}
        >
          <div className="w-[340px] flex flex-col flex-1 min-h-0 overflow-hidden">
            {sidebar}
          </div>
        </aside>

        {/* Map */}
        <main className="flex-1 min-w-0 relative">
          {children}
        </main>
      </div>
    </div>
  )
}

export default Layout
