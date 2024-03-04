import { useState } from "react"
export default function Player({initialName,symbol,isActive,onChangeName}){
const [isEditing,setIsEditing] = useState(false)
const [PlayerName,setPlayerName] = useState(initialName)
  function handleChange(event){
  setPlayerName(event.target.value)
  console.log(PlayerName)
  if (isEditing) {
    onChangeName(symbol,PlayerName)

  }
}
  return(
  <li  className={ isActive  ? 'active' : undefined }>
    <span className="player">
      {isEditing === true ? 
      <input type="text" require value={PlayerName} onChange={handleChange}/> 
      : <span className="player-name">{PlayerName}</span>
      }
      <span className="player-symbol">{symbol}</span>
    </span>
      <button onClick={() => setIsEditing(!isEditing)}>{isEditing === false ? "Edit" : "Save"}</button>
   </li>
  )
}