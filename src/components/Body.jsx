import { useState, useEffect } from "react"
import RestaurantCard from "./RestaurantCard"
import { SWIGGY_API } from "../configs/constants"
import Shimmer from "./Shimmer"

const Body = () => {
  console.log("Body")
  const [filteredRestaurants, setFilteredRestaurants] = useState(null)
  const [allRestaurants, setAllRestaurants] = useState(null)
  const [searchText, setSearchText] = useState("")

  const fetchData = async () => {
    try {
      const res = await fetch(SWIGGY_API)
      const jsonData = await res.json()
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

  useEffect(() => {
    fetchData()
  }, [])

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
    <main className="py-8 px-4 bg-[#f5f3f3] min-h-screen">
      <form
        className="flex justify-center max-w-[600px] mx-auto"
        onSubmit={handleForm}
      >
        <input
          className="w-full pl-4 h-10 rounded-l-xl border-none outline-none focus:ring-[#fb923c]"
          type="text"
          placeholder="Search..."
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value)
          }}
        />
        <button
          type="submit"
          className="bg-[#fb923c] text-white py-1 px-5 rounded-r-xl hover:bg-[#f26434]transition-all duration-300 outline-[#fb923c]"
        >
          Search
        </button>
      </form>

      {!allRestaurants ? (
        <Shimmer />
      ) : (
        <div className="flex flex-wrap justify-center items-center mt-10 gap-10">
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
