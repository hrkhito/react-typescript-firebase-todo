import { useCallback, useState } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil";
import { DoneTodos } from "../states/doneTodos";
import { todo } from "../types/todo";

// 編集機能のコンポーネント

export const EditTask = (props:any) => {
  
  const { title,index,id,tasks,setTasks }=props

  const doneTasks=useRecoilValue<Array<todo>>(DoneTodos);
  const setDoneTasks=useSetRecoilState<Array<todo>>(DoneTodos);

  const [isAdmin,setIsAdmin]=useState(false);

  const [input,setInput]=useState(title)

  const onChange=useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
    setInput(e.target.value);
    setIsAdmin(true);
  },[])

  const onEditDone=useCallback((id:number)=>{
    setIsAdmin(false);
    const newTasks:todo[]=tasks.map((newTask:todo)=>{
      
      if(newTask.id===id){
        const newValue:todo={
          title:input,
          id: id
        }

        return (
          newValue
        )
      }

      return (
        tasks
      )
    })
    setTasks(newTasks)
  },[input,tasks,setTasks])

  const onTaskDone=useCallback((index:number,id:number)=>{
    const newTasks=[...tasks];
    newTasks.splice(index,1);
    setTasks(newTasks.sort((a,b)=>a.id-b.id));

    setDoneTasks([...doneTasks,{id: id,title: title}].sort((a,b)=>a.id-b.id));
  },[doneTasks,setDoneTasks,setTasks,tasks,title])
  
  return (
    <div> 
      <input onChange={onChange} value={input} placeholder="入力して" />
      { isAdmin ? (
        <button onClick={()=>{onEditDone(id)}} disabled={input===""}>編集完了</button>
      ) : (
        <button onClick={()=>{onTaskDone(index,id)}}>タスク完了</button>
      )
      }
    </div>
  )
}