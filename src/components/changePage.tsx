import { useCallback, useState } from "react"
import { AllTasks } from "./allTasks";
import { DoneTask } from "./doneTask";
import { UndoneTask } from "./undoneTask";


export const ChangePage = (props:any) => {

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
      { displayAllTasks ? <AllTasks /> : (
        displayUndone ? <UndoneTask /> : (
          displayDone && <DoneTask /> 
        )
      )}
    </div>
  )
}