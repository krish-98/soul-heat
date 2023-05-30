import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { CLOUDINARY_IMAGE_ID } from "../constants"

import RestaurantDetails from "./RestaurantDetails"
import { MdKeyboardArrowUp } from "react-icons/md"
import Shimmer from "./Shimmer"

// import { LuSquareDot, LuCircleDot } from "react-icons/lib"

const RestaurantMenu = () => {
  const [restaurantMenu, setRestaurantMenu] = useState([])
  const { resId } = useParams()
  const restaurantMenuLists =
    restaurantMenu?.[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
      ?.card?.itemCards ||
    restaurantMenu?.[3]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
      ?.card?.itemCards

  useEffect(() => {
    fetchRestaurantMenu()
  }, [])

  async function fetchRestaurantMenu() {
    const res = await fetch(
      "https://corsproxy.io/?" +
        encodeURIComponent(
          `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=13.0827&lng=80.2707&restaurantId=${resId}&submitAction=ENTER`
        )
    )
    const jsonData = await res.json()
    console.log(jsonData?.data?.cards)
    setRestaurantMenu(jsonData?.data?.cards)
  }

  return (
    <div className="mt-8 flex flex-col items-center px-6 max-w-[968px] mx-auto">
      {restaurantMenu.length > 0 ? (
        <>
          <RestaurantDetails
            restaurantDetails={restaurantMenu?.[0]?.card?.card?.info}
          />

          <div className="space-y-4 mt-6 w-full md:space-y-2">
            <div className="flex items-center justify-between mb-2 md:mb-6">
              <h2 className="font-semibold text-lg md:text-2xl ">
                {restaurantMenu[2]?.groupedCard
                  ? restaurantMenu[2]?.groupedCard?.cardGroupMap?.REGULAR
                      ?.cards[1]?.card?.card?.title
                  : restaurantMenu[3]?.groupedCard?.cardGroupMap?.REGULAR
                      ?.cards[1]?.card?.card?.title}
              </h2>

              {/* <MdKeyboardArrowUp className="w-6 h-6 md:w-10 md:h-10" /> */}
            </div>

            {restaurantMenuLists?.map((list) => (
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

                  <button className="absolute -bottom-3 bg-white text-[#60b246] border w-[80%] left-3 py-1 rounded-lg text-sm font-bold md:text-base md:left-4 hover:bg-gray-50 transition-all duration-300">
                    ADD
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <Shimmer />
      )}
    </div>
  )
}
export default RestaurantMenu
