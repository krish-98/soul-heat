import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import ShimmerTwo from "../components/ShimmerTwo"
import RestaurantHeader from "../components/RestaurantHeader"
import RestaurantMenu from "../components/RestaurantMenu"
import { BsArrowLeft } from "react-icons/bs"
import { RESTAURANT_ID } from "../configs/constants"

const Restaurant = () => {
  const [restaurantMenu, setRestaurantMenu] = useState(null)
  const { resId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    fetchRestaurantMenu()
  }, [])

  async function fetchRestaurantMenu() {
    const res = await fetch(`${RESTAURANT_ID}&restaurantId=${resId}`)
    const jsonData = await res.json()
    setRestaurantMenu(jsonData?.data?.cards)
  }

  const restaurantMenuLists =
    restaurantMenu?.[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[1]?.card
      ?.card ||
    restaurantMenu?.[3]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[1]?.card
      ?.card ||
    restaurantMenu?.[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[2]?.card
      ?.card

  // console.log(restaurantMenuLists?.carousel)

  return (
    <div className="mt-12 flex flex-col items-center px-6 max-w-[968px] mx-auto relative">
      {!restaurantMenu ? (
        <ShimmerTwo />
      ) : (
        <>
          <button
            onClick={() => navigate(-1)}
            className="relative -top-7 right-32 md:right-80 lg:right-[27rem] px-4 flex items-center gap-1 bg-slate-100 py-0.5 rounded-lg hover:bg-slate-300"
          >
            <BsArrowLeft />
            back
          </button>
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
