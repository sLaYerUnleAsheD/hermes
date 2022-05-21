import React , {useContext} from 'react'
import { Link } from 'react-router-dom'
import { auth , db } from '../firebase'
import { signOut } from 'firebase/auth'
import { updateDoc, doc } from 'firebase/firestore'
import { AuthContext } from '../context/auth'
import { useNavigate } from 'react-router-dom'

const Navbar = () => {
    const navigate = useNavigate()
    const {user} = useContext(AuthContext)
    const handleSignout = async () => {
        await updateDoc(doc(db, "users", auth.currentUser.uid), {
            isOnline: false
        })
        await signOut(auth);
        navigate("/hermes/login");
    }
  return (
    <nav>
        <h3><Link to="/hermes">Hermes</Link></h3>
        {user ? 
            <div>
                <Link to="/hermes/profile">Profile</Link>
                <button className='btn' onClick={handleSignout}>Logout</button>
            </div>
        :
            <div>
                <Link to="/hermes/register">Register</Link>
                <Link to="/hermes/login">Login</Link>
            </div>
        }

    </nav>
  )
}
export default Navbar
