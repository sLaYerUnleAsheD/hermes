import React, {useEffect, useState} from 'react'
import buggy from "../images/buggy.png"
import { db } from '../firebase'
import { doc, onSnapshot } from 'firebase/firestore'

const User = ({currUser, user, selectUser, chat}) => {

  const otherUser = user?.uid
  const [data, setData] = useState("")
  useEffect(()=>{
    const id = currUser > otherUser ? `${currUser + otherUser}` : `${otherUser + currUser }`
    const unsub = onSnapshot(doc(db, "lastMsg", id), (doc) => {
      setData(doc.data())
    })
    return () => unsub()
  },[])
  console.log(data)
  return (
    <>
      <div className={`user-wrapper ${chat.name === user.name && "selected-user"}`} onClick={() => selectUser(user)}>
          <div className="user-info">
              <div className="user-detail">
                  <img src={user.avatar || buggy} alt="avatar" className='avatar'/>
                  <h4>{user.name}</h4>
                  {data?.from !== currUser && data?.unread && <small className='unread'>New</small>}
              </div>
              <div className={`user-status ${user.isOnline ? "online" : "offline"}`}>
              </div>
          </div>
          {data && (
            <p className="truncate">
              <strong>{data.from === currUser ? `Me:` : null}</strong>
              {data.text}
              </p>
          )}
      </div>
      <div className={`sm-container ${chat.name === user.name && "selected-user"}`} onClick={() => selectUser(user)}>
        <img src={user.avatar || buggy} alt="avatar" className='avatar sm-screen'/>
      </div>
    </>
  )
}
export default User
