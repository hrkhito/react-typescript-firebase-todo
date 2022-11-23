import React, { useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Todos } from '../states/todos'
import { todo } from '../types/todo';
import { DeleteTask } from './deleteTask';
import { EditTask } from './editTask';

export const AddedTask = () => {

  const [isAdmin,setIsAdmin]=useState(false);

  const tasks=useRecoilValue<Array<todo>>(Todos);
  const setTasks=useSetRecoilState(Todos); 
  
  return (
    <ul>
      {tasks.map((task:todo,index:number)=>{
        return (
          <div key={task.id}>
            <EditTask  
              title={task.title}
              isAdmin={isAdmin}
              setIsAdmin={setIsAdmin} 
            />
            <DeleteTask
              tasks={tasks}
              setTasks={setTasks}
              index={index}
            />
          </div>
        )
      })}
    </ul>
  )
}