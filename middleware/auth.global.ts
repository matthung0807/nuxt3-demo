import { verifyUser } from "~/server/utils/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === "/login") return; // 登入頁面不用驗證

  // 頁面definePageMeta沒定義requireAuth: true不用驗證
  if (!to.meta.requireAuth) return;

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

  // 檢查路由頁面可存取角色
  if (to.meta.roles && userState.value) {
    const allowedRoles = to.meta.roles as string[];

    if (!allowedRoles.includes(userState.value?.role)) {
      return navigateTo("/home");
    }
  }
});
