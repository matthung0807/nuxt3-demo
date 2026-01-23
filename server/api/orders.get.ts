export default defineEventHandler(async (event) => {
  const { status, country, page = "1", pageSize = "5" } = getQuery(event); // 取得查詢參數

  await new Promise((r) => setTimeout(r, 2000)); // 模擬延遲

  const orders = [
    { id: 10001, status: "pending", country: "US" },
    { id: 10002, status: "done", country: "JP" },
    { id: 10003, status: "pending", country: "CN" },
    { id: 10004, status: "done", country: "KR" },
    { id: 10005, status: "pending", country: "VN" },
    { id: 10006, status: "done", country: "US" },
    { id: 10007, status: "pending", country: "JP" },
    { id: 10008, status: "done", country: "CN" },
    { id: 10009, status: "pending", country: "KR" },
    { id: 10010, status: "done", country: "VN" },
  ];

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
  const totalPages = Math.ceil((result.length || 0) / size)

   return {
    total: result.length,
    totalPages: totalPages,
    page: pageNum,
    pageSize: size,
    data: pagedData,
  };
});
