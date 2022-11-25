import { useCallback, useState } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil";
import { DoneTodos } from "../states/doneTodos";
import { Todos } from "../states/todos";
import { todo } from "../types/todo";

export const EditTask = (props:any) => {
  
  const { title,index,id }=props

  const tasks=useRecoilValue<Array<todo>>(Todos);
  const setTasks=useSetRecoilState<Array<todo>>(Todos);

  const doneTasks=useRecoilValue<Array<todo>>(DoneTodos);
  const setDoneTasks=useSetRecoilState<Array<todo>>(DoneTodos);

  const [isAdmin,setIsAdmin]=useState(false);

  const [input,setInput]=useState(title)

  const onChange=useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
    setInput(e.target.value);
    setIsAdmin(true);
  },[])

  const onEditDone=()=>{
    setIsAdmin(false);
  }

  const onTaskDone=(index:number,id:number)=>{
    const newTasks=[...tasks];
    newTasks.splice(index,1);
    setTasks(newTasks);

    setDoneTasks([...doneTasks,{id: id,title: title}]);
  }
  
  return (
    <div> 
      <input onChange={onChange} value={input} />
      { isAdmin ? (
        <button onClick={onEditDone}>編集完了</button>
      ) : (
        // 別コンポーネント作成
        <button onClick={()=>{onTaskDone(index,id)}}>タスク完了</button>
      )
      }
    </div>
  )
}