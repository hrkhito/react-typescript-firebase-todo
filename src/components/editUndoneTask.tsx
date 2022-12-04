// 編集機能のコンポーネント

import { useCallback, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AllTodos } from "../states/allTodos";
import { DoneTodos } from "../states/doneTodos";
import { Todos } from "../states/todos";
import { todo } from "../types/todo";
import { Input,Button,Flex } from '@chakra-ui/react';
import { CheckIcon,DeleteIcon } from '@chakra-ui/icons';

export const EditUndoneTask = (props:any) => {
  
  const {index,title,id,isAdmin}=props

  const [Admin,setAdmin]=useState(false);

  const allTasks=useRecoilValue<Array<todo>>(AllTodos);
  const setAllTasks=useSetRecoilState<Array<todo>>(AllTodos);

  const tasks=useRecoilValue<Array<todo>>(Todos);
  const setTasks=useSetRecoilState<Array<todo>>(Todos);

  const doneTasks=useRecoilValue<Array<todo>>(DoneTodos);
  const setDoneTasks=useSetRecoilState<Array<todo>>(DoneTodos);

  // 編集ボタン
  const onChange=useCallback((e:React.ChangeEvent<HTMLInputElement>,id:number)=>{
    setAdmin(true)

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
        currentTask.id===id
      )
    })
    const okTasks=currentTasks.filter((currentTask)=>{
      return (
        currentTask.id!==id
      )
    })

    const neoNewTasks=newTasks.map((newTask)=>{
      const newValue={
        id: newTask.id,
        title: e.target.value,
        isAdmin: newTask.isAdmin
      }

      return newValue
    })
    setTasks([...okTasks,...neoNewTasks].sort((a,b)=>a.id-b.id))

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

  },[allTasks,setAllTasks,setTasks,tasks])

  const onEditDone=useCallback((id:number)=>{
    setAdmin(false);
  },[setAdmin])

  // 完了ボタン
  const onTaskDone=useCallback((index:number,id:number,title:string,isAdmin:boolean)=>{
    isAdmin=true;

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
        title: newTask.title,
        isAdmin: isAdmin
      }

      return newValue
    })
    setAllTasks([...newAllTasks,...neoNewAllTasks].sort((a,b)=>a.id-b.id))
    
    // 未完了タスク一覧
    const newTasks=[...tasks];
    newTasks.splice(index,1);
    setTasks(newTasks.sort((a,b)=>a.id-b.id));

    // 完了タスク一覧
    const newDoneTasks=[...doneTasks,{id: id,title: title,isAdmin: isAdmin}].sort((a,b)=>a.id-b.id)
    setDoneTasks(newDoneTasks);
  },[allTasks,setAllTasks,doneTasks,setDoneTasks,setTasks,tasks])

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
    <Flex justify='center' align='center' width="100%" mb={4}>
      <Input mr={2} onChange={(e)=>{onChange(e,id)}} value={title} placeholder="入力して" />
        { Admin ? (
        <Button mr={2} onClick={()=>{onEditDone(id)}} disabled={title===""}>編集完了</Button>
        ) : (
        <CheckIcon mr={2} onClick={()=>{onTaskDone(index,id,title,isAdmin)}}>タスク完了</CheckIcon>
        )
        }
      <DeleteIcon verticalAlign='bottom' onClick={()=>onDelete(index,id)}>削除</DeleteIcon>
    </Flex>
  )
}