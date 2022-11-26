import React, { useCallback } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { AllTodos } from '../states/allTodos';
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

  const allTasks=useRecoilValue(AllTodos);
  const setAllTasks=useSetRecoilState(AllTodos);

  const tasks=useRecoilValue(Todos);
  const setTasks=useSetRecoilState<Array<todo>>(Todos);

  const typingText=useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
    setInputTodoText(e.target.value);
  },[setInputTodoText]);

  const addText=useCallback(()=>{
    const id=getKey();

    setAllTasks([...allTasks,{id: id,title: InputTodoText}].sort((a,b)=>a.id-b.id));

    setTasks([...tasks,{id: id,title: InputTodoText}].sort((a,b)=>a.id-b.id));
    setInputTodoText("");
  },[InputTodoText, setInputTodoText, setTasks,tasks,allTasks,setAllTasks])

  return (
    <div>
      <input type="text" placeholder="add task" onChange={typingText} value={InputTodoText}/>
      <button onClick={addText} disabled={InputTodoText===""}>追加</button>
    </div>
  )
}
