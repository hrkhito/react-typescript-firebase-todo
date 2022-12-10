import { useCallback } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AllTodos } from "../store/allTodos";
import { DoneTodos } from "../store/doneTodos";
import { Todos } from "../store/todos";
import { todo } from "../types/todo";
import { Input,Button,Flex,Box } from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';

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
    <Box>
      {doneTasks.map((task:todo,index:number)=>{
        return (
          <Flex mb={4} justify='center' align='center' width="100%" key={task.id}>
            <Input mr={2} value={task.title} disabled />
            <Button mr={2} onClick={()=>{onClickBack(index,task.id,task.title,task.isAdmin)}}>戻す</Button>
            <DeleteIcon mr={2} onClick={()=>{onClickDelete(index,task.id)}}>削除</DeleteIcon>
          </Flex>
        )
      })}
    </Box>
  )
}