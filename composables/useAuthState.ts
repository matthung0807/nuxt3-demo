export const useAuthState = () =>
  useState<boolean>('isLogin', () => false)