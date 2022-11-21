import React, { useCallback } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { inputTodo } from '../states/inputTodo'
import { Todos } from '../states/todos'
import { todo } from '../types/todo';

const getKey=()=>{
  Math.random().toString(32).substring(2);
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
      <input type="text" onChange={typingText} value={InputTodoText}/>
      <button onClick={addText}>追加</button>
    </div>
  )
}
