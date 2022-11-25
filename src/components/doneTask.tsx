import { useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { DoneTodos } from "../states/doneTodos";
import { Todos } from "../states/todos";
import { todo } from "../types/todo";

export const DoneTask = (props:any) => {

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

  const onClickDelete=useCallback((index:number)=>{
    const newDoneTasks=[...doneTasks];
    newDoneTasks.splice(index,1);
    setDoneTasks(newDoneTasks);
  },[doneTasks,setDoneTasks])
  
  return (
    <ul>
      {doneTasks.map((task:todo,index:number)=>{
        return (
          <li key={task.id}>
            <p>{task.title}</p>
            <button onClick={()=>{onClickBack(index,task.id,task.title)}}>戻す</button>
            <button onClick={()=>{onClickDelete(index)}}>削除</button>
          </li>
        )
      })}
    </ul>
  )
}