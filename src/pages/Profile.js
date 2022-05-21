import React, { useState, useEffect } from 'react'
import Camera from '../components/Camera'
import Delete from '../components/Delete'
import buggy from "../images/buggy.png"
import { storage, db, auth } from '../firebase'
import { ref, getDownloadURL, uploadBytes, deleteObject } from 'firebase/storage'
import { getDoc, doc, updateDoc } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
    const navigate = useNavigate()
    const [img, setImg] = useState('')
    const [user, setUser] = useState()
    // console.log(img)
    useEffect(()=>{
        getDoc(doc(db, "users", auth.currentUser.uid))
        .then(docSnap => {
            if(docSnap.exists){
                setUser(docSnap.data())
            }
        })
        if(img){
            const uploadImage = async () => {
                const imgRef = ref(storage, `avatar/${new Date().getTime()} - ${img.name}`)
                try{
                    if(user.avatarPath){
                        await deleteObject(ref(storage, user.avatarPath))
                    }
                    const snap = await uploadBytes(imgRef, img)
                    const url = await getDownloadURL(ref(storage, snap.ref.fullPath))
                    // console.log(snap.ref.fullPath)
                    // console.log(url)
                    await updateDoc(doc(db, "users", auth.currentUser.uid), {
                        avatar: url,
                        avatarPath: snap.ref.fullPath
                    })
                    setImg("")
                }catch(err){
                    console.log(err.message)
                }
            }   
            uploadImage()   
        }
    },[img])
    const deleteImage = async () => {
        try {
            const confirm = window.confirm("Delete avatar?")
            if(confirm){
                await deleteObject(ref(storage, user.avatarPath))
                await updateDoc(doc(db, "users", auth.currentUser.uid), {
                    avatar: "",
                    avatarPath: ""
                })
                navigate("/")
            }
        } catch (error) {
            console.log(error.message)
        }
    }
  return user ? (
    <div className="profile-container">
        <div className="image-container">
            <img src={user.avatar || buggy} alt="avatar" />
            <div className="overlay">
                <div className='icons'>
                    <label htmlFor="photo">
                        <Camera />
                    </label>
                    {user.avatar ? <Delete deleteImage={deleteImage}/> : null}
                    <input type="file" accept='image/*' style={{display:"none"}} id="photo" onChange={(e)=>setImg(e.target.files[0])}/>
                </div>
            </div>
        </div>
        <div className="text-container">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <hr />
            <small>Joined on: {user.createdAt.toDate().toDateString()}</small>
        </div>
    </div>
  ) : null
}
export default Profile
