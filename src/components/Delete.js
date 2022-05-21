import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/fontawesome-free-solid'
const Delete = ({deleteImage}) => {
  return (
    <>
      <div className='trash-icon'>
          <FontAwesomeIcon icon={faTrash}  onClick={deleteImage}/>
      </div>
    </>
  )
}
export default Delete
