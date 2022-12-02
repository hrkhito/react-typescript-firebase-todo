import { useRecoilValue } from 'recoil'
import { Todos } from '../states/todos'
import { todo } from '../types/todo';
import { DeleteTask } from './deleteTask';
import { EditUndoneTask } from './editUndoneTask';

// 未完了タスク一覧ページ

export const UndoneTask = (props:any) => {

  const tasks=useRecoilValue<Array<todo>>(Todos);

  return (
    <ul>
      {tasks.map((task:todo,index:number)=>{
        return (
          <li key={task.id}>
            <EditUndoneTask
              index={index}
              id={task.id}
              title={task.title}
              isAdmin={task.isAdmin}
            />
            <DeleteTask
              index={index}
              id={task.id}
            />
          </li>
        )
      })}
    </ul>
  )
}