export default defineEventHandler(() => {
  throw createError({
    statusCode: 500,
    statusMessage: '伺服器發生錯誤'
  })
})