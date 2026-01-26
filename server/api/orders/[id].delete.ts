import { orders } from "~/server/data/orders";

export default defineEventHandler((event) => {
  const id = Number(event.context.params?.id);

  const order = orders.find((o) => o.id === id);

  if (!order) {
    return {
      success: false,
      message: "找不到訂單",
    };
  }

  if (order.status === "done") {
    return {
      success: false,
      message: "已完成訂單無法刪除",
    };
  }

  orders.splice(orders.indexOf(order), 1);

  return {
    success: true,
  };
});
