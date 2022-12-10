import { atom } from "recoil";

export type User = {
  id: string;
  name: string | null;
  email: string | null;
};

export type AuthState = User | null;

export const authState = atom<AuthState>({
  key: "authState",
  default: null,
});