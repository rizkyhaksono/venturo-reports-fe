import { useMemo } from 'react'
import { useSales } from '@/services/sales/sales.service'
import type { SalesItemData, TransformedStore, TransformedItem, PaymentMethods, SalesFilters } from '@/types/sales'

export const useSalesData = () => {
  const { data: salesData } = useSales()

  const transformedSalesData = useMemo((): TransformedStore[] => {
    if (!salesData) return []

    const storeMap = new Map<string, TransformedStore>()

    salesData.forEach((item: SalesItemData) => {
      const storeKey = item.store_id

      if (!storeMap.has(storeKey)) {
        storeMap.set(storeKey, {
          id: item.store_id,
          name: item.store_name,
          items: [],
          totalQuantity: 0,
          totalPayments: {},
          grandTotal: 0
        })
      }

      const store = storeMap.get(storeKey)!
      const itemTotal = Object.values(item.payments).reduce((sum: number, amount: number) => sum + amount, 0)

      const transformedItem: TransformedItem = {
        id: item.item_id,
        name: item.item_name,
        quantity: item.total_qty,
        payments: item.payments,
        total: itemTotal
      }

      store.items.push(transformedItem)
      store.totalQuantity += item.total_qty
      store.grandTotal += itemTotal

      Object.entries(item.payments).forEach(([method, amount]: [string, number]) => {
        store.totalPayments[method] = (store.totalPayments[method] ?? 0) + amount
      })
    })

    return Array.from(storeMap.values())
  }, [salesData])

  const allPaymentMethods = useMemo((): string[] => {
    const methods = new Set<string>()
    transformedSalesData.forEach(store => {
      Object.keys(store.totalPayments).forEach(method => methods.add(method))
    })
    return Array.from(methods)
  }, [transformedSalesData])

  return {
    transformedSalesData,
    allPaymentMethods,
    isLoading: !salesData
  }
}

export const useFilteredSalesData = (transformedSalesData: TransformedStore[], filters: SalesFilters) => {
  const { selectedStore, selectedPaymentMethod } = filters

  const filteredSalesData = useMemo((): TransformedStore[] => {
    return transformedSalesData.filter(store => {
      if (selectedStore !== "all" && store.name !== selectedStore) {
        return false
      }
      return true
    }).map(store => {
      if (selectedPaymentMethod === "all") {
        return store
      }

      const filteredItems = store.items.filter(item =>
        Object.keys(item.payments).includes(selectedPaymentMethod)
      )

      const filteredTotalQuantity = filteredItems.reduce((sum, item) => sum + item.quantity, 0)
      const filteredGrandTotal = filteredItems.reduce((sum, item) => sum + item.total, 0)

      const filteredTotalPayments: PaymentMethods = {}
      filteredItems.forEach(item => {
        Object.entries(item.payments).forEach(([method, amount]) => filteredTotalPayments[method] = (filteredTotalPayments[method] ?? 0) + amount)
      })

      return {
        ...store,
        items: filteredItems,
        totalQuantity: filteredTotalQuantity,
        totalPayments: filteredTotalPayments,
        grandTotal: filteredGrandTotal
      }
    }).filter(store => store.items.length > 0)
  }, [transformedSalesData, selectedStore, selectedPaymentMethod])

  const totalItems = useMemo((): number =>
    filteredSalesData.reduce((acc, store) => acc + store.items.length, 0)
    , [filteredSalesData])

  const totalStores = filteredSalesData.length

  return {
    filteredSalesData,
    totalItems,
    totalStores
  }
}