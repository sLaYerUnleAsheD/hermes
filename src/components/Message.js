import React, {useRef, useEffect} from 'react'
import Moment from "react-moment"

const Message = ({ mssg, currUser }) => {
    const scrollRef = useRef()
    useEffect(()=>{
        scrollRef.current?.scrollIntoView({behavior: "smooth"})
    },[mssg])
  return (
    <div className={`message-wrapper ${mssg.from === currUser ? "own" : null}`} ref={scrollRef}>
        <p className={mssg.from === currUser ? "me" : "friend"}>
            {mssg.media ? <img src={mssg.media} alt={mssg.text} /> : null}
            {mssg.text}
            <br />
            <small>
                <Moment fromNow>{mssg.createdAt.toDate()}</Moment>
            </small>

        </p>
    </div>
  )
}
export default Message