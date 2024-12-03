import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { ClipLoader } from 'react-spinners'

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../configs/firebase.config'

import { authenticateUser, updateToken } from '../app/features/authSlice'
import { FcGoogle } from 'react-icons/fc'
import { useAppDispatch } from '../app/hooks'

interface GoogleOAuthProps {
  btnName: string
}

const GoogleOAuth = ({ btnName }: GoogleOAuthProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleGooglePopup = async () => {
    try {
      setIsLoading(true)

      const googleProvider = new GoogleAuthProvider()
      const { user } = await signInWithPopup(auth, googleProvider)

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/google`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: user?.displayName,
            email: user?.email,
            photo: user?.photoURL,
          }),
          credentials: 'include',
        }
      )

      if (!res.ok) {
        throw new Error('Error occurred during authentication')
      }

      const data = await res.json()

      dispatch(authenticateUser({ user: data?.user }))
      dispatch(updateToken({ token: data?.token }))

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
