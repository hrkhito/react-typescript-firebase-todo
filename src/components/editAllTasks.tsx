// 編集機能のコンポーネント

import { memo, useCallback, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AllTodos } from "../states/allTodos";
import { DoneTodos } from "../states/doneTodos";
import { Todos } from "../states/todos";
import { todo } from "../types/todo";

export const EditAllTasks = memo((props:any) => {

  const {index,id,title,isAdmin}=props;

  const [editIsAdmin,setEditIsAdmin]=useState(false);
  
  const allTasks=useRecoilValue<Array<todo>>(AllTodos);
  const setAllTasks=useSetRecoilState<Array<todo>>(AllTodos);

  const tasks=useRecoilValue<Array<todo>>(Todos);
  const setTasks=useSetRecoilState<Array<todo>>(Todos);

  const doneTasks=useRecoilValue<Array<todo>>(DoneTodos);
  const setDoneTasks=useSetRecoilState<Array<todo>>(DoneTodos);

  // 完了ボタン
  const onClickDone=useCallback((index:number,id:number,title:string,isAdmin:boolean)=>{
    isAdmin=true;

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
        title: newTask.title,
        isAdmin: isAdmin
      }

      return newValue
    })
    setAllTasks([...neoNewAllTasks,...newAllTasks].sort((a,b)=>a.id-b.id))

    // 未完了のタスク一覧
    const currentTasks=[...tasks];
    const newTasks=currentTasks.filter((currentTask)=>{
      return (
        currentTask.id!==id
      )
    })
    setTasks(newTasks.sort((a,b)=>a.id-b.id));

    // 完了のタスク一覧
    const newDoneTasks=[...doneTasks,{id: id,title: title,isAdmin:isAdmin}].sort((a,b)=>a.id-b.id);
    setDoneTasks(newDoneTasks);
  },[doneTasks,setDoneTasks,setTasks,tasks,allTasks,setAllTasks])

  // 戻すボタン
  const onClickBack=useCallback((id:number,title:string,isAdmin:boolean)=>{
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
        id: newTask.id,
        title: newTask.title,
        isAdmin: isAdmin
      }

      return newValue
    })
    setAllTasks([...neoNewAllTasks,...newAllTasks].sort((a,b)=>a.id-b.id))

    // 未完了のタスク一覧
    const newTasks=[...tasks,{id: id,title: title,isAdmin:isAdmin}].sort((a,b)=>a.id-b.id);
    setTasks(newTasks);

    // 完了のタスク一覧
    const currentDoneTasks=[...doneTasks];
    const newDoneTasks=currentDoneTasks.filter((currentDoneTask)=>{
      return (
        currentDoneTask.id!==id
      )
    })
    setDoneTasks(newDoneTasks.sort((a,b)=>a.id-b.id));

  },[setDoneTasks,tasks,setTasks,allTasks,setAllTasks,doneTasks])

  // 削除ボタン
  const onClickDelete=useCallback((index:number,id:number)=>{
    const newAllTasks=[...allTasks];
    newAllTasks.splice(index,1)
    setAllTasks(newAllTasks.sort((a,b)=>a.id-b.id));

    const currentTasks=[...tasks];
    const newTasks=currentTasks.filter((currentTask)=>{
      return (
        currentTask.id!==id
      )
    })
    setTasks(newTasks.sort((a,b)=>a.id-b.id));

    const currentDoneTasks=[...doneTasks];
    const newDoneTasks=currentDoneTasks.filter((currentDoneTask)=>{
      return (
        currentDoneTask.id!==id
      )
    })
    setDoneTasks(newDoneTasks.sort((a,b)=>a.id-b.id));
  },[allTasks,setAllTasks,setTasks,tasks,doneTasks,setDoneTasks])

  // 編集ボタン
  const onChange=useCallback((e:React.ChangeEvent<HTMLInputElement>,id:number)=>{
    setEditIsAdmin(true);

    // 全タスク一覧
    const currentAllTasks=[...allTasks];
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
        id: newTask.id,
        title: e.target.value,
        isAdmin: newTask.isAdmin
      }

      return newValue
    })
    setAllTasks([...newAllTasks,...neoNewAllTasks].sort((a,b)=>a.id-b.id))

    // 未完了タスク一覧
    const currentTasks=[...tasks];
    const newTasks=currentTasks.filter((currentTask)=>{
      return (
        currentTask.id!==id
      )
    })
    const okTasks=currentTasks.filter((currentTask)=>{
      return (
        currentTask.id===id
      )
    })

    const neoNewTasks=okTasks.map((newTask)=>{
      const newValue={
        id: newTask.id,
        title: e.target.value,
        isAdmin: newTask.isAdmin
      }

      return newValue
    })
    setTasks([...newTasks,...neoNewTasks].sort((a,b)=>a.id-b.id))

    // 完了タスク一覧
    const currentDoneTasks=[...tasks];
    const newDoneTasks=currentDoneTasks.filter((currentDoneTask)=>{
      return (
        currentDoneTask.id!==id
      )
    })
    const okDoneTasks=currentTasks.filter((currentTask)=>{
      return (
        currentTask.id===id
      )
    })

    const neoNewDoneTasks=okDoneTasks.map((newTask)=>{
      const newValue={
        id: newTask.id,
        title: e.target.value,
        isAdmin: newTask.isAdmin
      }

      return newValue
    })
    setTasks([...newDoneTasks,...neoNewDoneTasks].sort((a,b)=>a.id-b.id))

  },[allTasks,setAllTasks,tasks,setTasks])

  // 編集完了ボタン
  const onEditDone=useCallback((id:number)=>{
    setEditIsAdmin(false);
  },[setEditIsAdmin])
  
  return (
    <div>
      <input disabled={isAdmin} value={title} onChange={(e)=>{onChange(e,id)}} placeholder="入力して" />
        { editIsAdmin ? (
          <button onClick={()=>{onEditDone(id)}} disabled={title===""}>編集完了</button>
          ) : (
            isAdmin ? (
              <button onClick={()=>{onClickBack(id,title,isAdmin)}}>戻す</button>
            ) : (
              <button onClick={()=>{onClickDone(index,id,title,isAdmin)}}>完了</button>
            )
          )
        }
        <button onClick={()=>{onClickDelete(index,id)}}>削除</button>
    </div>
  )
})