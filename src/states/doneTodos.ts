import { atom } from "recoil";
import { todo } from "../types/todo"

export const DoneTodos=atom<Array<todo>>({
  key: "DoneTodos",
  default: [],
});