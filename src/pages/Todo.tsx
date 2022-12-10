import {  useCallback, useState } from "react"
import { useRecoilValue, useSetRecoilState } from "recoil";
import { AllTodos } from "../store/allTodos";
import { todo } from "../types/todo";
import { DoneTask } from "../components/doneTask";
import { EditAllTasks } from "../components/editAllTasks";
import { UndoneTask } from "../components/undoneTask";
import { Box,Button,Flex } from '@chakra-ui/react'
import { InputTask } from "../components/inputTask";
import { signOut } from "firebase/auth";
import { fireauth } from "../firebase";
import { authState } from "../store/AuthState";

// タスク一覧、未完了一覧、完了一覧に切り替えるためのコンポーネント

export const TodoPage = (props:any) => {

  const allTasks=useRecoilValue<Array<todo>>(AllTodos);

  const setAuth=useSetRecoilState(authState);

  const [displayAllTasks,setDisplayAllTasks]=useState(true);
  const [displayUndone,setDisplayUndone]=useState(false);
  const [displayDone,setDisplayDone]=useState(false);

  const onClickChangeAllTasks=()=>{
    setDisplayUndone(false);
    setDisplayDone(false);
    setDisplayAllTasks(true);
  }

  const onClickChangeUndone=useCallback(()=>{
    setDisplayAllTasks(false);
    setDisplayDone(false);
    setDisplayUndone(true);
  },[])

  const onClickChangeDone=useCallback(()=>{
    setDisplayAllTasks(false);
    setDisplayUndone(false);
    setDisplayDone(true);
  },[])

  // ログイン画面にリダイレクトする
  const onClickLogout= async () => {
    try {
      await signOut(fireauth);
      setAuth(null);
    } catch {
      alert("err");
    }
  }
  
  return (
    <Box width="100%">
      <InputTask />
      <Flex justify='center' width="100%" mb={4}>
        <Button mr={2} bg="purple.400" color="white" _hover={{opacity: 0.8}} onClick={onClickChangeAllTasks}>タスク一覧</Button>
        <Button mr={2} bg="purple.400" color="white" _hover={{opacity: 0.8}} onClick={onClickChangeUndone}>未完了のタスク一覧</Button>
        <Button bg="purple.400" color="white" _hover={{opacity: 0.8}} onClick={onClickChangeDone}>完了済のタスク一覧</Button>
      </Flex>
      <Flex width="100%" justify='center' mb={4}>
        { displayAllTasks ? (
          <ul>
          {allTasks.map((allTask:todo,index:number)=>{
            return (
              <li key={allTask.id}>
                <EditAllTasks
                  index={index}
                  id={allTask.id}
                  title={allTask.title}
                  isAdmin={allTask.isAdmin}
                />
              </li>
            )
          })}
        </ul>
        ) : (
          displayUndone ? <UndoneTask /> : (
            displayDone && <DoneTask />
          )
        )}
      </Flex>
      <Flex width="100%" justify='center'>
        <Button onClick={onClickLogout}>ログアウト</Button>
      </Flex>
    </Box>
  )
}