function OhmYearSlider({ year, onChange }) {
  return (
    <div className="absolute bottom-8 left-1/2 z-[1000] flex -translate-x-1/2 select-none items-center gap-3 rounded-xl border border-slate-700 bg-[#131929]/95 px-5 py-3 shadow-xl backdrop-blur-sm">
      <span className="text-base">🕰️</span>
      <input
        type="range"
        min={500}
        max={2025}
        step={1}
        value={year}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-[220px] cursor-pointer accent-blue-400"
        aria-label="Historical year filter"
      />
      <span className="min-w-[3.5rem] text-right font-mono text-lg font-bold text-blue-400">
        {year}
      </span>
    </div>
  )
}

export default OhmYearSlider
