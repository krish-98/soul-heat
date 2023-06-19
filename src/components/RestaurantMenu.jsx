import { useDispatch } from "react-redux"
import { CLOUDINARY_IMAGE_ID } from "../configs/constants"
import { addToCart, calculateCartTotal } from "../features/cartSlice"

import { MdKeyboardArrowUp } from "react-icons/md"
// import { LuSquareDot, LuCircleDot } from "react-icons/lib"

const RestaurantMenu = ({ restaurantMenuLists }) => {
  console.log("RestaurantMenu")
  const dispatch = useDispatch()

  const addItem = (item) => {
    dispatch(addToCart(item))
    dispatch(calculateCartTotal())
  }

  return (
    <div className="space-y-4 mt-6 w-full md:space-y-2">
      <div className="flex items-center justify-between mb-2 md:mb-6">
        <h2 className="font-semibold text-lg md:text-2xl">
          {restaurantMenuLists?.title}
        </h2>

        {/* <MdKeyboardArrowUp className="w-6 h-6 md:w-10 md:h-10" /> */}
      </div>

      {restaurantMenuLists?.itemCards?.map((list) => (
        <div
          key={list?.card?.info?.id}
          className="flex justify-between items-center pb-7 border-b"
        >
          <div className="flex flex-col gap-1 max-w-[65%] md:gap-2">
            <h3 className="text-sm font-semibold md:text-lg">
              {list?.card?.info?.name}
            </h3>
            <p className="text-sm md:text-base">
              ₹ {String(list?.card?.info?.price).slice(0, 3)}
            </p>
            <p className="text-sm text-gray-400 md:text-base">
              {list?.card?.info?.description}
            </p>
          </div>

          <div className="max-w-[30%] relative">
            <img
              className="w-[170px] rounded-xl"
              src={CLOUDINARY_IMAGE_ID + list?.card?.info?.imageId}
              alt=""
            />

            <button
              onClick={() => addItem(list?.card?.info)}
              className="absolute -bottom-3 bg-white text-[#60b246] border w-[80%] left-3 py-1 rounded-lg text-sm font-bold md:text-base md:left-4 hover:bg-gray-50 transition-all duration-300"
            >
              ADD
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
export default RestaurantMenu
