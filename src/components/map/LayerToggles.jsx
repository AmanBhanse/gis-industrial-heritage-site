import { Switch } from '@/components/ui/switch'

function LayerToggles({ showHeritage, onHeritageToggle, showSculptures, onSculpturesToggle }) {
  return (
    <div className="aman flex shrink-0 flex-col gap-2 rounded-lg border border-white/10 bg-gray-900/90 p-4 shadow-lg backdrop-blur-sm justify-center">
      <label className="flex items-center justify-between gap-6 cursor-pointer select-none">
        <span className="text-xs font-medium text-white/80">Heritage site</span>
        <Switch
          checked={showHeritage}
          onCheckedChange={onHeritageToggle}
          aria-label="Toggle heritage site visibility"
        />
      </label>
      <div className="h-px bg-white/10" />
      <label className="flex items-center justify-between gap-6 cursor-pointer select-none">
        <span className="text-xs font-medium text-white/80">Public site</span>
        <Switch
          checked={showSculptures}
          onCheckedChange={onSculpturesToggle}
          aria-label="Toggle public site visibility"
        />
      </label>
    </div>
  )
}

export default LayerToggles
