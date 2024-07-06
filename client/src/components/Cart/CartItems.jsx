import React from 'react'

export default function CartItems({
  item,
  loading,
  handleIncreaseQty,
  handleDecreaseQty,
}) {
  return (
    <div key={item?._id} className="flex items-center gap-8">
      <div className="max-w-[35%]">
        <img
          className="w-[170px] h-[78px] md:h-[125px] object-cover rounded-xl"
          src={
            'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/' +
            item?.imageId
          }
          alt={item?.name}
        />
      </div>

      <div className="flex flex-col gap-1 max-w-[60%]">
        <h3 className="text-sm font-medium md:text-lg">{item?.name} </h3>
        <p className="text-sm md:text-base font-bold">
          ₹{' '}
          {item.price
            ? String(item.price).slice(0, 3)
            : String(item.defaultPrice).slice(0, 3)}{' '}
          <span className="text-[#f26434] font-normal">
            ( x {item?.quantity})
          </span>
        </p>

        <div className="flex items-center gap-2">
          <button
            onClick={() => handleDecreaseQty(item)}
            disabled={loading}
            className="bg-[#fb923c] text-white font-bold p-2 py-0.5 rounded-md disabled:cursor-not-allowed"
          >
            -
          </button>
          <p className="font-semibold">{item?.quantity}</p>
          <button
            onClick={() => handleIncreaseQty(item)}
            disabled={loading}
            className="bg-[#fb923c] text-white font-bold p-2 py-0.5 rounded-md disabled:cursor-not-allowed"
          >
            +
          </button>
        </div>
      </div>
    </div>
  )
}
