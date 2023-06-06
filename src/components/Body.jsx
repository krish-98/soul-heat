import { useState, useEffect } from "react"
import RestaurantCard from "./RestaurantCard"
import { SWIGGY_API } from "../constants"
import Shimmer from "./Shimmer"

const Body = () => {
  const [filteredRestaurants, setFilteredRestaurants] = useState([])
  const [allRestaurants, setAllRestaurants] = useState([])
  const [searchText, setSearchText] = useState("")

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const res = await fetch(SWIGGY_API)
      const jsonData = await res.json()
      console.log(jsonData)
      setAllRestaurants(
        jsonData?.data?.cards[2]?.data?.data?.cards ||
          jsonData?.data?.cards[0]?.data?.data?.cards
      )
      setFilteredRestaurants(
        jsonData?.data?.cards[2]?.data?.data?.cards ||
          jsonData?.data?.cards[0]?.data?.data?.cards
      )
    } catch (error) {
      console.log(error)
    }
  }

  const filterRestaurant = (searchText, restaurants) => {
    const filteredData = restaurants.filter((res) =>
      res?.data?.name?.toLowerCase()?.includes(searchText?.toLowerCase())
    )

    return filteredData
  }

  const handleForm = (e) => {
    e.preventDefault()

    const data = filterRestaurant(searchText, allRestaurants)
    setFilteredRestaurants(data)
    setSearchText("")
  }

  return (
    <main className="pt-6 px-4">
      <form
        className="flex justify-center max-w-[600px] mx-auto"
        onSubmit={handleForm}
      >
        <input
          className="w-full pl-4 h-10 rounded-l-xl ring-1 ring-gray-300 focus:outline-[#f9bca8]"
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value)
          }}
        />
        <button
          type="submit"
          className="bg-[#f26434] text-white py-1 px-5 rounded-r-xl hover:bg-[#f26434]transition-all duration-300"
        >
          Search
        </button>
      </form>

      {allRestaurants?.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="flex flex-wrap justify-center items-center mt-14 gap-10">
          {filteredRestaurants?.length === 0 ? (
            <h1>No Restaurant matches your Filter!</h1>
          ) : (
            filteredRestaurants?.map((restaurant) => (
              <RestaurantCard
                key={restaurant?.data?.id}
                {...restaurant?.data}
              />
            ))
          )}
        </div>
      )}
    </main>
  )
}

export default Body
