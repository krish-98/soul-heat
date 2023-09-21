import { useNavigate } from "react-router-dom"
import { CLOUDINARY_IMAGE_ID } from "../configs/constants"
import EmptyCart from "../assets/empty-cart.svg"

// React-icons imports
import { RiEBike2Fill } from "react-icons/ri"
import { clearCart } from "../features/cartSlice"
import { IoBagCheckOutline } from "react-icons/io5"
import { BsArrowLeft } from "react-icons/bs"
import { FcGoogle } from "react-icons/fc"
import { FaRegTrashAlt } from "react-icons/fa"

// Firebase imports
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../configs/firebase.config"

// Redux imports
import { useDispatch, useSelector } from "react-redux"
import { authenticateUser } from "../features/authSlice"

// Stripe imports
import { loadStripe } from "@stripe/stripe-js"

const Cart = () => {
  const dispatch = useDispatch()
  const { cartItems, totalItems, totalAmount } = useSelector(
    (store) => store.cart
  )
  const { user } = useSelector((store) => store.auth)
  const navigate = useNavigate()

  const googleProvider = new GoogleAuthProvider()

  const signInWithGoogle = async () => {
    try {
      const response = await signInWithPopup(auth, googleProvider)
      dispatch(authenticateUser(response?.user?.providerData?.[0]))
    } catch (error) {
      console.error(error.message)
    }
  }

  // Stripe Check-out
  // const handlePayment = async () => {
  //   const stripePromise = await loadStripe(
  //     process.env.REACT_APP_STRIPE_PUBLIC_KEY
  //   )

  //   const res = await fetch(
  //     `${process.env.REACT_APP_SERVER_URL}/checkout-payment`,
  //     {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(cartItems),
  //     }
  //   )
  //   console.log(res)
  //   if (res.status === 500) return
  //   const data = await res.json()
  //   console.log(data)
  //   stripePromise.redirectToCheckout({ sessionId: data })
  // }

  return (
    <div className="p-6 max-w-[900px] mx-auto md:px-10 lg:px-0">
      <div className="pb-10 relative flex items-center justify-between gap-6">
        <button
          onClick={() => navigate(-1)}
          className=" px-4 flex items-center gap-1 bg-slate-100 py-0.5 rounded-lg hover:bg-slate-300"
        >
          <BsArrowLeft />
          back
        </button>

        {totalItems > 0 && (
          <h1 className="text-center font-bold text-2xl">
            CART ({totalItems})
          </h1>
        )}

        {/* Clear cart button */}
        {cartItems?.length > 0 && (
          <div
            onClick={() => dispatch(clearCart())}
            className={
              "top-1 right-0 flex items-center gap-1 text-white bg-[#FB923C] py-1 px-2 rounded-xl cursor-pointer transition-all duration-300 hover:bg-[#FB3C46]"
            }
          >
            <p className="font-medium tracking-wide">Clear</p>
            <FaRegTrashAlt className="w-4 h-4" />
          </div>
        )}
      </div>

      {!cartItems?.length ? (
        <div className="mt-24 flex flex-col gap-8">
          <img
            className="md:w-1/2 md:mx-auto"
            src={EmptyCart}
            alt="Your Cart is Empty"
          />
          <h1 className="text-xl font-semibold text-center">
            Your Cart is Empty
          </h1>
        </div>
      ) : (
        <div className="lg:flex justify-between lg:gap-16">
          {/* Cart Items Section */}
          <div className="flex flex-col gap-8 pb-8 lg:w-[70%]">
            {cartItems.length > 0 &&
              cartItems.map((item) => (
                <div
                  key={item?.id}
                  className="flex justify-between items-center gap-4 "
                >
                  <div className="flex flex-col gap-1 max-w-[60%]">
                    <h3 className="text-sm font-medium md:text-lg">
                      {item?.name}{" "}
                      <span className="text-[#f26434]">
                        [ x {item?.quantity}]
                      </span>
                    </h3>
                    <p className="text-sm md:text-base">
                      ₹{" "}
                      {item.price
                        ? String(item.price).slice(0, 3)
                        : String(item.defaultPrice).slice(0, 3)}
                    </p>
                  </div>

                  <div className="max-w-[35%]">
                    <img
                      className="md:w-[200px] object-contain rounded-xl"
                      src={CLOUDINARY_IMAGE_ID + item?.imageId}
                      alt={item?.name}
                    />
                  </div>
                </div>
              ))}
          </div>

          {/* Calculation Section */}
          <div className="lg:w-[30%]">
            <div className="py-6 border-t border-b space-y-1">
              <h3 className="flex justify-between items-center font-medium">
                <span>
                  Item {cartItems?.length > 1 ? "Totals" : "Total"} :{" "}
                </span>
                <span>₹ {totalAmount}</span>
              </h3>

              <div className="flex justify-between items-center font-medium">
                <span>
                  <span>Delivery Charges </span>
                  <RiEBike2Fill className="fill-red-600 inline" /> :{" "}
                </span>

                <span>₹ 49</span>
              </div>
            </div>

            <p className="pt-4 text-lg font-semibold flex justify-between items-center">
              <span>Total Amount : </span>

              <span>₹ {totalAmount + 49}</span>
            </p>

            {/* Shows signin with google button if no user is logged in */}
            {!user ? (
              <button
                onClick={signInWithGoogle}
                className="flex items-center justify-center mt-10 py-2 gap-1 w-full rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-300 decoration-clone"
              >
                <FcGoogle className="w-9 h-9" />{" "}
                <span className="font-semibold">Sign In to Checkout</span>
              </button>
            ) : (
              <div
                // onClick={handlePayment}
                className="bg-[#fb923c] mt-10 py-3 rounded-2xl flex items-center justify-center gap-1 hover:bg-[#ffa13c] hover:shadow-xl transistion duration-300 cursor-pointer focus:scale-90"
              >
                <button className="text-white font-semibold tracking-wider uppercase ">
                  Checkout
                </button>
                <IoBagCheckOutline className="w-7 h-[26px] stroke-white" />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
