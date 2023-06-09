import { useDispatch, useSelector } from "react-redux"
import { CLOUDINARY_IMAGE_ID } from "../configs/constants"
import { addToCart, calculateCartTotal } from "../features/cartSlice"
import { addDoc, collection } from "firebase/firestore"
import { db } from "../configs/firebase.config"

const RestaurantMenu = ({ restaurantMenuLists }) => {
  console.log("RestaurantMenu")
  const dispatch = useDispatch()

  // const {cartItems}  = useSelector(store => store.cart)

  const menuDishes =
    restaurantMenuLists?.itemCards ||
    restaurantMenuLists?.categories?.[0]?.itemCards

  const colRef = collection(db, "cartItems")

  const addItemToCart = async (item) => {
    dispatch(addToCart(item))

    dispatch(calculateCartTotal())
    await addDoc(colRef, item)
  }

  return (
    <div className="space-y-4 mt-6 w-full md:space-y-2">
      <div className="flex items-center justify-between mb-2 md:mb-6">
        <h2 className="font-semibold text-lg md:text-2xl">
          {restaurantMenuLists?.title}
        </h2>
      </div>

      {menuDishes?.map((list) => (
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
              alt={list?.card?.info?.name}
            />

            <button
              onClick={() => addItemToCart(list?.card?.info)}
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
