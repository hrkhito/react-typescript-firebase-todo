import { memo } from "react";
import { useRecoilValue } from "recoil";
import { AllTodos } from "../states/allTodos";
import { todo } from "../types/todo";
import { EditAllTasks } from "./editAllTasks";

// タスク一覧ページ

export const AllTasks = memo((props:any) => {

  const {isAdmin,setIsAdmin}=props;

  const allTasks=useRecoilValue<Array<todo>>(AllTodos);
  
  return (
    <ul>
      {allTasks.map((allTask:todo,index:number)=>{
        return (
          <li key={allTask.id}>
            <EditAllTasks
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin}
              index={index}
              id={allTask.id}
              title={allTask.title}
            />
          </li>
        )
      })}
    </ul>
  )
})