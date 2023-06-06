import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

import RestaurantDetails from "./RestaurantDetails"
import Shimmer from "./Shimmer"
import RestaurantMenu from "./RestaurantMenu"

const Restaurant = () => {
  const [restaurantMenu, setRestaurantMenu] = useState([])
  const { resId } = useParams()

  const restaurantMenuLists =
    restaurantMenu?.[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
      ?.card ||
    restaurantMenu?.[3]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
      ?.card

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

  console.log(restaurantMenu)
  return (
    <div className="mt-8 flex flex-col items-center px-6 max-w-[968px] mx-auto">
      {restaurantMenu.length > 0 ? (
        <>
          <RestaurantDetails
            restaurantDetails={restaurantMenu?.[0]?.card?.card?.info}
          />

          <RestaurantMenu restaurantMenuLists={restaurantMenuLists} />
        </>
      ) : (
        <Shimmer />
      )}
    </div>
  )
}

export default Restaurant
