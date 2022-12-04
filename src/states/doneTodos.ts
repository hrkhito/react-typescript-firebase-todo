import { atom, selector } from "recoil";
import { todo } from "../types/todo"

export const DoneTodos=atom<Array<todo>>({
  key: "DoneTodos",
  default: [],
});

export const DoneTodosLength=selector<number>({
  key: "DoneTodosLength",
  get: ({get})=> {
    const DoneTodosNumber: Array<todo>=get(DoneTodos);
    return DoneTodosNumber?.length || 0;
  }
})