import { useDispatch } from 'react-redux'
import { addToCart, calculateCartTotal } from '../features/cartSlice'

const RestaurantMenu = ({ restaurantMenuLists }) => {
  const dispatch = useDispatch()

  const menuDishes =
    restaurantMenuLists?.itemCards ||
    restaurantMenuLists?.categories?.[0]?.itemCards ||
    restaurantMenuLists?.carousel

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

      {menuDishes?.map((list) => {
        const item = list?.card || list?.dish

        return (
          <div
            key={item?.info?.id || list?.dish?.info?.id}
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
                className="w-[170px] rounded-xl"
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
