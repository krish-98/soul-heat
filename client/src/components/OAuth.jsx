import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../configs/firebase.config'
import { authenticateUser } from '../features/authSlice'
import { useDispatch } from 'react-redux'

const OAuth = ({ btnName }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleGooglePopup = async () => {
    try {
      const googleProvider = new GoogleAuthProvider()
      const { user } = await signInWithPopup(auth, googleProvider)

      const res = await fetch('/api/user/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: user?.displayName,
          email: user?.email,
          photo: user?.photoURL,
        }),
      })
      if (!res.ok) return new Error('Error occurred!')
      const data = await res.json()

      dispatch(authenticateUser(data))
      navigate(-1)
    } catch (error) {
      console.error(`Couldn't signup with firebase google auth`, error)
    }
  }

  return (
    <button
      onClick={handleGooglePopup}
      className="flex items-center justify-center gap-1 bg-white w-full py-2 rounded-xl hover:bg-gray-100 transition-all duration-300 decoration-clone"
    >
      <FcGoogle className="w-9 h-9" />
      {btnName}
    </button>
  )
}

export default OAuth
