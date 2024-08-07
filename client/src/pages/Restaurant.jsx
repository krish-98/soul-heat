import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import RestaurantHeader from '../components/Restaurant/RestaurantHeader'
import RestaurantMenu from '../components/Restaurant/RestaurantMenu'
import RestaurantShimmer from '../components/Restaurant/RestaurantShimmer'

const Restaurant = () => {
  const [restaurantMenu, setRestaurantMenu] = useState(null)
  const { resId } = useParams()

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })

    const fetchRestaurantMenu = async () => {
      try {
        const res = await fetch(`/api/restaurant/${resId}`)
        if (!res.ok) {
          throw new Error('Network error occured!')
        }

        const jsonData = await res.json()
        setRestaurantMenu(jsonData?.data?.cards)
      } catch (error) {
        console.error(error)
      }
    }

    fetchRestaurantMenu()
  }, [resId])

  const restaurantHeader =
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
        <>
          <RestaurantHeader restaurantHeader={restaurantHeader} />
          <RestaurantMenu restaurantMenuLists={restaurantMenuLists} />
        </>
      )}
    </div>
  )
}

export default Restaurant
