export const Task = (props:any) => {

  const {onDelete,title}=props 
  
  return (
    <div>
      <li>{title}</li>
      <button onClick={()=>{onDelete()}}>削除</button>
    </div>
  )
}