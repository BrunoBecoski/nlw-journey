import { Plus } from "lucide-react"
import { Button } from "../../components/button"
import { Link } from "../../components/link"

export function ImportantLinks() {
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Links importantes</h2>
      
      <div className="space-y-5">
        <Link
          title="Reservado AirBnB"
          url="https://www.airbnb.com.br/rooms/012346578901234567890123456789"
        />

        <Link
          title="Regras da Casa"
          url="https://www.notion.com/pages/012346578901234567890123456789"
        />
      </div>
      
      <Button variant="secondary" size="full">
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>
    </div>
  )
}