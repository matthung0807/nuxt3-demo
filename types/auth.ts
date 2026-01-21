import type { PublicUser } from "~/shared/types/user";

export interface LoginResponse {
  success: boolean;
  token?: string;
  user?: PublicUser;
}
