export interface SalesData {
  toko: string
  items: Array<{
    name: string
    quantity: number
    payments: {
      qris?: number
      transfer?: number
    }
    customers: {
      customer3?: number
      customer4?: number
      customer5?: number
    }
    total: number
  }>
  totalQuantity: number
  totalPayments: {
    qris: number
    transfer: number
  }
  totalCustomers: {
    customer3: number
    customer4: number
    customer5: number
  }
  grandTotal: number
}