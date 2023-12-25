import { useNavigate } from 'react-router-dom'
// import EmptyCart from "../assets/empty-cart.svg"
import EmptyCart from '../assets/pngwing.com-3.png'

import { RiEBike2Fill } from 'react-icons/ri'
import { IoBagCheckOutline } from 'react-icons/io5'
import { BsArrowLeft } from 'react-icons/bs'
import { FcGoogle } from 'react-icons/fc'

import { FaRegTrashAlt } from 'react-icons/fa'
import {
  addToCart,
  calculateCartTotal,
  clearCart,
  removeFromCart,
} from '../features/cartSlice'
import { useDispatch, useSelector } from 'react-redux'
import { authenticateUser } from '../features/authSlice'

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from '../configs/firebase.config'

import { loadStripe } from '@stripe/stripe-js'

const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { cartItems, totalItems, totalAmount } = useSelector(
    (store) => store.cart
  )
  const { user } = useSelector((store) => store.auth)

  const googleProvider = new GoogleAuthProvider()

  const signInWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, googleProvider)
      dispatch(authenticateUser(response?.user?.providerData?.[0]))
    } catch (error) {
      console.error(error.message)
    }
  }

  const increaseQty = (item) => {
    dispatch(addToCart(item))
    dispatch(calculateCartTotal(item))
  }

  const decreaseQty = (item) => {
    dispatch(removeFromCart(item))
    dispatch(calculateCartTotal(item))
  }

  // Stripe Check-out
  const handlePayment = async () => {
    try {
      const stripePromise = await loadStripe(
        process.env.REACT_APP_STRIPE_PUBLIC_KEY
      )
      const res = await fetch(
        `${process.env.REACT_APP_SERVER_URL}/checkout-payment`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cartItems),
        }
      )
      if (res.status === 500) return
      const data = await res.json()
      console.log(data)
      stripePromise.redirectToCheckout({ sessionId: data })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-[calc(100vh-96px)] pt-12 p-6 md:px-10 lg:px-0 bg-[#f5f3f3] lg:min-h-[calc(100vh-80px)]">
      <div className="max-w-[900px] mx-auto">
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
              onClick={() => dispatch(clearCart())}
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
          <div className="lg:flex justify-between lg:gap-16">
            {/* Cart Items Section */}
            <div className="flex flex-col gap-8 pb-8 lg:w-[70%]">
              {cartItems.length > 0 &&
                cartItems.map((item) => (
                  <div key={item?.id} className="flex items-center gap-8">
                    {/* Cart Item Img */}
                    <div className="max-w-[35%]">
                      <img
                        className="md:w-[200px] object-contain rounded-xl"
                        src={CLOUDINARY_IMAGE_ID + item?.imageId}
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
                          onClick={() => decreaseQty(item)}
                          className="bg-[#fb923c] text-white font-bold p-2 py-0.5 rounded-md"
                        >
                          -
                        </button>
                        <p className="font-semibold">{item?.quantity}</p>
                        <button
                          onClick={() => increaseQty(item)}
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
                  <span>₹ {totalAmount}</span>
                </h3>

                <div className="flex justify-between items-center font-medium">
                  <span>
                    <span>Delivery Charges </span>
                    <RiEBike2Fill className="fill-red-600 inline" /> :{' '}
                  </span>

                  <span>₹ 49</span>
                </div>
              </div>

              <p className="pt-4 text-lg font-semibold flex justify-between items-center">
                <span>Total Amount : </span>

                <span>₹ {totalAmount + 49}</span>
              </p>

              {/* Shows signin with google button, if no user is logged in */}
              {!user ? (
                <button
                  onClick={signInWithGoogle}
                  className="flex items-center justify-center mt-10 py-2 gap-1 w-full rounded-xl bg-white hover:bg-[#fb923c] hover:text-white transition-all duration-300 decoration-clone"
                >
                  <FcGoogle className="w-9 h-9" />{' '}
                  <span className="font-semibold">Sign In to Checkout</span>
                </button>
              ) : (
                <div
                  onClick={handlePayment}
                  className="bg-[#fb923c] mt-10 py-3 rounded-2xl flex items-center justify-center gap-1 hover:bg-[#ffa13c] hover:shadow-xl transistion duration-300 cursor-pointer focus:scale-90"
                >
                  <button className="text-white font-semibold tracking-wider uppercase">
                    Checkout
                  </button>
                  <IoBagCheckOutline className="w-7 h-[26px] stroke-white" />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
