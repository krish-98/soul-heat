import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import RestaurantDetails from "./RestaurantDetails"
import Shimmer from "./Shimmer"
import RestaurantMenu from "./RestaurantMenu"
import ShimmerTwo from "./ShimmerTwo"

const Restaurant = () => {
  console.log("Restaurant")
  const [restaurantMenu, setRestaurantMenu] = useState(null)
  const { resId } = useParams()

  const restaurantMenuLists =
    restaurantMenu?.[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
      ?.card ||
    restaurantMenu?.[3]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
      ?.card

  const fetchRestaurantMenu = async () => {
    const res = await fetch(
      "https://corsproxy.io/?" +
        encodeURIComponent(
          `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=13.0827&lng=80.2707&restaurantId=${resId}&submitAction=ENTER`
        )
    )
    const jsonData = await res.json()
    // console.log(jsonData?.data?.cards)
    setRestaurantMenu(jsonData?.data?.cards)
  }

  useEffect(() => {
    fetchRestaurantMenu()
  }, [])

  // console.log(restaurantMenu)
  console.log(restaurantMenuLists)
  return (
    <div className="mt-8 flex flex-col items-center px-6 max-w-[968px] mx-auto relative">
      {!restaurantMenu ? (
        <ShimmerTwo />
      ) : (
        <>
          <RestaurantDetails
            restaurantDetails={restaurantMenu?.[0]?.card?.card?.info}
          />

          <RestaurantMenu restaurantMenuLists={restaurantMenuLists} />
        </>
      )}
    </div>
  )
}

export default Restaurant
