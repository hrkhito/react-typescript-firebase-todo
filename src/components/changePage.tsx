import { useCallback, useState } from "react"
import { DoneTask } from "./doneTask";
import { UndoneTask } from "./undoneTask";


export const ChangePage = (props:any) => {

  const [displayUndone,setDisplayUndone]=useState(true);
  const [displayDone,setDisplayDone]=useState(false);

  const onClickChangeUndone=useCallback(()=>{
    setDisplayDone(false);
    setDisplayUndone(true);
  },[])

  const onClickChangeDone=useCallback(()=>{
    setDisplayUndone(false);
    setDisplayDone(true);
  },[])
  
  return (
    <div>
      <button onClick={onClickChangeUndone}>未完了のタスク</button>
      <button onClick={onClickChangeDone}>完了済のタスク</button>
      {
        displayUndone
        && 
        <UndoneTask />
      }
      {
        displayDone
        && 
        <DoneTask />
      }
    </div>
  )
}