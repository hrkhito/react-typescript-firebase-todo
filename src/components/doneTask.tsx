import { useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AllTodos } from "../states/allTodos";
import { DoneTodos } from "../states/doneTodos";
import { Todos } from "../states/todos";
import { todo } from "../types/todo";

// 完了タスク一覧ページ

export const DoneTask = (props:any) => {

  const allTasks=useRecoilValue<Array<todo>>(AllTodos);
  const setAllTasks=useSetRecoilState(AllTodos);

  const doneTasks=useRecoilValue<Array<todo>>(DoneTodos);
  const setDoneTasks=useSetRecoilState(DoneTodos);

  const tasks=useRecoilValue<Array<todo>>(Todos);
  const setTasks=useSetRecoilState(Todos);

  const onClickBack=useCallback((index:number,id:number,title:string)=>{
    const newDoneTasks=[...doneTasks];
    newDoneTasks.splice(index,1);
    setDoneTasks(newDoneTasks);

    const newTasks=[...tasks,{id: id,title: title}];
    setTasks(newTasks);
  },[doneTasks,setDoneTasks,setTasks,tasks])

  const onClickDelete=useCallback((index:number,id:number)=>{

    const currentAllTasks=[...allTasks];
    const newAllTasks=currentAllTasks.filter((currentAllTask)=>{
      return (
        currentAllTask.id!==id
      )
    })
    setAllTasks(newAllTasks);

    const newDoneTasks=[...doneTasks];
    newDoneTasks.splice(index,1);
    setDoneTasks(newDoneTasks);
  },[doneTasks,setDoneTasks,allTasks,setAllTasks])
  
  return (
    <ul>
      {doneTasks.map((task:todo,index:number)=>{
        return (
          <li key={task.id}>
            <p>{task.title}</p>
            <button onClick={()=>{onClickBack(index,task.id,task.title)}}>戻す</button>
            <button onClick={()=>{onClickDelete(index,task.id)}}>削除</button>
          </li>
        )
      })}
    </ul>
  )
}