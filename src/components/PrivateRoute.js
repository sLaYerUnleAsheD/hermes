import React, { useContext } from 'react'
import { AuthContext } from '../context/auth'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({children}) => {
    const {user} = useContext(AuthContext)
    // console.log(user)
  return (
      user ? children : <Navigate to="/hermes/login" /> 
  )
}
export default PrivateRoute
