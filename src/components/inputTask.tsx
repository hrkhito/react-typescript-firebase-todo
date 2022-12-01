import React, { useCallback } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { AllTodos } from '../states/allTodos';
import { DoneTodos, DoneTodosLength } from '../states/doneTodos';
import { inputTodo } from '../states/inputTodo'
import { Todos, TodosLength } from '../states/todos'
import { todo } from '../types/todo';

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
    <div>
      <input type="text" placeholder="add task" onChange={typingText} value={InputTodoText}/>
      <button onClick={addText} disabled={InputTodoText===""}>追加</button>
      <p>undone: {undoneLength}</p>
      <p>done: {doneLength}</p>
    </div>
  )
}
