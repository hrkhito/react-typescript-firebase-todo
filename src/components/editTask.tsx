// 編集機能のコンポーネント

import { useCallback, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { DoneTodos } from "../states/doneTodos";
import { Todos } from "../states/todos";
import { todo } from "../types/todo";

export const EditTask = (props:any) => {
  
  const {index,title,id}=props

  const [isAdmin,setIsAdmin]=useState(false);

  const tasks=useRecoilValue<Array<todo>>(Todos);
  const setTasks=useSetRecoilState<Array<todo>>(Todos);

  const doneTasks=useRecoilValue<Array<todo>>(DoneTodos);
  const setDoneTasks=useSetRecoilState<Array<todo>>(DoneTodos);

  const onChange=useCallback((e:React.ChangeEvent<HTMLInputElement>,id:number)=>{
    setIsAdmin(true)

    const currentTasks=[...tasks];
    const newTasks=currentTasks.filter((currentTask)=>{
      return (
        currentTask.id===id
      )
    })
    const okTasks=currentTasks.filter((currentTask)=>{
      return (
        currentTask.id!==id
      )
    })

    const neoNewTasks=newTasks.map((newTask)=>{
      const newValue={
        id: newTask.id,
        title: e.target.value
      }

      return newValue
    })
    setTasks([...okTasks,...neoNewTasks].sort((a,b)=>a.id-b.id))
  },[setTasks,tasks])

  const onEditDone=useCallback((id:number)=>{
    setIsAdmin(false);
  },[setIsAdmin])

  const onTaskDone=useCallback((index:number,id:number,title:string)=>{
    const newTasks=[...tasks];
    newTasks.splice(index,1);
    setTasks(newTasks.sort((a,b)=>a.id-b.id));

    setDoneTasks([...doneTasks,{id: id,title: title}].sort((a,b)=>a.id-b.id));
  },[doneTasks,setDoneTasks,setTasks,tasks])
  
  return (
    <div>
      <input onChange={(e)=>{onChange(e,id)}} value={title} placeholder="入力して" />
        { isAdmin ? (
        <button onClick={()=>{onEditDone(id)}} disabled={title===""}>編集完了</button>
        ) : (
        <button onClick={()=>{onTaskDone(index,id,title)}}>タスク完了</button>
        )
        }
    </div>
  )
}