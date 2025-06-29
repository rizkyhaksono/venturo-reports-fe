import { useState } from 'react'
import { ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import type { TransformedStore } from '@/types/sales'

interface SalesTableProps {
  filteredSalesData: TransformedStore[]
}

export const SalesTable = ({ filteredSalesData }: SalesTableProps) => {
  const [expandedStores, setExpandedStores] = useState<Set<string>>(new Set())

  const toggleStore = (storeName: string): void => {
    const newExpanded = new Set(expandedStores)
    if (newExpanded.has(storeName)) {
      newExpanded.delete(storeName)
    } else {
      newExpanded.add(storeName)
    }
    setExpandedStores(newExpanded)
  }

  const formatNumber = (num: number): string => {
    return num.toLocaleString('id-ID')
  }

  return (
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
            {filteredSalesData.map((store, storeIndex) => {
              const storeRows = []

              // Store Header Row
              storeRows.push(
                <TableRow
                  key={`store-${store.id}-${storeIndex}`}
                  className="hover:bg-secondary-background/10 dark:hover:text-white cursor-pointer transition-colors"
                  onClick={() => toggleStore(store.name)}
                >
                  <TableCell className="text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <ChevronRight
                        className={`w-4 h-4 transition-transform ${expandedStores.has(store.name) ? 'rotate-90' : ''
                          }`}
                      />
                      {store.name}
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
                          {method}: {formatNumber(amount)}
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
              if (expandedStores.has(store.name)) {
                store.items.forEach((item, itemIndex) => {
                  storeRows.push(
                    <TableRow
                      key={`item-${item.id}-${storeIndex}-${itemIndex}`}
                      className="hover:bg-secondary-background/10 dark:hover:text-white transition-colors"
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
                              {method}: {formatNumber(amount)}
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
  )
}