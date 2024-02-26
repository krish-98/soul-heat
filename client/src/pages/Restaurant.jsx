import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ShimmerTwo from '../components/ShimmerTwo'
import RestaurantHeader from '../components/RestaurantHeader'
import RestaurantDishes from '../components/RestaurantDishes'

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
  }, [])

  const restaurantHeader =
    restaurantMenu?.[0]?.card?.card?.info ||
    restaurantMenu?.[2]?.card?.card?.info

  const findMenuList = restaurantMenu?.filter((list) => list?.groupedCard)
  const restaurantMenuLists =
    findMenuList?.[0]?.groupedCard?.cardGroupMap?.REGULAR?.cards

  return (
    <div className="mt-10 flex flex-col items-center px-6 max-w-5xl mx-auto relative">
      {!restaurantMenu ? (
        <ShimmerTwo />
      ) : (
        <>
          <RestaurantHeader restaurantHeader={restaurantHeader} />
          <RestaurantDishes restaurantMenuLists={restaurantMenuLists} />
        </>
      )}
    </div>
  )
}

export default Restaurant
