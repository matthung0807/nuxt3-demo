import { orders } from "~/server/data/orders";

export default defineEventHandler(async (event) => {
  const { status, country, page = "1", pageSize = "5" } = getQuery(event); // 取得查詢參數

  await new Promise((r) => setTimeout(r, 2000)); // 模擬延遲

  let result = orders;

  // 根據查詢參數篩選訂單
  if (status) {
    result = result.filter((o) => o.status === status);
  }

  if (country) {
    result = result.filter((o) => o.country === country);
  }

  // 分頁
  const pageNum = parseInt(page as string, 10);
  const size = parseInt(pageSize as string, 10);

  const start = (pageNum - 1) * size;
  const pagedData = result.slice(start, start + size);

  // 計算總頁數
  const totalPages = Math.ceil((result.length || 0) / size);

  return {
    total: result.length,
    totalPages: totalPages,
    page: pageNum,
    pageSize: size,
    data: pagedData,
  };
});
