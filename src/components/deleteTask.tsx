import { useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AllTodos } from "../states/allTodos";

export const DeleteTask = (props:any) => {

  const {tasks,setTasks,index,id}=props;

  const allTasks=useRecoilValue(AllTodos);
  const setAllTasks=useSetRecoilState(AllTodos);
  
  const onDelete=useCallback((index:number,id:number)=>{

    const currentAllTasks=[...allTasks];
    const newAllTasks=currentAllTasks.filter((currentAllTask)=>{
      return (
        currentAllTask.id!==id
      )
    })
    setAllTasks(newAllTasks);

    const newTasks=[...tasks];
    newTasks.splice(index,1);
    setTasks(newTasks);
  },[setTasks,tasks,allTasks,setAllTasks])
  
  return (
    <div>
      <button onClick={()=>onDelete(index,id)}>削除</button>
    </div>
  )
}