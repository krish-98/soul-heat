import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ShimmerTwo from '../components/ShimmerTwo'
import RestaurantHeader from '../components/RestaurantHeader'
import RestaurantDishes from '../components/RestaurantDishes'
import { BsArrowLeft } from 'react-icons/bs'

const Restaurant = () => {
  const [restaurantMenu, setRestaurantMenu] = useState(null)
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
        const res = await fetch(`/api/restaurant/${resId}`)
        const jsonData = await res.json()

        setRestaurantMenu(jsonData?.data?.cards)
      } catch (error) {
        console.error(error)
      }
    }

    fetchRestaurantMenu()
  }, [])

  const restaurantMenuLists =
    restaurantMenu?.[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[1]?.card
      ?.card ||
    restaurantMenu?.[3]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[1]?.card
      ?.card ||
    restaurantMenu?.[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[2]?.card
      ?.card ||
    restaurantMenu?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.[2]?.card
      ?.card

  const restaurantHeader =
    restaurantMenu?.[0]?.card?.card?.info ||
    restaurantMenu?.[2]?.card?.card?.info

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
          <RestaurantHeader restaurantHeader={restaurantHeader} />
          <RestaurantDishes restaurantMenuLists={restaurantMenuLists} />
        </>
      )}
    </div>
  )
}

export default Restaurant
