import React, { useEffect, useState } from 'react'

export default function Orders() {
  const [orderedItems, setOrderedItems] = useState([])

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        const res = await fetch('/api/order/order-details')
        const data = await res.json()

        setOrderedItems(data)
      } catch (error) {
        console.error(error)
        console.error(error.message)
      }
    }

    getOrderDetails()
  }, [])

  console.log(orderedItems)
  return (
    <div className="px-6">
      <div className="max-w-5xl mx-auto my-6">
        <h2 className="text-2xl md:text-3xl font-semibold my-8">My Orders</h2>

        {!orderedItems.length ? (
          <p>No orders yet</p>
        ) : (
          <div className="border shadow-2xl flex flex-col gap-6 rounded-2xl py-6 md:px-4">
            <p className="px-4 font-medium">Order details</p>
            {orderedItems.map((item) => {
              return (
                <div
                  key={item._id}
                  className="border rounded-2xl pr-4 mx-4 flex items-center gap-4"
                >
                  <img
                    className="w-[100px] h-[80px] md:w-[170px] md:h-[125px] object-cover rounded-l-xl"
                    src={
                      'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/' +
                      item.imageId
                    }
                    alt={item.name}
                  />

                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="font-semibold text-sm">{item.price}</p>
                    <p>x {item.quantity}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
        {/* <h1>Hello</h1> */}
      </div>
    </div>
  )
}
