import { atom } from "recoil";

export const inputTodo=atom<string>({
  key: "InputTodo",
  default: "",
});