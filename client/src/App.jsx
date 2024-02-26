import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Body from './components/Body'
import About from './pages/About'
import Contact from './pages/Contact'
import Restaurant from './pages/Restaurant'
import ErrorPage from './pages/ErrorPage'
import Cart from './pages/Cart'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Success from './pages/Success'
import Cancel from './pages/Cancel'
import { clearCart } from './features/cartSlice'
import { logout } from './features/authSlice'
import { useDispatch } from 'react-redux'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })

    const getCookieInfo = () => {
      const cookieArray = document.cookie.split('; ')
      const cookieObject = {}

      cookieArray.forEach((cookie) => {
        const [key, value] = cookie.split('=')
        cookieObject[key] = value
      })

      if (!cookieObject.access_token) {
        dispatch(logout())
        dispatch(clearCart())
      }
    }

    getCookieInfo()
  }, [])

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Body />} />
        <Route path="restaurant/:resId" element={<Restaurant />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="cart" element={<Cart />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="success" element={<Success />} />
        <Route path="cancel" element={<Cancel />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
