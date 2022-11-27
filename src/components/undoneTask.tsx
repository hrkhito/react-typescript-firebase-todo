import { useRecoilValue, useSetRecoilState } from 'recoil'
import { Todos } from '../states/todos'
import { todo } from '../types/todo';
import { DeleteTask } from './deleteTask';
// import { DeleteTask } from './deleteTask';
import { EditTask } from './editTask';

// 未完了タスク一覧ページ

export const UndoneTask = () => {

  const tasks=useRecoilValue<Array<todo>>(Todos);
  const setTasks=useSetRecoilState<Array<todo>>(Todos);
  
  return (
    <ul>
      {tasks.map((task:todo,index:number)=>{
        return (
          <li key={task.id}>
            <EditTask
              tasks={tasks}
              setTasks={setTasks}
              title={task.title}
              index={index}
              id={task.id}
            />
            <DeleteTask
              tasks={tasks}
              setTasks={setTasks}
              index={index}
              id={task.id}
            />
          </li>
        )
      })}
    </ul>
  )
}