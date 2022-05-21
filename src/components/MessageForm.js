import React from 'react'
import Upload from './Upload'

const MessageForm = ({handleSubmit, text, setText, setImg}) => {
  return (
    <form className="message-form" onSubmit={handleSubmit}>
        <label htmlFor="img">
            <Upload />
        </label>
        <input type="file" id="img"  accept='image/*' style={{display : 'none'}} onChange={(e) => setImg(e.target.files[0])}/>
        <div>
            <input type="text" placeholder='Enter a message' value={text} onChange={(e) => setText(e.target.value)}/>
        </div>
        <div>
            <button className='btn'>Send</button>
        </div>
    </form>
  )
}
export default MessageForm