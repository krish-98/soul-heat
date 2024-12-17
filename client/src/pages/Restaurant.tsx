import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { MenuItem } from '../types'

import RestaurantHeader from '../components/Restaurant/RestaurantHeader'
import RestaurantMenu from '../components/Restaurant/RestaurantMenu'
import RestaurantShimmer from '../components/Restaurant/RestaurantShimmer'
import { BsArrowLeft } from 'react-icons/bs'

const Restaurant = () => {
  const [restaurantMenu, setRestaurantMenu] = useState<MenuItem | null>(null)
  const { resId } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })

    const fetchRestaurantMenu = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/restaurant/${resId}`
        )
        if (!res.ok) {
          throw new Error('Network error occured!')
        }

        const data = await res.json()
        setRestaurantMenu(data?.data?.cards)
      } catch (error) {
        console.error(error)
      }
    }

    fetchRestaurantMenu()
  }, [resId])

  const restaurantDetail =
    restaurantMenu?.[0]?.card?.card?.info ||
    restaurantMenu?.[2]?.card?.card?.info

  const findMenuList = restaurantMenu?.filter((list) => list?.groupedCard)
  const restaurantMenuLists =
    findMenuList?.[0]?.groupedCard?.cardGroupMap?.REGULAR?.cards

  return (
    <div className="mt-10 flex flex-col items-center px-6 max-w-5xl mx-auto relative">
      {!restaurantMenu ? (
        <RestaurantShimmer />
      ) : (
        <div>
          <button
            onClick={() => navigate(-1)}
            className="self-start flex items-center gap-1 bg-slate-100 px-4 py-0.5 rounded-lg hover:bg-slate-300 mb-6"
          >
            <BsArrowLeft />
            Back
          </button>
          <RestaurantHeader restaurantDetail={restaurantDetail} />
          <RestaurantMenu
            restaurantMenuLists={restaurantMenuLists}
            restaurantDetail={restaurantDetail}
          />
        </div>
      )}
    </div>
  )
}

export default Restaurant
