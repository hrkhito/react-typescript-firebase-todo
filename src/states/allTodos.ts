import { atom } from "recoil";
import { todo } from "../types/todo"

export const AllTodos=atom<Array<todo>>({
  key: "AllTodos",
  default: [],
});