import { Link2, Plus } from "lucide-react"

export function ImportantLinks() {
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>
      <div className="space-y-5">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">Reservado AirBnB</span>
            <a href="https://www.airbnb.com.br/rooms/012346578901234567890123456789" target="_blank" className="block text-xs text-zinc-400 truncate hover:text-zinc-200 hover:underline">
              https://www.airbnb.com.br/rooms/012346578901234567890123456789
            </a>
          </div>
          <Link2 className="text-zinc-400 size-5 shrink-0" />
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="block font-medium text-zinc-100">Regras da Casa</span>
            <a href="https://www.notion.com/pages/012346578901234567890123456789" target="_blank" className="block text-xs text-zinc-400 truncate hover:text-zinc-200 hover:underline">
              https://www.notion.com/pages/012346578901234567890123456789
            </a>
          </div>
          <Link2 className="text-zinc-400 size-5 shrink-0" />
        </div>
      </div>
      <button className=" w-full h-11 bg-zinc-800 text-zinc-200 rounded-lg px-5 font-medium flex items-center justify-center gap-2 hover:bg-zinc-700">
        <Plus className="size-5" />
        Cadastrar novo link
      </button>
    </div>
  )
}