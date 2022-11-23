import { useCallback } from "react";

export const DeleteTask = (props:any) => {

  const {tasks,setTasks,index}=props;
  
  const onDelete=useCallback((index:number)=>{
    const newTasks=[...tasks];
    newTasks.splice(index,1);
    setTasks(newTasks);
  },[setTasks,tasks])
  
  return (
    <div>
      <button onClick={()=>onDelete(index)}>削除</button>
    </div>
  )
}