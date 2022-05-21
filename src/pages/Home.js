import React, { useEffect, useState } from 'react'
import { db, auth, storage } from '../firebase';
import { collection, query, where, onSnapshot, addDoc, Timestamp, orderBy, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import User from '../components/User';
import MessageForm from '../components/MessageForm';
import Message from '../components/Message';

const Home = () => {
  const [users, setUsers] = useState([])
  const [chat, setChat] = useState("")
  const [text, setText] = useState("")
  const [img, setImg] = useState("")
  const [mssgs, setMssgs] = useState([])

  let currUser = auth.currentUser.uid
  useEffect(() => {
    const usersRef = collection(db, "users")
    // creating query object
    const q = query(usersRef, where("uid", "not-in", [auth.currentUser.uid]))
    // executing the query
    const unsub = onSnapshot(q, querySnapshot => {
      let users = []
      querySnapshot.forEach(doc => {
        users.push(doc.data())
      })
      setUsers(users)
    })
    return () => unsub();
  },[]);

  const selectUser = async (user) => {
      setChat(user)
      const otherUser = user.uid
      const id = currUser > otherUser ? `${currUser + otherUser}` : `${otherUser + currUser }`
      const mssgsRef = collection(db, "messages", id, "chat")
      const q = query(mssgsRef, orderBy("createdAt", "asc"))
      onSnapshot(q, querySnapshot => {
        let mssgs = []
        querySnapshot.forEach(doc => {
          mssgs.push(doc.data())
        })
        setMssgs(mssgs)
        
      })

      // get last message between logged in user and selected user
      const docSnap = await getDoc(doc(db, "lastMsg", id))
      // if last message exists and mssg is from selected user
      // then update last message doc, set unread property to false
      if(docSnap.data() && docSnap.data().from !== currUser){
        await updateDoc(doc(db, "lastMsg", id),{
          unread: false
        })
      }
    // console.log(user)
  }
  // console.log(mssgs)
  const handleSubmit = async (e) => {
    e.preventDefault()
    const otherUser = chat.uid 
    const id = currUser > otherUser ? `${currUser + otherUser}` : `${otherUser + currUser }`
    let url
    if(img){
      const imgRef = ref(storage,  `images/ ${new Date().getTime()} - ${img.name}`)
      const snap = await uploadBytes(imgRef, img)
      const dlurl = await getDownloadURL(ref(storage, snap.ref.fullPath))
      url = dlurl
    }
    await addDoc(collection(db, "messages", id, "chat"), {
      text,
      from: currUser,
      to: otherUser,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || ""
    })

    await setDoc(doc(db, "lastMsg", id), {
      text,
      from: currUser,
      to: otherUser,
      createdAt: Timestamp.fromDate(new Date()),
      media: url || "",
      unread: true,
    })

    setText("")
  }

  // console.log(users)
  return (
    <div className="home-container">
      <div className="users-container" >
        {users.map(user => <User key={user.uid} user={user} selectUser={selectUser} currUser={currUser} chat={chat}/>)}
      </div>
      <div className="messages-container">
        {chat 
        ? 
          <>
            <div className='messages-user'><h3>{chat.name}</h3></div> 
            <div className="messages">
              {mssgs.length
               ? 
               mssgs.map((mssg, i) => <Message key={i} mssg={mssg} currUser={currUser}/>)
               : 
               null}
            </div>
            <MessageForm handleSubmit={handleSubmit} text={text} setText={setText} setImg={setImg} />
          </>
        :  
          <h3 className='no-conv'>Select a user to chat!</h3>}
      </div>
    </div>
  );
}
export default Home