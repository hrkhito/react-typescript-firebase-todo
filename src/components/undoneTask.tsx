import { useRecoilValue } from 'recoil'
import { Todos } from '../states/todos'
import { todo } from '../types/todo';
import { EditTask } from './editTask';

// 未完了タスク一覧ページ

export const UndoneTask = (props:any) => {

  const tasks=useRecoilValue<Array<todo>>(Todos);

  return (
    <ul>
      {tasks.map((task:todo,index:number)=>{
        return (
          <li key={task.id}>
            <EditTask
              index={index}
              id={task.id}
              title={task.title}
            />
          </li>
        )
      })}
    </ul>
  )
}