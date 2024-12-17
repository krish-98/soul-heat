import { OrderItem } from '../../pages/Orders'

import { TbPackage } from 'react-icons/tb'
import { CiClock2 } from 'react-icons/ci'
import { PiCurrencyInr } from 'react-icons/pi'
import { GoDotFill } from 'react-icons/go'
import { GiForkKnifeSpoon } from 'react-icons/gi'

export default function OrdererdCardItem({ item }: { item: OrderItem }) {
  const calculateTotal = item.orders.reduce((total, currItem) => {
    total = currItem.price * currItem.quantity

    return total
  }, 0)

  return (
    <div className="bg-white rounded-2xl max-w-[350px] hover:shadow-md hover:shadow-shOrange transition-all duration-500">
      <div className="h-48 w-[350px] relative">
        <img
          className="w-full h-full object-cover rounded-t-2xl"
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${item.orders[0].imageId}`}
          alt={item.orders?.[0].name}
        />
        <div className="absolute bottom-0 flex items-center justify-between px-4 w-full bg-black/50 py-2">
          <div className="flex items-center gap-3">
            <div className="bg-white p-1 rounded-md">
              <GiForkKnifeSpoon className="fill-shOrange2 w-5 h-5 " />
            </div>
            <div className="flex flex-col max-w-[200px]">
              <span className="text-white truncate w-3/4">
                {item.orders?.[0].name}
              </span>
              <span className="text-gray-200 text-sm text-wrap">
                {item.orders.length > 1
                  ? `${item.orders?.[0].name} + ${item.orders.length - 1} more`
                  : `${item.orders?.[0].name}`}
              </span>
            </div>
          </div>
          {/* <p className="bg-shOrangeAccent text-shOrange2 rounded-xl px-3 py-0.5 tracking-tight font-semibold">
            Processing
          </p> */}
        </div>
      </div>

      <div className="p-4 space-y-4">
        <div className="flex items-center gap-1">
          <TbPackage className="stroke-shOrange2 w-4 h-4 lg:w-7 lg:h-7" />
          <span className="text-sm font-semibold uppercase">{`#ORD-${item._id}`}</span>
        </div>

        <div className="flex items-center gap-1">
          <CiClock2 className="w-4 h-4" />
          <span className="text-xs lg:text-sm text-gray-500">{`${new Date(
            item.createdAt
          ).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })}`}</span>
        </div>

        {/* <div className="flex items-center gap-1">
          <IoLocationOutline className="fill-shOrange w-4 h-4" />
          <span className="text-xs lg:text-sm text-gray-500">
            123 Main St, Apt 4B, New York, NY 10001
          </span>
        </div> */}

        <div className="flex items-center justify-between bg-[#fff7ed] text-shOrange text-sm lg:text-base font-medium rounded-lg px-4 py-2">
          <span>Total Amount</span>
          <span className="flex items-center">
            <PiCurrencyInr /> {String(calculateTotal).slice(0, 3)}
          </span>
        </div>

        <hr />

        <div className="flex items-center justify-between py-2">
          <span className="bg-green-100 text-green-500 px-4 py-1.5 rounded-2xl flex items-center gap-0.5 text-sm">
            <GoDotFill className="w-4 h-4" />
            {`Payment ${item?.paymentStatus}`}
          </span>
          {/* <Link to="#">
            <MdKeyboardArrowRight className="w-4 h-4 lg:w-7 lg:h-7 text-gray-400" />
          </Link> */}
        </div>
      </div>
    </div>
  )
}
