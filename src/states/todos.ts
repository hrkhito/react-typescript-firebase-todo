import { atom, selector } from "recoil";
import { todo } from "../types/todo"

export const Todos=atom<Array<todo>>({
  key: "Todos",
  default: [],
});

export const TodosLength=selector<number>({
  key: "TodosLength",
  get: ({get})=> {
    const TodosNumber: Array<todo>=get(Todos);
    return TodosNumber?.length || 0;
  }
})