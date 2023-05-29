import { CLOUDINARY_IMAGE_ID } from "../constants"
import { Link } from "react-router-dom"

const RestaurantCard = ({
  name,
  avgRating,
  cloudinaryImageId,
  cuisines,
  id,
}) => {
  return (
    <Link
      to={`/restaurant/${id}`}
      className="w-72 h-[340px] flex flex-col items-start gap-2 rounded-t-3xl border border-[#ebebeb] p-4 group hover:shadow-lg transition-all duration-500 delay-100 cursor-pointer"
    >
      <img
        className="w-full object-contain rounded-b-3xl group-hover:scale-105 transition-all duration-500 delay-100"
        src={CLOUDINARY_IMAGE_ID + cloudinaryImageId}
        alt={`${name} image`}
      />
      <h2 className="font-bold text-lg">{name}</h2>
      <h3 className="text-sm font-medium">
        {cuisines.length > 8
          ? cuisines?.slice(0, 8).join(", ") + " & more"
          : cuisines?.join(", ")}
      </h3>
      <span
        className={`text-xs text-white px-2 py-1 ${
          Number(avgRating) < 4 ? "bg-[#db7c38]" : "bg-[#48c479]"
        } ${avgRating === "--" && "bg-[#FFD95A] text-[#4C3D3D]"}`}
      >
        ⭐ {avgRating === "--" ? "No Ratings" : avgRating}
      </span>
    </Link>
  )
}
export default RestaurantCard
