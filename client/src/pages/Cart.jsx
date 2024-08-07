import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-hot-toast'
import { loadStripe } from '@stripe/stripe-js'

import EmptyCart from '../assets/empty-cart.png'
import { BsArrowLeft } from 'react-icons/bs'
import { FaRegTrashAlt } from 'react-icons/fa'

import {
  addToCart,
  calculateCartTotal,
  clearCart,
  getCart,
  removeFromCart,
} from '../features/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import CartItems from '../components/Cart/CartItems'
import CartCalculation from '../components/Cart/CartCalculation'

const Cart = () => {
  const [loading, setLoading] = useState(false)
  const [paymentLoader, setPaymentLoader] = useState(false)

  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { cartItems, totalItems, totalAmount } = useSelector(
    (store) => store.cart
  )
  const { user } = useSelector((state) => state.auth)

  const handleIncreaseQty = async (item) => {
    try {
      setLoading(true)
      const cartItem = {
        id: item?.id,
        name: item?.name,
        category: item?.category,
        description: item?.description,
        imageId: item?.imageId,
        price: item?.price || item?.defaultPrice,
        quantity: 1,
      }

      const res = await fetch('/api/cart/add-item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartItem),
      })

      if (!res.ok) {
        throw new Error('Newtork error occurred')
      }

      const data = await res.json()
      dispatch(addToCart(data))
      dispatch(calculateCartTotal())
    } catch (error) {
      toast(`Something went wrong!`, {
        icon: '🙄',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDecreaseQty = async (item) => {
    try {
      setLoading(true)
      const cartItem = {
        id: item?.id,
        name: item?.name,
        category: item?.category,
        description: item?.description,
        imageId: item?.imageId,
        price: item?.price || item?.defaultPrice,
        quantity: 1,
        userRef: user?._id,
      }

      const res = await fetch('/api/cart/remove-item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItem),
      })

      if (!res.ok) {
        throw new Error('Newtork error occurred')
      }

      const data = await res.json()

      if (data?.message) {
        dispatch(removeFromCart({ id: cartItem.id, message: data.message }))
      } else {
        dispatch(removeFromCart(cartItem))
      }

      dispatch(calculateCartTotal())
    } catch (error) {
      toast(`Something went wrong!`, {
        icon: '🙄',
      })
    } finally {
      setLoading(false)
    }
  }

  const handleClearCart = async () => {
    try {
      const res = await fetch('/api/cart/clear-cart', { method: 'DELETE' })

      if (!res.ok) {
        throw new Error('Failed to clear cart')
      }

      const data = await res.json()

      toast(`${data?.message}!`, {
        icon: '🧹',
      })
      dispatch(clearCart())
    } catch (error) {
      toast(`${error.message}!`, {
        icon: '🧹',
      })
      console.log(error)
    }
  }

  const handleCheckout = async () => {
    try {
      setPaymentLoader(true)

      const stripe = await loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)
      const res = await fetch('/api/cart/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cartItems),
      })

      if (!res.ok) throw new Error('Failed to create checkout session')

      const session = await res.json()
      await stripe.redirectToCheckout({ sessionId: session.id })
    } catch (error) {
      toast.error(
        `Something went wrong 😐
         Try after sometime`,
        {
          autoClose: 1000,
          hideProgressBar: true,
          closeOnClick: false,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: 'light',
        }
      )
      console.log(error)
    } finally {
      setPaymentLoader(false)
    }
  }

  return (
    <div className="min-h-[calc(100vh-96px)] pt-12 p-6 md:px-10 lg:px-0 bg-[#f5f3f3] lg:min-h-[calc(100vh-80px)]">
      <div className="max-w-4xl mx-auto">
        <div className="pb-10 relative flex items-center justify-between gap-6">
          {totalItems > 0 && (
            <>
              <button
                onClick={() => navigate(-1)}
                className=" px-4 flex items-center gap-1 bg-white py-0.5 rounded-lg hover:bg-slate-300"
              >
                <BsArrowLeft />
                back
              </button>
              <h1 className="text-center font-bold text-2xl">
                CART ({totalItems})
              </h1>
            </>
          )}

          {/* Clear cart button */}
          {cartItems?.length > 0 && (
            <div
              onClick={handleClearCart}
              className={
                'top-1 right-0 flex items-center gap-1 text-white bg-[#FB923C] py-1 px-2 rounded-xl cursor-pointer transition-all duration-300 hover:bg-[#FB3C46]'
              }
            >
              <p className="text-sm font-medium tracking-wide md:text-base">
                Clear
              </p>
              <FaRegTrashAlt className="w-4 h-4" />
            </div>
          )}
        </div>

        {!cartItems?.length ? (
          <div className="mt-24 flex flex-col gap-8">
            <img
              className="md:w-1/2 md:mx-auto"
              src={EmptyCart}
              alt="Empty cart"
            />
            <h1 className="text-xl font-semibold text-center tracking-wider">
              Your Cart is Empty
            </h1>
          </div>
        ) : (
          <div className="lg:flex justify-around lg:gap-16">
            <div className="flex flex-col gap-8 pb-8 h-[28rem] lg:w-[70%] lg:h-[35rem] overflow-auto scrollbar-thin scrollbar-thumb-[#fb923c] scrollbar-track-transparent">
              {cartItems?.length > 0 &&
                cartItems?.map((item) => (
                  <CartItems
                    key={item?._id}
                    item={item}
                    loading={loading}
                    handleIncreaseQty={handleIncreaseQty}
                    handleDecreaseQty={handleDecreaseQty}
                  />
                ))}
            </div>

            <CartCalculation
              handleCheckout={handleCheckout}
              cartItems={cartItems}
              paymentLoader={paymentLoader}
              totalAmount={totalAmount}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
