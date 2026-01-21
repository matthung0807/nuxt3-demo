export const useAuth = () =>
  useState<boolean>('isLogin', () => false)