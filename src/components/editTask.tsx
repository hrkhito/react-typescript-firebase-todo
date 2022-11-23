import { useCallback, useState } from "react"

export const EditTask = (props:any) => {

  const {isAdmin,setIsAdmin,title}=props

  const [input,setInput]=useState(title)

  const onChange=useCallback((e:React.ChangeEvent<HTMLInputElement>)=>{
    setInput(e.target.value);
  },[])

  const onDone=()=>{
    setIsAdmin(!isAdmin);
  }

  const onEdit=()=>{
    setIsAdmin(!isAdmin);
  }
  
  return (
    <div>
      {isAdmin ? (
        <div>
          <input onChange={onChange} value={input} />
          <button onClick={onDone}>完了</button>
        </div>
      ) : (
        <div>
          <li>{input}</li>
          <button onClick={onEdit}>編集</button>
        </div>
      )}
    </div>
  )
}