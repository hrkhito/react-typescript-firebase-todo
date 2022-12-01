import {  useCallback, useState } from "react"
import { useRecoilValue } from "recoil";
import { AllTodos } from "../states/allTodos";
import { todo } from "../types/todo";
import { DoneTask } from "./doneTask";
import { EditAllTasks } from "./editAllTasks";
import { UndoneTask } from "./undoneTask";

// タスク一覧、未完了一覧、完了一覧に切り替えるためのコンポーネント

export const ChangePage = (props:any) => {

  const allTasks=useRecoilValue<Array<todo>>(AllTodos);

  const [displayAllTasks,setDisplayAllTasks]=useState(true);
  const [displayUndone,setDisplayUndone]=useState(false);
  const [displayDone,setDisplayDone]=useState(false);

  const onClickChangeAllTasks=()=>{
    setDisplayUndone(false);
    setDisplayDone(false);
    setDisplayAllTasks(true);
  }

  const onClickChangeUndone=useCallback(()=>{
    setDisplayAllTasks(false);
    setDisplayDone(false);
    setDisplayUndone(true);
  },[])

  const onClickChangeDone=useCallback(()=>{
    setDisplayAllTasks(false);
    setDisplayUndone(false);
    setDisplayDone(true);
  },[])
  
  return (
    <div>
      <button onClick={onClickChangeAllTasks}>タスク一覧</button>
      <button onClick={onClickChangeUndone}>未完了のタスク一覧</button>
      <button onClick={onClickChangeDone}>完了済のタスク一覧</button>
      { displayAllTasks ? (
        <ul>
        {allTasks.map((allTask:todo,index:number)=>{
          return (
            <li key={allTask.id}>
              <EditAllTasks
                index={index}
                id={allTask.id}
                title={allTask.title}
                isAdmin={allTask.isAdmin}
              />
            </li>
          )
        })}
      </ul>
      ) : (
        displayUndone ? <UndoneTask /> : (
          displayDone && <DoneTask /> 
        )
      )}
    </div>
  )
}