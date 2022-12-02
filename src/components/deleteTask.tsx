import { useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AllTodos } from "../states/allTodos";
import { Todos } from "../states/todos";

// 削除機能のコンポーネント

export const DeleteTask = (props:any) => {

  const {index,id}=props;

  const allTasks=useRecoilValue(AllTodos);
  const setAllTasks=useSetRecoilState(AllTodos);

  const tasks=useRecoilValue(Todos);
  const setTasks=useSetRecoilState(Todos);
  
  // 削除ボタン
  const onDelete=useCallback((index:number,id:number)=>{

    // 全タスク一覧
    const currentAllTasks=[...allTasks];
    const newAllTasks=currentAllTasks.filter((currentAllTask)=>{
      return (
        currentAllTask.id!==id
      )
    })
    setAllTasks(newAllTasks.sort((a,b)=>a.id-b.id));

    // 未完了タスク一覧
    const newTasks=[...tasks];
    newTasks.splice(index,1);
    setTasks(newTasks.sort((a,b)=>a.id-b.id));
  },[setTasks,tasks,allTasks,setAllTasks])
  
  return (
    <button onClick={()=>onDelete(index,id)}>削除</button>
  )
}