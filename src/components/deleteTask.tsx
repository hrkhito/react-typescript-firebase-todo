import { useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AllTodos } from "../states/allTodos";

// 削除機能のコンポーネント

export const DeleteTask = (props:any) => {

  const {tasks,setTasks,index,id}=props;

  const allTasks=useRecoilValue(AllTodos);
  const setAllTasks=useSetRecoilState(AllTodos);
  
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
    <div>
      <button onClick={()=>onDelete(index,id)}>削除</button>
    </div>
  )
}