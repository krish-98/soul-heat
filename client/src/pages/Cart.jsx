import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { toast } from 'react-hot-toast'
import { loadStripe } from '@stripe/stripe-js'

import EmptyCart from '../assets/empty-cart.png'
import { RiEBike2Fill } from 'react-icons/ri'
import { IoBagCheckOutline } from 'react-icons/io5'
import { BsArrowLeft } from 'react-icons/bs'
import { FaRegTrashAlt } from 'react-icons/fa'

import {
  addToCart,
  calculateCartTotal,
  clearCart,
  removeFromCart,
} from '../features/cartSlice'
import { useDispatch, useSelector } from 'react-redux'

const Cart = () => {
  const [paymentLoader, setPaymentLoader] = useState(false)
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { cartItems, totalItems, totalAmount } = useSelector(
    (store) => store.cart
  )
  const { user } = useSelector((state) => state.auth)

  const handleIncreaseQty = async (item) => {
    try {
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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cartItem),
      })
      const data = await res.json()

      dispatch(addToCart(data))
      dispatch(calculateCartTotal())
    } catch (error) {
      console.log(error)
    }
  }

  const handleDecreaseQty = async (item) => {
    try {
      const cartItem = {
        id: item?.id,
        name: item?.name,
        category: item?.category,
        description: item?.description,
        imageId: item?.imageId,
        price: item?.price || item.defaultPrice,
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
      const data = await res.json()

      dispatch(removeFromCart(data))
      dispatch(calculateCartTotal())
    } catch (error) {
      console.log(error)
    }
  }

  const handleClearCart = async () => {
    try {
      const res = await fetch('/api/cart/clear-cart', { method: 'DELETE' })
      const data = await res.json()

      toast(`${data}!`, {
        icon: '🧹',
      })
      dispatch(clearCart())
    } catch (error) {
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
        body: JSON.stringify({ cartItems }),
      })

      if (!res.ok) throw new Error('Failed to create checkout session')

      const session = await res.json()
      await stripe.redirectToCheckout({ sessionId: session.id })
    } catch (error) {
      toast.error(
        `Something went wrong 😐
         Try after sometime`,
        {
          position: 'top-center',
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
            {/* Cart Items Section */}
            <div className="flex flex-col gap-8 pb-8 h-[28rem] lg:w-[`70%] lg:h-[35rem] overflow-auto scrollbar-thin scrollbar-thumb-[#fb923c] scrollbar-track-transparent">
              {cartItems.length > 0 &&
                cartItems.map((item) => (
                  <div key={item?._id} className="flex items-center gap-8">
                    {/* Cart Item Img */}
                    <div className="max-w-[35%]">
                      <img
                        className="w-[170px] h-[78px] md:h-[125px] object-cover rounded-xl"
                        src={
                          'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/' +
                          item?.imageId
                        }
                        alt={item?.name}
                      />
                    </div>

                    {/* Cart Item Details */}
                    <div className="flex flex-col gap-1 max-w-[60%]">
                      <h3 className="text-sm font-medium md:text-lg">
                        {item?.name}{' '}
                      </h3>

                      <p className="text-sm md:text-base font-bold">
                        ₹{' '}
                        {item.price
                          ? String(item.price).slice(0, 3)
                          : String(item.defaultPrice).slice(0, 3)}{' '}
                        <span className="text-[#f26434] font-normal">
                          ( x {item?.quantity})
                        </span>
                      </p>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleDecreaseQty(item)}
                          className="bg-[#fb923c] text-white font-bold p-2 py-0.5 rounded-md"
                        >
                          -
                        </button>
                        <p className="font-semibold">{item?.quantity}</p>
                        <button
                          onClick={() => handleIncreaseQty(item)}
                          className="bg-[#fb923c] text-white font-bold p-2 py-0.5 rounded-md"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Calculation Section */}
            <div className="lg:w-[30%]">
              <div className="py-6 border-t border-b space-y-1">
                <h3 className="flex justify-between items-center font-medium">
                  <span>
                    Item {cartItems?.length > 1 ? 'Totals' : 'Total'} :{' '}
                  </span>
                  <span>
                    {totalAmount.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'INR',
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    })}
                  </span>
                </h3>

                <div className="flex justify-between items-center font-medium">
                  <span>
                    <span>Delivery Charges </span>
                    <RiEBike2Fill className="fill-red-600 inline" /> :{' '}
                  </span>

                  <span className="space-x-2">
                    <span>Free</span>
                    <span className="line-through">₹ 149</span>
                  </span>
                </div>
              </div>

              <p className="pt-4 text-lg font-semibold flex justify-between items-center">
                <span>Total Amount : </span>

                <span>
                  {/* ₹{' '} */}
                  {totalAmount.toLocaleString('en-US', {
                    style: 'currency',
                    currency: 'INR',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  })}
                </span>
              </p>

              <button
                onClick={handleCheckout}
                disabled={paymentLoader}
                className={`bg-[#fb923c] w-full mt-10 py-3 px-6 rounded-2xl flex items-center justify-center gap-1 hover:bg-[#ffa13c] hover:shadow-xl transistion duration-300 cursor-pointer focus:scale-90 ${
                  paymentLoader &&
                  'disabled:opacity-75 hover:cursor-not-allowed'
                }`}
              >
                <p className="text-white font-semibold tracking-wider uppercase">
                  {paymentLoader ? 'Processing...' : 'Checkout'}
                </p>
                {!paymentLoader && (
                  <IoBagCheckOutline className="w-7 h-[26px] stroke-white" />
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
