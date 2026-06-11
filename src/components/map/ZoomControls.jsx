function ZoomControls({ onZoomIn, onZoomOut }) {
  return (
    <div
      className="flex flex-col gap-1.5 rounded-lg border border-white/10 bg-gray-900/90 px-2 py-1.5 shadow-lg backdrop-blur-sm"
      aria-label="Map zoom controls"
    >
      <button
        type="button"
        className="flex h-8 w-8 items-center justify-center rounded border border-blue-400/20 text-xl font-bold text-white transition-colors hover:border-blue-400/40 hover:bg-blue-400/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400/55"
        onClick={onZoomIn}
        title="Zoom in"
        aria-label="Zoom in"
      >
        +
      </button>
      <button
        type="button"
        className="flex h-8 w-8 items-center justify-center rounded border border-blue-400/20 text-xl font-bold text-white transition-colors hover:border-blue-400/40 hover:bg-blue-400/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-400/55"
        onClick={onZoomOut}
        title="Zoom out"
        aria-label="Zoom out"
      >
        -
      </button>
    </div>
  )
}

export default ZoomControls
