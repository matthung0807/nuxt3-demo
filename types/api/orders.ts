import type { Order } from "~/shared/types/order";
export interface OrdersResponse {
  data: Order[];
  total: number;
  totalPages: number;
  page: number;
  pageSize: number;
}

export interface CreateOrderResponse {
  success: boolean;
  order: Order;
}
