import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import type { TransformedStore, SalesFilters } from '@/types/sales'

interface SalesFiltersProps {
  filters: SalesFilters
  onFiltersChange: (filters: Partial<SalesFilters>) => void
  transformedSalesData: TransformedStore[]
  allPaymentMethods: string[]
  onApplyFilters: () => void
  onClearFilters: () => void
}

export const SalesFiltersComponent = ({
  filters,
  onFiltersChange,
  transformedSalesData,
  allPaymentMethods,
  onApplyFilters,
  onClearFilters
}: SalesFiltersProps) => {
  const { selectedStore, selectedPaymentMethod } = filters

  return (
    <Card>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

          <div className="space-y-2">
            <label htmlFor="store-select" className="text-sm font-medium">Store</label>
            <Select value={selectedStore} onValueChange={(value) => onFiltersChange({ selectedStore: value })}>
              <SelectTrigger>
                <SelectValue placeholder="All Stores" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Stores</SelectItem>
                {transformedSalesData.map(store => (
                  <SelectItem key={store.id} value={store.name}>
                    {store.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="payment-method-select" className="text-sm font-medium">Payment Method</label>
            <Select value={selectedPaymentMethod} onValueChange={(value) => onFiltersChange({ selectedPaymentMethod: value })}>
              <SelectTrigger>
                <SelectValue placeholder="All Methods" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Methods</SelectItem>
                {allPaymentMethods.map(method => (
                  <SelectItem key={method} value={method}>
                    {method}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-end gap-2">
            <Button className="flex-1" onClick={onApplyFilters}>
              Apply Filters
            </Button>
            <Button
              variant="neutral"
              size="icon"
              onClick={onClearFilters}
            >
              ✕
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}