import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'

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

import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './configs/firebase.config'
import { authenticateUser } from './features/authSlice'
import { calculateCartTotal, getCart } from './features/cartSlice'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(authenticateUser(user?.providerData?.[0]))
      }
    })

    const getAllCartItems = async () => {
      try {
        const res = await fetch('/api/cart/all-items')
        const data = await res.json()

        dispatch(getCart(data))
        dispatch(calculateCartTotal())
      } catch (error) {
        console.log(error)
      }
    }

    getAllCartItems()
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
