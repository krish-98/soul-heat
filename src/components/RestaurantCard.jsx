import { Link } from 'react-router-dom'
import { AiFillStar } from 'react-icons/ai'
import { MdOutlineDeliveryDining } from 'react-icons/md'

const RestaurantCard = ({
  name,
  avgRating,
  cloudinaryImageId,
  cuisines,
  id,
  aggregatedDiscountInfoV3,
  sla: { slaString },
}) => {
  return (
    <Link
      to={`/restaurant/${id}`}
      className="w-72 h-[350px] flex flex-col items-start gap-2 p-4 cursor-pointer rounded-b-3xl border bg-[#f9f8f8] hover:shadow-lg transition-all duration-500 delay-100 outline-[#fb923c] group relative"
    >
      <img
        className="w-[280px] h-[185px] object-cover rounded-b-3xl group-hover:scale-105 transition-all duration-500 delay-100 pt-1"
        src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${cloudinaryImageId}`}
        alt={`${name} image`}
      />
      <h2 className="font-bold text-lg truncate">{name}</h2>
      <h3 className="text-sm font-medium w-64 truncate">
        {cuisines?.length > 0
          ? cuisines?.slice(0, 6).join(', ') + ' & more'
          : cuisines?.join(', ')}
      </h3>

      <div className="flex items-center justify-between w-full pt-2">
        <div
          className={`flex items-center gap-1 text-xs text-white font-semibold px-2 py-1 ${
            Number(avgRating) < 4 ? 'bg-[#db7c38]' : 'bg-[#48c479]'
          } ${avgRating === '--' && 'bg-[#FFD95A] text-[#4C3D3D]'}`}
        >
          <AiFillStar className="w-3 h-6" />
          <span className="font-bold">
            {avgRating === '--' ? 'No Ratings' : avgRating}
          </span>
        </div>

        <div className="flex items-center">
          <MdOutlineDeliveryDining className="w-6 h-7" />
          <p className="text-xs font-semibold  px-2 py-1">
            {slaString && slaString}
          </p>
        </div>

        {aggregatedDiscountInfoV3?.header &&
          aggregatedDiscountInfoV3?.header !== 'ITEMS' && (
            <p className="absolute top-0 right-0 bg-[#FB3C46] text-[#FBF23C] p-2 rounded-bl-md text-xs font-bold">
              {aggregatedDiscountInfoV3?.header}
            </p>
          )}
      </div>
    </Link>
  )
}
export default RestaurantCard
