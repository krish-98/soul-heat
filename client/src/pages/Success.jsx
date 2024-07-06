import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { clearCart } from '../features/cartSlice'
import Tick from '../assets/success_tick.png'

const Success = () => {
  const dispatch = useDispatch()

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

    handleClearCart()
  }, [])

  return (
    <div className="min-h-[calc(100vh-96px)] flex justify-center items-center lg:min-h-[calc(100vh-80px)] bg-[#fb923c] bg-opacity-10">
      <div className="bg-[#f5f3f3] flex flex-col items-center gap-4 p-12 rounded-xl shadow-2xl shadow-green-200">
        <img src={Tick} alt="Payment success mark" className="w-20" />
        <p className="text-2xl text-green-500 border-b-2 pb-4 border-dotted border-b-slate-400 font-medium lg:text-4xl lg:pb-6">
          Payment Successful!
        </p>
        <p className="text-sm lg:text-base font-medium tracking-wide">
          Your Food is on the way
        </p>
        <Link
          to="/my-orders"
          className="bg-green-500 text-white p-3 rounded-lg font-medium lg:px-4 lg:py-2.5 hover:bg-green-400 transition-all duration-500"
        >
          Orders page
        </Link>
      </div>
    </div>
  )
}

export default Success
