import { useNavigate } from 'react-router-dom'
import { FcGoogle } from 'react-icons/fc'
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../configs/firebase.config'
import { authenticateUser } from '../features/authSlice'
import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { ClipLoader } from 'react-spinners'

const GoogleOAuth = ({ btnName }) => {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleGooglePopup = async () => {
    try {
      setIsLoading(true)

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

      if (!res.ok) {
        setIsLoading(false)
        throw new Error('Error occurred!')
      }

      const data = await res.json()

      dispatch(authenticateUser({ user: data?.user, token: data?.token }))
      navigate(-1)
    } catch (error) {
      toast(`Couldn't sign up with Google`, {
        icon: '😥',
      })
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      disabled={isLoading}
      onClick={handleGooglePopup}
      className="flex items-center justify-center gap-1.5 font-medium text-sm bg-white w-full py-2 rounded-xl border hover:bg-gray-100 transition-all duration-300 decoration-clone disabled:cursor-not-allowed disabled:bg-gray-100"
    >
      <FcGoogle className="w-8 h-8" />
      {btnName}
      <ClipLoader loading={isLoading} size={20} color="#6b7280" />
    </button>
  )
}

export default GoogleOAuth
