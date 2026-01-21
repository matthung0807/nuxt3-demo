import { verifyUser } from "~/server/utils/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === "/login") return; // 登入頁面不用驗證

  const isLogin = useAuth();
  const userState = useUser();

  // 檢查SSR路由登入驗證
  if (import.meta.server) {
    const token = useCookie("token").value;
    if (!token) {
      return navigateTo("/login");
    }

    // 同步前端登入狀態
    isLogin.value = true;
    userState.value = await verifyUser(token);
  }

  // 檢查SPA路由登入驗證
  if (import.meta.client) {
    if (!isLogin.value) {
      return navigateTo("/login");
    }
  }

  if (to.path === "/home/member" && userState.value?.role !== "admin") {
    return navigateTo("/home");
  }
});
