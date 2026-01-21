export default defineNuxtRouteMiddleware((to) => {
  if (to.path === "/login") return; // 登入頁面不用驗證

  const isLogin = useAuth()

  // 檢查SSR路由登入驗證
  if (import.meta.server) {
    const token = useCookie("token").value;
    if (!token) {
      return navigateTo("/login");
    }
    isLogin.value = true; // 同步前端登入狀態
  }

  // 檢查SPA路由登入驗證
  if (import.meta.client) {
    if (!isLogin.value) {
      return navigateTo("/login");
    }
  }
});
