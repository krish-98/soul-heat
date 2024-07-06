import React from 'react'
import OrderedItems from './OrdererdItems'

export default function OrderDetails({ orderedItems }) {
  return (
    <div className="space-y-14">
      {orderedItems?.map((item) => {
        return <OrderedItems key={item?._id} item={item} />
      })}
    </div>
  )
}
