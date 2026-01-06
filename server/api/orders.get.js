export default defineEventHandler(() => {
  throw createError({
    statusCode: 500,
    message: '伺服器發生錯誤'
  })
})