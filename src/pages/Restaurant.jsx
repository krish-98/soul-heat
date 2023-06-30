import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import ShimmerTwo from "../components/ShimmerTwo"
import RestaurantHeader from "../components/RestaurantHeader"
import RestaurantMenu from "../components/RestaurantMenu"

const Restaurant = () => {
  console.log("Restaurant")
  const [restaurantMenu, setRestaurantMenu] = useState(null)
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
    // console.log(jsonData?.data?.cards)
    setRestaurantMenu(jsonData?.data?.cards)
  }

  console.log(restaurantMenuLists)
  return (
    <div className="mt-8 flex flex-col items-center px-6 max-w-[968px] mx-auto relative">
      {!restaurantMenu ? (
        <ShimmerTwo />
      ) : (
        <>
          <RestaurantHeader
            restaurantHeader={restaurantMenu?.[0]?.card?.card?.info}
          />
          <RestaurantMenu restaurantMenuLists={restaurantMenuLists} />
        </>
      )}
    </div>
  )
}

export default Restaurant
