import { CLOUDINARY_IMAGE_ID } from "../configs/constants"
import { Link } from "react-router-dom"
import { AiFillStar } from "react-icons/ai"

const RestaurantCard = ({
  name,
  avgRating,
  cloudinaryImageId,
  cuisines,
  id,
  aggregatedDiscountInfoV3,
}) => {
  return (
    <Link
      to={`/restaurant/${id}`}
      className="w-72 h-[340px] flex flex-col items-start gap-2 p-4 cursor-pointer rounded-b-3xl border bg-[#f9f8f8]  hover:shadow-lg transition-all duration-500 delay-100 outline-[#fb923c] group relative"
    >
      <img
        className="w-full object-contain rounded-b-3xl group-hover:scale-105 transition-all duration-500 delay-100 pt-1"
        src={CLOUDINARY_IMAGE_ID + cloudinaryImageId}
        alt={`${name} image`}
      />
      <h2 className="font-bold text-lg">{name}</h2>

      <h3 className="text-sm font-medium">
        {cuisines?.length > 0
          ? cuisines?.slice(0, 8).join(", ") + " & more"
          : cuisines?.join(", ")}
      </h3>

      <div className="flex items-center justify-between w-full pt-2">
        <div
          className={`flex items-center gap-1 text-xs text-white font-semibold px-2 py-1 ${
            Number(avgRating) < 4 ? "bg-[#db7c38]" : "bg-[#48c479]"
          } ${avgRating === "--" && "bg-[#FFD95A] text-[#4C3D3D]"}`}
        >
          <AiFillStar className="w-3 h-6" />
          <span>{avgRating === "--" ? "No Ratings" : avgRating}</span>
        </div>

        {aggregatedDiscountInfoV3 && (
          <p className="absolute top-0 right-0 bg-[#FB3C46] text-[#FBF23C] p-2 rounded-bl-md text-xs font-bold">
            {aggregatedDiscountInfoV3?.header}
          </p>
        )}
      </div>
    </Link>
  )
}
export default RestaurantCard
