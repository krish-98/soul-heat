import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { ClipLoader } from 'react-spinners'

import { useDispatch, useSelector } from 'react-redux'
import { addToCart, calculateCartTotal } from '../../app/features/cartSlice'

const MenuCardItem = ({ item }) => {
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const { user, token } = useSelector((state) => state.auth)

  const handleAddItemToCart = async (item) => {
    if (!user) {
      toast.error('Sign In to add item')

      setTimeout(() => navigate('/sign-up'), 1000)
      return
    }

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

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/cart/add-item`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cartItem),
        }
      )

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

  return (
    <div className="flex justify-between items-center pb-7 border-b">
      <div className="flex flex-col gap-1 max-w-[65%] md:gap-2">
        <h3 className="text-sm font-semibold md:text-base">
          {item?.info?.name}
        </h3>
        <p className="text-sm md:text-base">
          ₹{' '}
          {item?.info?.price
            ? String(item?.info?.price).slice(0, 3)
            : String(item?.info?.defaultPrice).slice(0, 3)}
        </p>
        <p className="text-sm text-gray-400 md:text-base">
          {item?.info?.description}
        </p>
      </div>

      <div className="max-w-[30%] relative">
        <img
          className="w-[170px] h-[78px] md:h-[125px] object-cover rounded-xl"
          src={
            'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/' +
            item?.info?.imageId
          }
          alt={item?.info?.name}
        />

        <button
          disabled={loading}
          onClick={() => handleAddItemToCart(item?.info)}
          className="absolute -bottom-3 bg-white text-[#60b246] border w-[80%] left-3 py-1 rounded-lg text-sm font-bold md:text-base md:left-4 hover:bg-gray-50 transition-all duration-300 disabled:cursor-not-allowed"
        >
          {loading ? (
            <ClipLoader
              color={'#60b246'}
              size={15}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          ) : (
            'ADD'
          )}
        </button>
      </div>
    </div>
  )
}

export default MenuCardItem
