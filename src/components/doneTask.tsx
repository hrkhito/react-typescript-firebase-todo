import { useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AllTodos } from "../states/allTodos";
import { DoneTodos } from "../states/doneTodos";
import { Todos } from "../states/todos";
import { todo } from "../types/todo";

// 完了タスク一覧ページ

export const DoneTask = (props:any) => {

  const allTasks=useRecoilValue<Array<todo>>(AllTodos);
  const setAllTasks=useSetRecoilState(AllTodos);

  const doneTasks=useRecoilValue<Array<todo>>(DoneTodos);
  const setDoneTasks=useSetRecoilState(DoneTodos);

  const tasks=useRecoilValue<Array<todo>>(Todos);
  const setTasks=useSetRecoilState(Todos);

  // 戻すボタン
  const onClickBack=useCallback((index:number,id:number,title:string,isAdmin:boolean)=>{
    isAdmin=false;

    // 全タスク一覧
    const currentAllTasks=[...allTasks]
    const newAllTasks=currentAllTasks.filter((currentAllTask)=>{
      return (
        currentAllTask.id!==id
      )
    })

    const okAllTasks=currentAllTasks.filter((currentAllTask)=>{
      return (
        currentAllTask.id===id
      )
    })

    const neoNewAllTasks=okAllTasks.map((newTask)=>{
      const newValue={
        id: id,
        title: title,
        isAdmin: isAdmin
      }

      return newValue
    })
    setAllTasks([...neoNewAllTasks,...newAllTasks].sort((a,b)=>a.id-b.id))
    
    // 未完了タスク一覧
    const newTasks=[...tasks,{id: id,title: title,isAdmin:isAdmin}].sort((a,b)=>a.id-b.id);
    setTasks(newTasks);

    // 完了タスク一覧
    const newDoneTasks=[...doneTasks];
    newDoneTasks.splice(index,1);
    setDoneTasks(newDoneTasks.sort((a,b)=>a.id-b.id));

  },[doneTasks,setDoneTasks,setTasks,tasks,allTasks,setAllTasks])

  // 削除ボタン
  const onClickDelete=useCallback((index:number,id:number)=>{

    // 全タスク一覧
    const currentAllTasks=[...allTasks];
    const newAllTasks=currentAllTasks.filter((currentAllTask)=>{
      return (
        currentAllTask.id!==id
      )
    })
    setAllTasks(newAllTasks.sort((a,b)=>a.id-b.id));

    // 完了タスク一覧
    const newDoneTasks=[...doneTasks];
    newDoneTasks.splice(index,1);
    setDoneTasks(newDoneTasks.sort((a,b)=>a.id-b.id));
  },[doneTasks,setDoneTasks,allTasks,setAllTasks])
  
  return (
    <ul>
      {doneTasks.map((task:todo,index:number)=>{
        return (
          <li key={task.id}>
            <p>{task.title}</p>
            <button onClick={()=>{onClickBack(index,task.id,task.title,task.isAdmin)}}>戻す</button>
            <button onClick={()=>{onClickDelete(index,task.id)}}>削除</button>
          </li>
        )
      })}
    </ul>
  )
}