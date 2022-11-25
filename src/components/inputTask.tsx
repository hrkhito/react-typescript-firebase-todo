import React, { useCallback } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { inputTodo } from '../states/inputTodo'
import { Todos } from '../states/todos'
import { todo } from '../types/todo';

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

  const tasks=useRecoilValue<any>(Todos);
  const setTasks=useSetRecoilState<Array<todo>>(Todos);

  const typingText=useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
    setInputTodoText(e.target.value);
  },[setInputTodoText]);

  const addText=useCallback(()=>{
    setTasks([...tasks,{id: getKey(),title: InputTodoText}]);
    setInputTodoText("");
  },[InputTodoText, setInputTodoText, setTasks,tasks])

  return (
    <div>
      <input type="text" placeholder="add task" onChange={typingText} value={InputTodoText}/>
      <button onClick={addText} disabled={InputTodoText===""}>追加</button>
    </div>
  )
}
