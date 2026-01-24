import type { Order } from "~/shared/types/order";
import { orders } from "~/server/data/orders";

export default defineEventHandler(async (event) => {
  const body = await readBody<Omit<Order, 'id'>>(event);
  const newOrder: Order = {
    id: getNewId(),
    country: body.country,
    status: body.status,
  };
  orders.push(newOrder);

  return {
    success: true,
    order: newOrder,
  };
});

function getNewId(): number {
  return orders.length ? orders[orders.length - 1].id + 1 : 1;
}
