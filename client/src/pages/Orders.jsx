import { useEffect, useState } from 'react'
import OrderDetails from '../components/Order/OrderDetails'

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

  return (
    <div className="px-6">
      <div className="max-w-5xl mx-auto my-6">
        <h2 className="text-2xl md:text-3xl font-semibold my-8">My Orders</h2>

        {!orderedItems.length ? (
          <p>No orders yet</p>
        ) : (
          <OrderDetails orderedItems={orderedItems} />
        )}
      </div>
    </div>
  )
}
