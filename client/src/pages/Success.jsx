import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from '../features/cartSlice'
import Truck from '../assets/delivery-truck-100.png'

const Success = () => {
  // const { pathname } = useLocation()
  const [orderedItems, setOrderedItems] = useState([])
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { cartItems } = useSelector((store) => store.cart)

  useEffect(() => {
    const handleClearCart = async () => {
      try {
        const res = await fetch('/api/cart/clear-cart', { method: 'DELETE' })
        await res.json()

        dispatch(clearCart())
      } catch (error) {
        console.log(error)
      }
    }

    const timerId = setTimeout(() => navigate('/my-orders'), 2000)

    return () => clearTimeout(timerId)
  }, [])

  return (
    <div className="bg-[#f5f3f3] min-h-[calc(100vh-96px)] flex flex-col justify-center items-center gap-4 lg:min-h-[calc(100vh-80px)]">
      <img src={Truck} alt="Delivery truck" />
      <p className="text-2xl text-green-500 border-b-2 pb-4 border-dashed border-b-slate-600 font-medium lg:text-4xl lg:pb-6">
        Payment Successful!
      </p>
      <p className="text-sm lg:text-base font-semibold">
        Your Food Truck is on the way
      </p>
      <a
        href="/"
        className="bg-[#fb923c] text-white p-2 rounded-lg font-medium lg:px-4 lg:py-2.5 hover:bg-orange-300 transition-all"
      >
        Main Menu
      </a>
    </div>
  )
}

export default Success
