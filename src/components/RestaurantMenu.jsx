import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

const RestaurantMenu = () => {
  const [restaurantMenu, setRestaurantMenu] = useState([])
  const { resId } = useParams()

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
    const data = await res.json()
    setRestaurantMenu(data?.data?.cards)
    console.log(data?.data?.cards)
  }

  return (
    <div className="mt-8 flex flex-col items-center px-6">
      {/* Restaurant Details */}
      <div className="flex items-center justify-between gap-4 border-b border-b-gray-200 pb-2">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-wide">
            {restaurantMenu[0]?.card?.card?.info?.name}
          </h1>
          <p className="text-sm">
            {restaurantMenu[0]?.card?.card?.info?.cuisines?.join(", ")}
          </p>
          <p className="text-sm">{restaurantMenu[0]?.card?.card?.info?.city}</p>
        </div>

        <div className="border px-3 py-2 shadow rounded-md text-center">
          <p className="text-sm border-b pb-2">
            {restaurantMenu[0]?.card?.card?.info?.avgRating} ⭐
          </p>
          <p className="text-sm pt-2">
            {restaurantMenu[0]?.card?.card?.info?.totalRatingsString}
          </p>
        </div>
      </div>

      {/* Menus */}
      <div></div>
      <div></div>
    </div>
  )
}
export default RestaurantMenu
