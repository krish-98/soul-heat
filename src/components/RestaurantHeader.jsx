import { AiFillStar } from "react-icons/ai"
import { Link } from "react-router-dom"
import { IoCartOutline } from "react-icons/io5"
import { useSelector } from "react-redux"

const RestaurantHeader = ({ restaurantHeader }) => {
  const { totalItems } = useSelector((store) => store.cart)

  return (
    <div className="flex items-center justify-between w-full border-b border-b-gray-200 pb-5">
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-wide">
          {restaurantHeader?.name}
        </h1>
        <p className="text-sm">{restaurantHeader?.cuisines?.join(", ")}</p>
        <p className="text-sm">{restaurantHeader?.city}</p>
      </div>

      <div className="w-[100px] border px-1 py-2 shadow rounded-md font-semibold md:w-[80px] md:px-2">
        <span
          className={`text-base border-b pb-2 flex items-center justify-center gap-2 ${
            Number(restaurantHeader?.avgRating) < 4
              ? "text-[#db7c38]"
              : "text-[#48c479]"
          } ${
            restaurantHeader?.avgRating === "--" &&
            "bg-[#FFD95A] text-[#4C3D3D]"
          }`}
        >
          <AiFillStar className="w-4 h-4" />
          <span>{restaurantHeader?.avgRating}</span>
        </span>
        <p className="text-xs pt-2 text-center">
          {restaurantHeader?.totalRatingsString}
        </p>
      </div>

      {/* Another cart icon, If the user scrolls down on the page */}
      {totalItems > 0 && (
        <Link
          to="/cart"
          className="fixed bottom-6 right-36 z-20 bg-[#FB3C46] flex items-center py-2 px-5 rounded-lg md:right-1/3 xl:right-1/2 hover:bg-[#fb923c]"
        >
          <span className="text-white font-semibold">Cart - </span>
          <div className="relative">
            <IoCartOutline className="w-7 h-6 stroke-white cursor-pointer" />

            <div className="absolute -right-1 bottom-3 text-[#FB3C46] bg-white w-4 h-4 rounded-full">
              <p className="text-center text-text font-semibold text-xs">
                {totalItems}
              </p>
            </div>
          </div>
        </Link>
      )}
    </div>
  )
}

export default RestaurantHeader
