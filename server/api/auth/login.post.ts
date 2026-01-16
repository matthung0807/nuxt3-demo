export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password } = body;

  // 模擬驗證並返回token
  if (username === "admin" && password === "1234") {
    const token = "fake-jwt-token";

    setCookie(event, "token", token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24, // 1 天
    });
    return {
      success: true,
      token: token,
    };
  }

  return {
    success: false,
  };
});
