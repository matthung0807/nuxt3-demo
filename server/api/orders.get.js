export default defineEventHandler(async (event) => {
  const { status, country } = getQuery(event); // 取得查詢參數

  await new Promise((r) => setTimeout(r, 2000)); // 模擬延遲

  const orders = [
    { id: 10001, status: "pending", country: "US" },
    { id: 10002, status: "done", country: "JP" },
    { id: 10003, status: "pending", country: "CN" },
    { id: 10004, status: "done", country: "KR" },
    { id: 10005, status: "pending", country: "VN" },
    { id: 10006, status: "done", country: "US" },
    { id: 10007, status: "pending", country: "JP" },
  ];

  let result = orders;

  // 根據查詢參數篩選訂單
  if (status) {
    result = result.filter((o) => o.status === status);
  }

  if (country) {
    result = result.filter((o) => o.country === country);
  }
  return result;
});
