import { useRecoilValue } from 'recoil'
import { Todos } from '../states/todos'
import { todo } from '../types/todo';
import { EditUndoneTask } from './editUndoneTask';
import { Flex,Box } from '@chakra-ui/react';

// 未完了タスク一覧ページ

export const UndoneTask = (props:any) => {

  const tasks=useRecoilValue<Array<todo>>(Todos);

  return (
    <Box>
      {tasks.map((task:todo,index:number)=>{
        return (
          <Flex key={task.id} align='center'>
            <EditUndoneTask
              index={index}
              id={task.id}
              title={task.title}
              isAdmin={task.isAdmin}
            />
          </Flex>
        )
      })}
    </Box>
  )
}