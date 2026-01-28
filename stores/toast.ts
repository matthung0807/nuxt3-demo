import { defineStore } from "pinia";
import type { ToastType, ToastItem } from "~/types/toast";

export const useToastStore = defineStore("toast", {
  state: () => ({
    toasts: [] as ToastItem[],
    id: 0,
  }),
  actions: {
    showToast(message: string, type: ToastType = 'success') {
        const toastId = this.id++
        this.toasts.push({ id: toastId, message, type })
    
        setTimeout(() => {
          this.toasts = this.toasts.filter(t => t.id !== toastId)
        }, 3000)
      }
  },
});
