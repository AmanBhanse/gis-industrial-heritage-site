function Sidebar({ children }) {
  return (
    <div className="flex h-full min-h-0 w-full flex-col overflow-hidden [&>*]:shrink-0 [&>*:last-child]:min-h-0 [&>*:last-child]:flex-1 [&>*:last-child]:overflow-y-auto [&>*:last-child::-webkit-scrollbar]:w-[5px] [&>*:last-child::-webkit-scrollbar-track]:bg-transparent [&>*:last-child::-webkit-scrollbar-thumb]:rounded-[3px] [&>*:last-child::-webkit-scrollbar-thumb]:bg-[#ccc] hover:[&>*:last-child::-webkit-scrollbar-thumb]:bg-[#999]">
      {children}
    </div>
  )
}

export default Sidebar
