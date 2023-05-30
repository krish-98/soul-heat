import { AiFillStar } from "react-icons/ai"
import { CLOUDINARY_IMAGE_ID } from "../constants"

const RestaurantDetails = ({ restaurantDetails }) => {
  return (
    <div
      // style={
      //   restaurantDetails?.cloudinaryImageId && {
      //     backgroundImage: `url(${
      //       CLOUDINARY_IMAGE_ID + restaurantDetails?.cloudinaryImageId
      //     })`,
      //     backgroundRepeat: "no-repeat",
      //     width: "100%",
      //     // color: "#fff",
      //     backgroundPosition: "center",
      //   }
      // }
      className="flex items-center justify-between w-full border-b border-b-gray-200 pb-5"
    >
      <div className="space-y-1">
        <h1 className="text-3xl font-bold tracking-wide">
          {restaurantDetails?.name}
        </h1>
        <p className="text-sm">{restaurantDetails?.cuisines?.join(", ")}</p>
        <p className="text-sm">{restaurantDetails?.city}</p>
      </div>

      <div className="w-[100px] border px-1 py-2 shadow rounded-md font-semibold md:w-[80px] md:px-2">
        <span
          className={`text-base border-b pb-2 flex items-center justify-center gap-2 ${
            Number(restaurantDetails?.avgRating) < 4
              ? "text-[#db7c38]"
              : "text-[#48c479]"
          } ${
            restaurantDetails?.avgRating === "--" &&
            "bg-[#FFD95A] text-[#4C3D3D]"
          }`}
        >
          <AiFillStar className="w-4 h-4" />
          <span>{restaurantDetails?.avgRating}</span>
        </span>
        <p className="text-xs pt-2 text-center">
          {restaurantDetails?.totalRatingsString}
        </p>
      </div>
    </div>
  )
}

export default RestaurantDetails
