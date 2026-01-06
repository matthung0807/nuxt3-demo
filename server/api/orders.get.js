export default defineEventHandler(async () => {
  await new Promise(resolve => setTimeout(resolve, 2000)) // 模擬網路延遲

  return [
    { id: 10001 },
    { id: 10002 },
    { id: 10003 },
  ]
})