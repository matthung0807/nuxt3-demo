import { useUserStore } from "~/stores/user";
import { storeToRefs } from "pinia";

export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === "/login") return; // 登入頁面不用驗證

  const userStore = useUserStore();
  const { isLogin, role } = storeToRefs(userStore);

  // 檢查SSR路由登入驗證
  if (import.meta.server) {
    const token = useCookie("token").value;
    if (!token) {
      return navigateTo("/login");
    }
    
    // 同步前端登入狀態
    await userStore.restoreFromToken(token);
  }
  
  // 檢查SPA路由登入驗證
  if (import.meta.client) {
    if (!isLogin.value) {
      return navigateTo("/login");
    }
  }
  
  // 頁面definePageMeta沒定義requireAuth: true不用驗證
  if (!to.meta.requireAuth) return;
  // 檢查路由頁面可存取角色
  if (to.meta.roles) {
    const allowedRoles = to.meta.roles as string[];
    const r = role.value
    if (!r || !allowedRoles.includes(r)) {
      return navigateTo("/home");
    }
  }
});
