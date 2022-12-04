import {  useCallback, useState } from "react"
import { useRecoilValue } from "recoil";
import { AllTodos } from "../states/allTodos";
import { todo } from "../types/todo";
import { DoneTask } from "./doneTask";
import { EditAllTasks } from "./editAllTasks";
import { UndoneTask } from "./undoneTask";
import { Box,Button,Flex } from '@chakra-ui/react'

// タスク一覧、未完了一覧、完了一覧に切り替えるためのコンポーネント

export const ChangePage = (props:any) => {

  const allTasks=useRecoilValue<Array<todo>>(AllTodos);

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
  
  return (
    <Box width="100%">
      <Flex justify='center' width="100%" mb={4}>
        <Button mr={2} bg="purple.400" color="white" _hover={{opacity: 0.8}} onClick={onClickChangeAllTasks}>タスク一覧</Button>
        <Button mr={2} bg="purple.400" color="white" _hover={{opacity: 0.8}} onClick={onClickChangeUndone}>未完了のタスク一覧</Button>
        <Button bg="purple.400" color="white" _hover={{opacity: 0.8}} onClick={onClickChangeDone}>完了済のタスク一覧</Button>
      </Flex>
      <Flex width="100%" justify='center'>
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
    </Box>
  )
}