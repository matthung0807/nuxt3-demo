export type ToastType = 'success' | 'error'

export type ToastItem = {
  id: number;
  message: string;
  type: ToastType;
};
