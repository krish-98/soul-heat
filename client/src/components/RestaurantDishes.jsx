import { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, calculateCartTotal } from '../features/cartSlice'
import Accordion from './Accordion'

const RestaurantDishes = ({ restaurantMenuLists }) => {
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  const MenuLists = restaurantMenuLists?.filter(
    (list) =>
      list?.card?.card['@type'] ===
      'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'
  )

  const handleAddItemToCart = async (item) => {
    try {
      if (!user) {
        toast.error('Sign In to add item', {
          position: 'top-center',
        })
        return
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
          price: item?.price || item.defaultPrice,
          quantity: 1,
          userRef: user?._id,
        }),
      })
      const data = await res.json()

      if (data.success === false) {
        toast.error('Something went wrong', {
          position: 'top-center',
        })
        return
      }

      dispatch(addToCart(data))
      dispatch(calculateCartTotal())
      setLoading(false)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="mt-6 w-full space-y-4 md:space-y-8">
      {MenuLists?.map((menu, i) => (
        <Accordion
          key={i}
          menu={menu}
          loading={loading}
          handleAddItemToCart={handleAddItemToCart}
        />
      ))}
    </div>
  )
}

export default RestaurantDishes
