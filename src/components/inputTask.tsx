import React, { useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { AllTodos } from '../states/allTodos';
import { DoneTodos, DoneTodosLength } from '../states/doneTodos';
import { inputTodo } from '../states/inputTodo';
import { Todos, TodosLength } from '../states/todos';
import { todo } from '../types/todo';
import { Box,Input,Button,Flex,Text } from '@chakra-ui/react';

// todo追加用コンポーネント

let i:number=0;

const getKey=()=>{
  i++;
  return (
    i
  )
};

export const InputTask = () => {

  const InputTodoText=useRecoilValue(inputTodo);
  const setInputTodoText=useSetRecoilState(inputTodo);

  const setAllTasks=useSetRecoilState(AllTodos);

  const tasks=useRecoilValue(Todos);
  const setTasks=useSetRecoilState<Array<todo>>(Todos);

  const doneTasks=useRecoilValue<Array<todo>>(DoneTodos);

  const doneLength=useRecoilValue<number>(DoneTodosLength);
  const undoneLength=useRecoilValue<number>(TodosLength)

  const typingText=useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
    setInputTodoText(e.target.value);
  },[setInputTodoText]);

  const addText=useCallback(()=>{
    const id=getKey();

    setAllTasks([...tasks,...doneTasks,{id: id,title: InputTodoText,isAdmin: false}].sort((a,b)=>a.id-b.id));

    setTasks([...tasks,{id: id,title: InputTodoText,isAdmin: false}].sort((a,b)=>a.id-b.id));
    setInputTodoText("");
  },[InputTodoText, setInputTodoText, setTasks,tasks,setAllTasks,doneTasks])

  return (
    <Box mt={8} width="100%">
      <Box width="100%" mb={4}>
        <Flex justify='center'>
          <Input mr={4} width={240} type="text" placeholder="add task" onChange={typingText} value={InputTodoText}/>
          <Button bg="purple.400" color="white" _hover={{opacity: 0.8}}  onClick={addText} disabled={InputTodoText===""}>
            追加
          </Button>
        </Flex>
      </Box>
      <Box width="100%" mb={4}>
        <Flex justify='center'>
          <Text fontWeight="bold" mr={16}>Undone: {undoneLength}</Text>
          <Text fontWeight="bold">Done: {doneLength}</Text>
        </Flex>
      </Box>
    </Box>
  )
}
