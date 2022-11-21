import { atom } from "recoil";
import { todo } from "../types/todo"

export const Todos=atom<Array<todo>>({
  key: "Todos",
  default: [],
});