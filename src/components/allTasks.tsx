import { memo, useCallback, useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AllTodos } from "../states/allTodos";
import { DoneTodos } from "../states/doneTodos";
import { Todos } from "../states/todos";
import { todo } from "../types/todo";

// タスク一覧ページ

export const AllTasks = memo((props:any) => {

  const [isAdmin,setIsAdmin]=useState(false);

  useEffect(()=>{

  },[])
  
  const allTasks=useRecoilValue(AllTodos);
  const setAllTasks=useSetRecoilState(AllTodos);

  const tasks=useRecoilValue<Array<todo>>(Todos);
  const setTasks=useSetRecoilState<Array<todo>>(Todos);

  const doneTasks=useRecoilValue<Array<todo>>(DoneTodos);
  const setDoneTasks=useSetRecoilState<Array<todo>>(DoneTodos);

  const onClickDone=useCallback((index:number,id:number,title:string)=>{
    const currentTasks=[...tasks];
    const newTasks=currentTasks.filter((currentTask)=>{
      return (
        currentTask.id!==id
      )
    })
    setTasks(newTasks.sort((a,b)=>a.id-b.id));

    setDoneTasks([...doneTasks,{id: id,title: title}].sort((a,b)=>a.id-b.id));

    setIsAdmin(true);
  },[doneTasks,setDoneTasks,setTasks,tasks])

  const onClickBack=useCallback((id:number,title:string)=>{
    setIsAdmin(false);

    const currentDoneTasks=[...tasks];
    const newDoneTasks=currentDoneTasks.filter((currentDoneTask)=>{
      return (
        currentDoneTask.id!==id
      )
    })
    setDoneTasks(newDoneTasks.sort((a,b)=>a.id-b.id));

    setTasks([...tasks,{id:id,title:title}].sort((a,b)=>a.id-b.id))

  },[setDoneTasks,tasks,setTasks])

  const onClickDelete=useCallback((index:number,id:number)=>{
    const newAllTasks=[...allTasks];
    newAllTasks.splice(index,1)
    setAllTasks(newAllTasks.sort((a,b)=>a.id-b.id));

    const currentTasks=[...tasks];
    const newTasks=currentTasks.filter((currentTask)=>{
      return (
        currentTask.id!==id
      )
    })
    setTasks(newTasks.sort((a,b)=>a.id-b.id));

    const currentDoneTasks=[...doneTasks];
    const newDoneTasks=currentDoneTasks.filter((currentDoneTask)=>{
      return (
        currentDoneTask.id!==id
      )
    })
    setDoneTasks(newDoneTasks.sort((a,b)=>a.id-b.id));
  },[allTasks,setAllTasks,setTasks,tasks,doneTasks,setDoneTasks])
  
  return (
    <div>
      <ul>
      {allTasks.map((allTask,index)=>{
        return (
          <li key={allTask.id}>
            <p>{allTask.title}</p>
            {isAdmin ? (
              <button onClick={()=>{onClickBack(allTask.id,allTask.title)}}>戻す</button>
            ) : (
              <button onClick={()=>{onClickDone(index,allTask.id,allTask.title)}}>完了</button>
            )}
            <button onClick={()=>{onClickDelete(index,allTask.id)}}>削除</button>
          </li>
        )
      })}
      </ul>
    </div>
  )
})