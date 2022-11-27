import { useCallback, useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { DoneTodos } from '../states/doneTodos';
import { Todos } from '../states/todos'
import { todo } from '../types/todo';

// 未完了タスク一覧ページ

export const UndoneTask = () => {

  const [isAdmin,setIsAdmin]=useState(false);

  const tasks=useRecoilValue<Array<todo>>(Todos);
  const setTasks=useSetRecoilState<Array<todo>>(Todos);

  const doneTasks=useRecoilValue<Array<todo>>(DoneTodos);
  const setDoneTasks=useSetRecoilState<Array<todo>>(DoneTodos);

  const onChange=useCallback((e:React.ChangeEvent<HTMLInputElement>,id:number)=>{
    setIsAdmin(true);
    const newTasks:any=tasks.map((newTask)=>{
      
      if(newTask.id===id){
        const newValue={
          title: e.target.value,
          id: id
        }

        return (
          newValue
        )
      }

      return (
        tasks
      )
    })
    setTasks(newTasks)
  },[setTasks,tasks])

  const onEditDone=useCallback((id:number)=>{
    setIsAdmin(false);
  },[])

  const onTaskDone=useCallback((index:number,id:number,title:string)=>{
    const newTasks=[...tasks];
    newTasks.splice(index,1);
    setTasks(newTasks.sort((a,b)=>a.id-b.id));

    setDoneTasks([...doneTasks,{id: id,title: title}].sort((a,b)=>a.id-b.id));
  },[doneTasks,setDoneTasks,setTasks,tasks])
  
  return (
    <ul>
      {tasks.map((task:todo,index:number)=>{
        return (
          <li key={task.id}>
            <input onChange={(e)=>{onChange(e,task.id)}} value={task.title} placeholder="入力して" />
            { isAdmin ? (
            <button onClick={()=>{onEditDone(task.id)}} disabled={task.title===""}>編集完了</button>
            ) : (
            <button onClick={()=>{onTaskDone(index,task.id,task.title)}}>タスク完了</button>
            )
            }
          </li>
        )
      })}
    </ul>
  )
}