import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GoogleOAuth from '../components/GoogleOAuth'
import toast from 'react-hot-toast'

const SignUp = () => {
  const [formData, setFormData] = useState({})
  const [loading, setLoading] = useState(null)

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    })
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // input validation
    if (!formData.username || !formData.email || !formData.password) {
      toast('Kindly fill all the required fields', {
        icon: '❗',
      })
      setLoading(false)
      return
    }

    try {
      const res = await fetch('/api/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()

      if (data.success === false) {
        setLoading(false)
        toast.error(data.message)
        return
      }

      toast.success('Account created successfully!')
      navigate('/sign-in')
    } catch (error) {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-96px)] md:min-h-[calc(100vh-80px)] items-center justify-center bg-[#fb923c] px-8 py-12">
      <div className="flex flex-col gap-4 w-full md:max-w-md">
        <p className="text-3xl font-semibold text-center text-white tracking-wide md:text-4xl my-4">
          Sign Up
        </p>

        <form className="space-y-6" onSubmit={handleFormSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-white"
            >
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                placeholder="yourname"
                // value={formData.username}
                onChange={handleChange}
                // required
                className="block w-full rounded-md border-0 py-2 pl-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-white"
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
                // value={formData.email}
                onChange={handleChange}
                // required
                className="block w-full rounded-md border-0 py-2 pl-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-white"
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
                // value={formData.password}
                onChange={handleChange}
                // required
                className="block w-full rounded-md border-0 py-2 pl-4 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              disabled={loading}
              type="submit"
              className="flex w-full justify-center rounded-md border bg-[#fb923c] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-white hover:text-[#fb923c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black transition duration-500"
            >
              {loading ? 'Signing up...' : 'Sign up'}
            </button>
          </div>
        </form>

        {/* Sign up with Google btn */}
        <div>
          <p className="text-center py-5 relative before:content before:absolute before:w-[45%] before:h-[2px] before:bg-white before:left-0 before:top-8 after:content after:absolute after:w-[45%] after:h-[2px] after:bg-white after:right-0 after:top-8">
            or
          </p>

          <GoogleOAuth btnName="Sign up with Google" />
        </div>

        <p className="mt-8 text-center text-sm text-white">
          Already have an account?{' '}
          <Link
            to={'/sign-in'}
            className="font-semibold text-black leading-6 transition duration-500 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SignUp
