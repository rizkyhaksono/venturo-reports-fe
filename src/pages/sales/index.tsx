import { Link } from 'react-router'
import { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import BaseLayout from '@/components/layouts/base-layout'
import { Button } from '@/components/ui/button'
import { useSalesData, useFilteredSalesData } from '@/hooks/use-sales'
import { SalesFiltersComponent } from './_components/sales-filter'
import { ActiveFilters } from './_components/active-filter'
import { SalesTable } from './_components/sales-table'
import { SalesExport } from './_components/sales-export'
import type { SalesFilters } from '@/types/sales'

const SalesPage = () => {
  const [filters, setFilters] = useState<SalesFilters>({
    selectedStore: "all",
    selectedPaymentMethod: "all"
  })

  const { transformedSalesData, allPaymentMethods } = useSalesData()
  const { filteredSalesData, totalItems, totalStores } = useFilteredSalesData(transformedSalesData, filters)

  const handleFiltersChange = (newFilters: Partial<SalesFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const handleApplyFilters = (): void => {
    console.log('Filters applied:', filters)
  }

  const handleClearFilters = (): void => {
    setFilters({
      selectedStore: "all",
      selectedPaymentMethod: "all"
    })
  }

  return (
    <BaseLayout>
      <div className="container mx-auto max-w-7xl px-0 md:px-6 space-y-6 py-16 md:py-24">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="neutral" size="icon" asChild>
            <Link to="/">
              <ChevronLeft className="w-5 h-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-2xl md:text-3xl font-bold">Sales Reports</h1>
            <p className="text-sm text-muted-foreground">
              Detailed sales breakdown by store, items, and payment methods
            </p>
          </div>
        </div>

        {/* Filters */}
        <SalesFiltersComponent
          filters={filters}
          onFiltersChange={handleFiltersChange}
          transformedSalesData={transformedSalesData}
          allPaymentMethods={allPaymentMethods}
          onApplyFilters={handleApplyFilters}
          onClearFilters={handleClearFilters}
        />

        {/* Active Filters Display */}
        <ActiveFilters
          filters={filters}
          onFiltersChange={handleFiltersChange}
        />

        {/* Sales Table */}
        <SalesTable filteredSalesData={filteredSalesData} />

        {/* Export Actions */}
        <SalesExport totalItems={totalItems} totalStores={totalStores} />
      </div>
    </BaseLayout>
  )
}

export default SalesPage