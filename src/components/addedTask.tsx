import React, { useCallback, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Todos } from '../states/todos'
import { todo } from '../types/todo';
import { DeleteTask } from './deleteTask';
import { EditTask } from './editTask';

export const AddedTask = () => {

  const [isAdmin,setIsAdmin]=useState(false);

  const tasks=useRecoilValue<Array<todo>>(Todos);
  const setTasks=useSetRecoilState(Todos); 

  const onDelete=useCallback((index:number)=>{
    const newTasks=[...tasks];
    newTasks.splice(index,1);
    setTasks(newTasks);
  },[setTasks,tasks])

  const onEdit=useCallback(()=>{
    setIsAdmin(!isAdmin);
  },[isAdmin])
  
  return (
    <ul>
      {tasks.map((task:todo,index:number)=>{
        return (
          <div key={task.id}>
            <EditTask 
              onEdit={onEdit} 
              title={task.title}
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin} 
            />
            <DeleteTask
              onDelete={()=>{onDelete(index)}}
            />
          </div>
        )
      })}
    </ul>
  )
}