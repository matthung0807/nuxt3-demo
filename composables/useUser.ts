import type { PublicUser } from "~/shared/types/user";

export const useUser = () => useState<PublicUser | null>("user", () => null);