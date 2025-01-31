import { Service } from "@/types"
import { Card } from "@/components/ui/card"

interface ServiceGridProps {
  services: Service[]
}

export function ServiceGrid({ services }: ServiceGridProps) {
  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {services.map((service) => (
        <Card key={service.id} className="p-4 text-center">
          <div className="mb-2">
            <img src={service.icon} alt={service.name} className="w-8 h-8 mx-auto" />
          </div>
          <div className="text-sm">{service.name}</div>
        </Card>
      ))}
    </div>
  )
} 