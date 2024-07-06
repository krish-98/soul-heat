import React from 'react'
import { GiFoodTruck } from 'react-icons/gi'
import { MdDeliveryDining } from 'react-icons/md'
import { IoFastFood } from 'react-icons/io5'
import { BiShoppingBag } from 'react-icons/bi'

export default function OrderedItems({ item }) {
  const calculateTotal = item?.orders?.reduce(
    (acc, currItem) => {
      acc.totalItems += currItem.quantity

      const price = parseInt(String(currItem.price).slice(0, 3), 10)
      acc.totalAmount += price * currItem.quantity

      return acc
    },
    {
      totalItems: 0,
      totalAmount: 0,
    }
  )

  return (
    <div className="border shadow-2xl rounded-2xl flex flex-col justify-between gap-2 p-4 md:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-0.5">
          <span>
            <BiShoppingBag className="h-6 w-6" />
          </span>
          <span className="font-semibold">Order Details</span>
        </div>
        <span
          className={`px-3 py-1.5 rounded-3xl text-sm font-light lg:font-normal tracking-wide ${
            item?.status === 'Processing' &&
            'bg-orange-400 text-white font-bold'
          } ${item?.status === 'Failed' && 'bg-red-400 text-white font-bold'} ${
            item?.status === 'Confirmed' && 'bg-green-400 text-white font-bold'
          }`}
        >
          {item?.status}
        </span>
      </div>

      <div className="space-y-4 py-2">
        {item?.orders?.map((order) => (
          <div
            key={order._id}
            className="flex items-center gap-4 my-2 border rounded-3xl overflow-hidden"
          >
            <img
              className="w-[100px] h-[80px] md:w-[170px] md:h-[125px] object-cover rounded-l-xl"
              src={
                'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/' +
                order.imageId
              }
              alt={order.name}
            />
            <div className="flex-1 space-y-0.5">
              <p className="font-medium text-sm lg:text-base">{order.name}</p>
              <p className="font-semibold text-sm lg:text-base">
                {String(order.price).slice(0, 3).toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'INR',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })}
              </p>
              <p className="text-sm">x {order.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      <hr />
      <div className="py-1 pr-4 self-end lg:text-xl">
        <span>Total: </span>
        <span className="font-semibold">
          {calculateTotal.totalAmount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </span>
      </div>
    </div>
  )
}
