export interface Order {
  id: number
  status: string
  country: string
}

export interface OrdersResponse {
  data: Order[]
  total: number
  totalPages: number
  page: number
  pageSize: number
}