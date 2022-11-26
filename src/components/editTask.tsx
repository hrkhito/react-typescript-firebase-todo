import { useCallback, useState } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil";
import { DoneTodos } from "../states/doneTodos";
import { Todos } from "../states/todos";
import { todo } from "../types/todo";

export const EditTask = (props:any) => {
  
  const { title,index,id }=props

  // 未完了エリア
  const tasks=useRecoilValue<Array<todo>>(Todos);
  const setTasks=useSetRecoilState<Array<todo>>(Todos);

  // 完了エリア
  const doneTasks=useRecoilValue<Array<todo>>(DoneTodos);
  const setDoneTasks=useSetRecoilState<Array<todo>>(DoneTodos);

  const [isAdmin,setIsAdmin]=useState(false);

  const [input,setInput]=useState(title)

  const onChange=useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
    setInput(e.target.value);
    setIsAdmin(true);
  },[])

  const onEditDone=useCallback(()=>{
    setIsAdmin(false);
  },[])

  const onTaskDone=useCallback((index:number,id:number)=>{
    const newTasks=[...tasks];
    newTasks.splice(index,1);
    setTasks(newTasks);

    setDoneTasks([...doneTasks,{id: id,title: title}]);
  },[doneTasks,setDoneTasks,setTasks,tasks,title])
  
  return (
    <div> 
      <input onChange={onChange} value={input} placeholder="入力して" />
      { isAdmin ? (
        <button onClick={onEditDone} disabled={input===""}>編集完了</button>
      ) : (
        <button onClick={()=>{onTaskDone(index,id)}}>タスク完了</button>
      )
      }
    </div>
  )
}