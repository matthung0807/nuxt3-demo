import { defineStore } from "pinia";
import type { PublicUser } from "~/shared/types/user";
import type { LoginResponse } from "~/types/auth";
import { verifyUser } from "~/server/utils/auth";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as PublicUser | null,
    isLogin: false,
  }),
  getters: {
    role: (state) => state.user?.role,
  },
  actions: {
    async login(username: string, password: string) {
      try {
        const { success, token, user } = await $fetch<LoginResponse>(
          "/api/auth/login",
          {
            method: "POST",
            body: { username, password },
          },
        );
        if (success && token && user) {
          this.isLogin = true;
          this.user = user;
          return true;
        } else {
          alert("帳號或密碼錯誤");
          return false;
        }
      } catch (err) {
        alert("登入失敗，請稍後再試");
        return false;
      }
    },
    async logout() {
      await $fetch("/api/auth/logout", { method: "POST" });
      this.isLogin = false;
      this.user = null;
      return true;
    },
    async restoreFromToken(token: string) {
      this.user = await verifyUser(token);
      this.isLogin = true;
    },
  },
});
