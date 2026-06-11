function FilterGroup({ title, items, selected, onToggle, renderLabel, renderDot }) {
  return (
    <div className="pb-2">
      <p className="text-xs font-bold uppercase tracking-widest mb-4 pl-4" style={{ color: '#60a5fa' }}>
        {title}
      </p>
      <div className="space-y-2.5">
        {items.map((item) => {
          const active = selected.includes(item)
          return (
            <button
              key={item}
              onClick={() => onToggle(item)}
              className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all"
              style={{
                background: active ? '#2563eb33' : 'transparent',
                color: active ? '#60a5fa' : '#c8d0de',
                border: active ? '1.5px solid #2563eb66' : '1.5px solid transparent',
              }}
              onMouseEnter={(e) => {
                if (!active) {
                  e.currentTarget.style.background = '#1b2336'
                  e.currentTarget.style.borderColor = '#283448'
                }
              }}
              onMouseLeave={(e) => {
                if (!active) {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.borderColor = 'transparent'
                }
              }}
            >
              {renderDot && (
                <span className="size-3 rounded-full shrink-0" style={{ backgroundColor: renderDot(item) }} />
              )}
              <span>{renderLabel ? renderLabel(item) : item}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default FilterGroup