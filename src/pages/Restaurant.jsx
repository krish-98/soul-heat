import { useState, useEffect } from "react"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import ShimmerTwo from "../components/ShimmerTwo"
import RestaurantHeader from "../components/RestaurantHeader"
import RestaurantMenu from "../components/RestaurantMenu"

import { BsArrowLeft } from "react-icons/bs"

const Restaurant = () => {
  const [restaurantMenu, setRestaurantMenu] = useState(null)
  const { resId } = useParams()
  const navigate = useNavigate()
  // const [searchParams, setSearchParams] = useSearchParams()

  const restaurantMenuLists =
    restaurantMenu?.[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
      ?.card ||
    restaurantMenu?.[3]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card
      ?.card

  useEffect(() => {
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
      // setSearchParams({
      //   restaurant:
      //     jsonData?.data?.cards?.[0]?.card?.card?.info?.slugs?.restaurant,
      // })
    }

    fetchRestaurantMenu()
  }, [])

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
