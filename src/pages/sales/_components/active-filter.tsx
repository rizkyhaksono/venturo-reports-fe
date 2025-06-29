import { XIcon } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { SalesFilters } from '@/types/sales'

interface ActiveFiltersProps {
  filters: SalesFilters
  onFiltersChange: (filters: Partial<SalesFilters>) => void
}

export const ActiveFilters = ({ filters, onFiltersChange }: ActiveFiltersProps) => {
  const { selectedStore, selectedPaymentMethod } = filters

  const hasActiveFilters = selectedStore !== "all" || selectedPaymentMethod !== "all"

  if (!hasActiveFilters) return null

  return (
    <Card>
      <CardContent className="py-3">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm font-medium">Active Filters:</span>
          {selectedStore !== "all" && (
            <Badge variant="neutral" className="gap-1">
              Store: {selectedStore}
              <button
                onClick={() => onFiltersChange({ selectedStore: "all" })}
                className="ml-1 hover:text-destructive"
              >
                <XIcon className='size-4' />
              </button>
            </Badge>
          )}
          {selectedPaymentMethod !== "all" && (
            <Badge variant="neutral" className="gap-1">
              Payment: {selectedPaymentMethod}
              <button
                onClick={() => onFiltersChange({ selectedPaymentMethod: "all" })}
                className="ml-1 hover:text-destructive"
              >
                <XIcon className='size-4' />
              </button>
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  )
}