import React, { useCallback } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Todos } from '../states/todos'
import { todo } from '../types/todo';
import { Task } from './task';

export const AddedTask = () => {

  const tasks=useRecoilValue<Array<todo>>(Todos);
  const setTasks=useSetRecoilState(Todos); 

  const onDelete=useCallback((index:number)=>{
    const newTasks=[...tasks];
    newTasks.splice(index,1);
    setTasks(newTasks);
  },[setTasks,tasks])
  
  return (
    <ul>
      {tasks.map((task:todo,index:number)=>{
        return (
          <Task key={index} onDelete={()=>{onDelete(index)}} title={task.title} />
        )
      })}
    </ul>
  )
}