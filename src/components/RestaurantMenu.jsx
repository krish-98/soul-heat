import { useDispatch } from 'react-redux'
import { addToCart, calculateCartTotal } from '../features/cartSlice'

const RestaurantMenu = ({ restaurantMenuLists }) => {
  const dispatch = useDispatch()

  const dishes =
    restaurantMenuLists?.itemCards ||
    restaurantMenuLists?.categories?.[0]?.itemCards ||
    restaurantMenuLists?.carousel

  // const addItemToCart = async (item) => {
  //   console.log(item)
  //   try {
  //     const res = await fetch(process.env.CARTITEMS, {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(item),
  //     })
  //     const cartItems = await res.json()

  //     console.log(cartItems)
  //     dispatch(addToCart(cartItems))
  //     dispatch(calculateCartTotal())
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }

  const addItemToCart = (item) => {
    dispatch(addToCart(item))
    dispatch(calculateCartTotal())
  }

  return (
    <div className="space-y-4 mt-6 w-full md:space-y-2">
      <div className="flex items-center justify-between mb-2 md:mb-6">
        <h2 className="font-semibold text-lg md:text-2xl">
          {restaurantMenuLists?.title}
        </h2>
      </div>

      {dishes?.map((dish) => {
        const item = dish?.card || dish?.dish

        return (
          <div
            key={item?.info?.id || dish?.dish?.info?.id}
            className="flex justify-between items-center pb-7 border-b"
          >
            <div className="flex flex-col gap-1 max-w-[65%] md:gap-2">
              <h3 className="text-sm font-semibold md:text-lg">
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
                onClick={() => addItemToCart(item?.info)}
                className="absolute -bottom-3 bg-white text-[#60b246] border w-[80%] left-3 py-1 rounded-lg text-sm font-bold md:text-base md:left-4 hover:bg-gray-50 transition-all duration-300"
              >
                ADD
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default RestaurantMenu
