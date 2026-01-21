import { users } from "~/server/data/users";
import type { PublicUser } from "~/shared/types/user";

export default defineEventHandler((event): PublicUser => {
  const authHeader = getHeader(event, "authorization");

  if (!authHeader) {
    throw createError({
      statusCode: 401,
      statusMessage: "Missing Authorization header",
    });
  }

  // Bearer fake-token-username
  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    throw createError({
      statusCode: 401,
      statusMessage: "Invalid Authorization format",
    });
  }

  const username = token.replace("fake-token-", "");

  const user = users.find((u) => u.username === username);

  if (!user) {
    throw createError({
      statusCode: 401,
      statusMessage: "User not found",
    });
  }

  return {
    username: user.username,
    name: user.name,
    role: user.role,
  };
});
