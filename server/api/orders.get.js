export default defineEventHandler(async(event) => {
  const { status } = getQuery(event) // 取得查詢參數

  await new Promise(r => setTimeout(r, 2000)) // 模擬延遲
  
  const orders = [
    { id: 10001, status: 'pending' },
    { id: 10002, status: 'done' },
    { id: 10003, status: 'pending' },
  ]

  // 根據查詢參數篩選訂單
  const filtered = status ? orders.filter(o => o.status === status) : orders
  return filtered
})