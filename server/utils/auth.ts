import type { PublicUser } from "~/shared/types/user";

export async function verifyUser(token: string): Promise<PublicUser | null> {
  try {
    // 呼叫後端API帶入token取得使用者資料
    const user = await $fetch<PublicUser>("/api/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return user;
  } catch (err) {
    return null;
  }
}
