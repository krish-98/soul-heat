import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useState } from 'react'
import { auth } from '../config/firebase'
import { toast } from 'react-hot-toast'

interface OAuthProps {
  name?: string
}

interface UserProps {
  username: string | null
  email: string | null
  avatar: string | null
}

const googleProvider = new GoogleAuthProvider()

export default function OAuth({ name = 'Google' }: OAuthProps) {
  const [loading, setLoading] = useState(false)
  const [userInfo, setUserInfo] = useState<UserProps | null>(null)

  const handleOAuth = async () => {
    try {
      setLoading(true)

      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user

      const currentUserInfo = {
        username: user.displayName,
        email: user.email,
        avatar: user.photoURL,
      }

      setUserInfo(currentUserInfo)

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/oauth`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(currentUserInfo),
        }
      )
      const data = await res.json()

      console.log(data)

      toast.success('Sign up successful!')
    } catch (error) {
      console.error(error)
      toast.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleOAuth}
      className="px-6 py-2 bg-red-400 cursor-pointer text-white rounded-xl tracking-wide"
    >
      {loading}
      {name}
    </button>
  )
}
