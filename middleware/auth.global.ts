export default defineNuxtRouteMiddleware((to) => {
  if (to.path === "/login") return; // 登入頁面不用驗證

  if (import.meta.server) {
    const token = useCookie("token").value;
    if (!token) {
      return navigateTo("/login");
    }
  }
});
