import { lazy, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Header from './components/Header'
import Home from './components/Home/Home'
import ProtectedRoute from './components/ProtectedRoute'
import OnlineStatus from './components/OnlineStatus'
import SuspenseWrapper from './components/Suspense/SuspenseWrapper'

import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from './features/cartSlice'
import { logout } from './features/authSlice'

const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Restaurant = lazy(() => import('./pages/Restaurant'))
const ErrorPage = lazy(() => import('./pages/ErrorPage'))
const Cart = lazy(() => import('./pages/Cart'))
const SignIn = lazy(() => import('./pages/SignIn'))
const SignUp = lazy(() => import('./pages/SignUp'))
const Success = lazy(() => import('./pages/Success'))
const Cancel = lazy(() => import('./pages/Cancel'))
const Orders = lazy(() => import('./pages/Orders'))

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
          <Route
            path="restaurant/:resId"
            element={<SuspenseWrapper component={Restaurant} />}
          />
          <Route path="about" element={<SuspenseWrapper component={About} />} />
          <Route
            path="contact"
            element={<SuspenseWrapper component={Contact} />}
          />
          <Route path="cart" element={<SuspenseWrapper component={Cart} />} />
          <Route
            path="sign-up"
            element={
              !user ? (
                <SuspenseWrapper component={SignUp} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="sign-in"
            element={
              !user ? (
                <SuspenseWrapper component={SignIn} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route element={<ProtectedRoute />}>
            <Route
              path="my-orders"
              element={<SuspenseWrapper component={Orders} />}
            />
            <Route
              path="success"
              element={<SuspenseWrapper component={Success} />}
            />
            <Route
              path="cancel"
              element={<SuspenseWrapper component={Cancel} />}
            />
          </Route>
          <Route path="*" element={<SuspenseWrapper component={ErrorPage} />} />
        </Routes>
      </BrowserRouter>

      {createPortal(<OnlineStatus />, document.querySelector('#status'))}
    </>
  )
}

export default App
