import { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, calculateCartTotal } from '../features/cartSlice'
import { ClipLoader } from 'react-spinners'

const MenuCard = ({ item }) => {
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const handleAddItemToCart = async (item) => {
    try {
      if (user === null) {
        return toast.error('Sign In to add item', {
          position: 'top-center',
        })
      }

      setLoading(true)
      const res = await fetch('/api/cart/add-item', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: item?.id,
          name: item?.name,
          category: item?.category,
          description: item?.description,
          imageId: item?.imageId,
          price: item?.price || item?.defaultPrice,
          quantity: 1,
          userRef: user?._id,
        }),
      })

      if (!res.ok) {
        throw new Error('Newtork error occurred')
      }
      const data = await res.json()

      dispatch(addToCart(data))
      dispatch(calculateCartTotal())
      setLoading(false)
    } catch (error) {
      setLoading(false)
      toast(`Something went wrong!`, {
        icon: '🙄',
      })
      console.log(error)
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

export default MenuCard
