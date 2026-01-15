export default defineNuxtRouteMiddleware((to, from) => {
  const orderId = to.params.orderId;
    
  // 如果不是數字，就導回[出口業務]頁面
  if (!/^\d+$/.test(String(orderId))) {
    return navigateTo("/home/export");
  }
});
