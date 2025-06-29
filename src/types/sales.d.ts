export interface PaymentMethods {
  [key: string]: number
}

export interface SalesItemData {
  store_id: string
  store_name: string
  item_id: string
  item_name: string
  total_qty: number
  payments: PaymentMethods
}

export interface TransformedItem {
  id: string
  name: string
  quantity: number
  payments: PaymentMethods
  total: number
}

export interface TransformedStore {
  id: string
  name: string
  items: TransformedItem[]
  totalQuantity: number
  totalPayments: PaymentMethods
  grandTotal: number
}

export interface SalesFilters {
  dateRange?: { from?: Date; to?: Date }
  selectedStore: string
  selectedPaymentMethod: string
}