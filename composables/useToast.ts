import type { ToastType, ToastItem } from "~/types/toast"

const toasts = ref<ToastItem[]>([])
let id = 0

export function useToast() {
  
  function showToast(message: string, type: ToastType = 'success') {
    const toastId = id++
    toasts.value.push({ id: toastId, message, type })

    setTimeout(() => {
      toasts.value = toasts.value.filter(t => t.id !== toastId)
    }, 3000)
  }

  return {
    toasts,
    showToast,
  }
}