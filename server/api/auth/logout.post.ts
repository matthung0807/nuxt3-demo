export default defineEventHandler((event) => {
  // 清除 token cookie
  setCookie(event, 'token', '', {
    httpOnly: true,
    maxAge: 0,
  })

  return { success: true }
})