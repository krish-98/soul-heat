import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import About from './pages/About'
import Contact from './pages/Contact'
import Restaurant from './pages/Restaurant'
import ErrorPage from './pages/ErrorPage'
import Cart from './pages/Cart'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import Success from './pages/Success'
import Cancel from './pages/Cancel'
import Orders from './pages/Orders'

import Header from './components/Header'
import Home from './components/Home/Home'
import ProtectedRoute from './components/ProtectedRoute'
import OnlineStatus from './components/OnlineStatus'

import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from './features/cartSlice'
import { logout } from './features/authSlice'
import Footer from './components/Footer'

function App() {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

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
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="restaurant/:resId" element={<Restaurant />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="cart" element={<Cart />} />
          <Route
            path="sign-up"
            element={!user ? <SignUp /> : <Navigate to="/" />}
          />
          <Route
            path="sign-in"
            element={!user ? <SignIn /> : <Navigate to="/" />}
          />
          <Route element={<ProtectedRoute />}>
            <Route path="/my-orders" element={<Orders />} />
            <Route path="success" element={<Success />} />
            <Route path="cancel" element={<Cancel />} />
          </Route>
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>

      {createPortal(<OnlineStatus />, document.querySelector('#status'))}
    </>
  )
}

export default App
