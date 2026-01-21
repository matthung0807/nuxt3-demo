import { users } from "~/server/data/users";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { username, password } = body;

  // 依帳號密碼尋找使用者
  const user = users.find(
    (u) => u.username === username && u.password === password,
  );

  if (!user) {
    return {
      success: false,
    };
  }

  // 模擬token
  const token = `fake-token-${username}`;
  setCookie(event, "token", token, {
    httpOnly: true,
    maxAge: 60 * 60 * 24, // 1 天
  });

  return {
    success: true,
    token,
    user: {
      username: user.username,
      name: user.name,
      role: user.role,
    },
  };
});
