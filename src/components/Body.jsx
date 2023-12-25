import { useState, useEffect } from 'react'
import { SWIGGY_API } from '../configs/constants'
import RestaurantCard from './RestaurantCard'
import Shimmer from './Shimmer'

const filterRestaurant = (searchText, restaurants) => {
  const filteredData = restaurants?.filter((res) =>
    res?.info?.name?.toLowerCase()?.includes(searchText?.toLowerCase())
  )

  return filteredData
}

const Body = () => {
  const [filteredRestaurants, setFilteredRestaurants] = useState(null)
  const [allRestaurants, setAllRestaurants] = useState(null)
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    const fetchRestaurantsData = async () => {
      try {
        const res = await fetch(SWIGGY_API)
        const data = await res.json()

        const restaurantData =
          data?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants ||
          data?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle
            ?.restaurants

        setAllRestaurants(restaurantData)
        setFilteredRestaurants(restaurantData)
      } catch (error) {
        console.error(error)
      }
    }

    fetchRestaurantsData()
  }, [])

  const searchFormHandler = (e) => {
    e.preventDefault()

    const data = filterRestaurant(searchText, allRestaurants)
    setFilteredRestaurants(data)
    setSearchText('')
  }

  return (
    <main className="py-8 px-4 bg-[#f5f3f3] min-h-screen">
      <div className="max-w-[1280px] mx-auto">
        <form
          onSubmit={searchFormHandler}
          className="flex justify-center max-w-[600px] mx-auto"
        >
          <input
            onChange={(e) => {
              setSearchText(e.target.value)
            }}
            className="w-full pl-4 h-10 rounded-l-xl border-none outline-none focus:ring-[#fb923c]"
            type="text"
            placeholder="Search..."
            value={searchText}
          />
          <button
            type="submit"
            className="bg-[#fb923c] text-white py-1 px-5 rounded-r-xl hover:bg-[#f26434]transition-all duration-300 outline-[#fb923c]"
          >
            Search
          </button>
        </form>

        {!allRestaurants || allRestaurants?.length === 0 ? (
          <Shimmer />
        ) : (
          <div className="flex flex-wrap justify-center items-center mt-10 gap-10">
            {filteredRestaurants?.length === 0 ? (
              <h1>No Restaurant matches your Filter!</h1>
            ) : (
              filteredRestaurants?.map((restaurant) => (
                <RestaurantCard
                  key={restaurant?.info?.id}
                  {...restaurant?.info}
                />
              ))
            )}
          </div>
        )}
      </div>
    </main>
  )
}

export default Body
