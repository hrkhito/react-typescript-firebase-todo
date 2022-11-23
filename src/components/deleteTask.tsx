export const DeleteTask = (props:any) => {

  const {onDelete}=props 
  
  return (
    <div>
      <button onClick={onDelete}>削除</button>
    </div>
  )
}