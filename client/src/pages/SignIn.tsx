import { ChangeEvent, FormEvent, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import GoogleOAuth from '../components/GoogleOAuth'

import { authenticateUser, updateToken } from '../app/features/authSlice'
import { useAppDispatch } from '../app/hooks'

interface FormData {
  email: string
  password: string
}

const SignIn = () => {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    if (!formData.email || !formData.password) {
      toast('Kindly fill all the required fields', {
        icon: '❗',
      })
      setIsLoading(false)
      return
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/signin`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
          credentials: 'include',
        }
      )
      const data = await res.json()

      if (data.success === false) {
        setIsLoading(false)
        toast.error(data.message)
        return
      }

      dispatch(authenticateUser({ user: data?.user }))
      dispatch(updateToken({ token: data?.token }))

      navigate(-1)
    } catch (error) {
      console.error('Error during sign-in:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-96px)] md:min-h-[calc(100vh-80px)] items-center justify-center bg-[#fb923c] px-8 py-12">
      <div className="flex flex-col gap-4 w-full bg-white rounded-xl md:max-w-md p-8">
        <p className="text-3xl font-semibold text-center text-black tracking-wide md:text-4xl my-4">
          Sign In
        </p>

        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-black"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="youremail@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-2 pl-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-black"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                placeholder="*********"
                value={formData.password}
                onChange={handleChange}
                required
                className="block w-full rounded-md border-0 py-2 pl-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              disabled={isLoading}
              type="submit"
              className="flex w-full justify-center rounded-md border text-white px-3 py-1.5 text-sm font-semibold leading-6 bg-black shadow-sm hover:text-white hover:bg-[#fb923c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition duration-500 disabled:cursor-not-allowed disabled:bg-orange-300"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </button>
          </div>
        </form>

        {/* Sign in with Google btn */}
        <div>
          <p className="text-center py-3 relative before:content before:absolute before:w-[45%] before:h-[2px] before:bg-white before:left-0 before:top-8 after:content after:absolute after:w-[45%] after:h-[2px] after:bg-white after:right-0 after:top-8">
            or
          </p>

          <GoogleOAuth btnName="Sign in with Google" />
        </div>

        <p className="mt-8 text-center text-sm text-black">
          Don&apos;t have an account?{' '}
          <Link
            to={'/sign-up'}
            className="font-semibold text-black leading-6 transition duration-500 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignIn
