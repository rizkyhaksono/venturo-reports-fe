import { Link } from 'react-router'
import { useState, useMemo } from 'react'
import { ChevronLeft, ChevronRight, Download, FileSpreadsheet, CalendarIcon } from 'lucide-react'
import BaseLayout from '@/components/layouts/base-layout'
import { useSales } from '@/services/sales/sales.service'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { format } from 'date-fns'
import type { DateRange } from 'react-day-picker'

const SalesPage = () => {
  const [expandedStores, setExpandedStores] = useState<Set<string>>(new Set())
  const [selectedStore, setSelectedStore] = useState<string>("all")
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>("all")
  const [dateRange, setDateRange] = useState<DateRange | undefined>()

  const toggleStore = (storeName: string) => {
    const newExpanded = new Set(expandedStores)
    if (newExpanded.has(storeName)) {
      newExpanded.delete(storeName)
    } else {
      newExpanded.add(storeName)
    }
    setExpandedStores(newExpanded)
  }

  const formatNumber = (num: number) => {
    return num.toLocaleString('id-ID')
  }

  const { data: salesDataFromAPI } = useSales()

  // Transform API data
  const transformedSalesData = useMemo(() => {
    if (!salesDataFromAPI) return []

    const storeMap = new Map<string, any>()

    salesDataFromAPI.forEach((item: any) => {
      const storeKey = item.store_id

      if (!storeMap.has(storeKey)) {
        storeMap.set(storeKey, {
          toko: item.store_name,
          items: [],
          totalQuantity: 0,
          totalPayments: {},
          grandTotal: 0
        })
      }

      const store = storeMap.get(storeKey)
      const itemTotal = Object.values(item.payments).reduce((sum: number, amount: any) => sum + amount, 0)

      store.items.push({
        name: item.item_name,
        quantity: item.total_qty,
        payments: item.payments,
        total: itemTotal
      })

      store.totalQuantity += item.total_qty
      store.grandTotal += itemTotal

      Object.entries(item.payments).forEach(([method, amount]: [string, any]) => {
        store.totalPayments[method] = (store.totalPayments[method] || 0) + amount
      })
    })

    return Array.from(storeMap.values())
  }, [salesDataFromAPI])

  // Get all unique payment methods
  const allPaymentMethods = useMemo(() => {
    const methods = new Set<string>()
    transformedSalesData.forEach(store => {
      Object.keys(store.totalPayments).forEach(method => methods.add(method))
    })
    return Array.from(methods)
  }, [transformedSalesData])

  return (
    <BaseLayout>
      <div className="container mx-auto max-w-7xl px-0 md:px-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="neutral" size="icon" asChild>
            <Link to="/" className="text-muted-foreground hover:text-foreground">
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
        <Card>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Date Range</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="neutral"
                      className="w-full justify-start text-left font-normal"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "LLL dd, y")} -{" "}
                            {format(dateRange.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(dateRange.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date range</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Store</label>
                <Select value={selectedStore} onValueChange={setSelectedStore}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Stores" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Stores</SelectItem>
                    {transformedSalesData.map(store => (
                      <SelectItem key={store.toko} value={store.toko}>
                        {store.toko}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Payment Method</label>
                <Select value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
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
                <Button className="flex-1">Apply Filters</Button>
                <Button
                  variant="neutral"
                  size="icon"
                  onClick={() => {
                    setDateRange(undefined)
                    setSelectedStore("all")
                    setSelectedPaymentMethod("all")
                  }}
                >
                  ✕
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Active Filters Display */}
        {(dateRange?.from || selectedStore !== "all" || selectedPaymentMethod !== "all") && (
          <Card>
            <CardContent className="py-3">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-medium">Active Filters:</span>
                {dateRange?.from && (
                  <Badge variant="neutral" className="gap-1">
                    Date: {format(dateRange.from, "MMM dd")}
                    {dateRange.to && ` - ${format(dateRange.to, "MMM dd")}`}
                    <button
                      onClick={() => setDateRange(undefined)}
                      className="ml-1 hover:text-destructive"
                    >
                      ✕
                    </button>
                  </Badge>
                )}
                {selectedStore !== "all" && (
                  <Badge variant="neutral" className="gap-1">
                    Store: {selectedStore}
                    <button
                      onClick={() => setSelectedStore("all")}
                      className="ml-1 hover:text-destructive"
                    >
                      ✕
                    </button>
                  </Badge>
                )}
                {selectedPaymentMethod !== "all" && (
                  <Badge variant="neutral" className="gap-1">
                    Payment: {selectedPaymentMethod}
                    <button
                      onClick={() => setSelectedPaymentMethod("all")}
                      className="ml-1 hover:text-destructive"
                    >
                      ✕
                    </button>
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Sales Table */}
        <Card className="p-0">
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Store
                  </TableHead>
                  <TableHead className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Item
                  </TableHead>
                  <TableHead className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Quantity
                  </TableHead>
                  <TableHead className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Payment Methods
                  </TableHead>
                  <TableHead className="text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    Total
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transformedSalesData.map((store, storeIndex) => {
                  const storeRows = []

                  // Store Header Row
                  storeRows.push(
                    <TableRow
                      key={`store-${storeIndex}`}
                      className="hover:bg-secondary-background/10 hover:text-white cursor-pointer transition-colors"
                      onClick={() => toggleStore(store.toko)}
                    >
                      <TableCell className="text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <ChevronRight
                            className={`w-4 h-4 transition-transform ${expandedStores.has(store.toko) ? 'rotate-90' : ''
                              }`}
                          />
                          {store.toko}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        All Items ({store.items.length} items)
                      </TableCell>
                      <TableCell className="text-sm">
                        {store.totalQuantity}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex flex-wrap gap-1 justify-start">
                          {Object.entries(store.totalPayments).map(([method, amount]) => (
                            <Badge key={method} variant="neutral" className="text-xs">
                              {method}: {formatNumber(amount as number)}
                            </Badge>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge className="text-main-foreground">
                          {formatNumber(store.grandTotal)}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  )

                  // Store Items Rows
                  if (expandedStores.has(store.toko)) {
                    store.items.forEach((item: any, itemIndex: number) => {
                      storeRows.push(
                        <TableRow
                          key={`item-${storeIndex}-${itemIndex}`}
                          className="hover:bg-secondary-background/10 hover:text-white transition-colors"
                        >
                          <TableCell></TableCell>
                          <TableCell className="text-sm pl-8">
                            {item.name}
                          </TableCell>
                          <TableCell className="text-sm">
                            {item.quantity}
                          </TableCell>
                          <TableCell className="text-center">
                            <div className="flex flex-wrap gap-1 justify-start">
                              {Object.entries(item.payments).map(([method, amount]) => (
                                <Badge key={method} variant="neutral" className="text-xs">
                                  {method}: {formatNumber(amount as number)}
                                </Badge>
                              ))}
                            </div>
                          </TableCell>
                          <TableCell className="text-center text-sm">
                            {formatNumber(item.total)}
                          </TableCell>
                        </TableRow>
                      )
                    })
                  }

                  return storeRows
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Export Actions */}
        <div className="flex flex-wrap gap-4 justify-between items-center">
          <div className="flex flex-wrap gap-3">
            <Button variant="neutral" className="gap-2">
              <FileSpreadsheet className="w-4 h-4" />
              Export to Excel
            </Button>
            <Button variant="neutral" className="gap-2">
              <Download className="w-4 h-4" />
              Export to PDF
            </Button>
          </div>
          <div className="text-sm text-muted-foreground">
            Total: {transformedSalesData.reduce((acc, store) => acc + store.items.length, 0)} items
            across {transformedSalesData.length} stores
          </div>
        </div>
      </div>
    </BaseLayout>
  )
}

export default SalesPage