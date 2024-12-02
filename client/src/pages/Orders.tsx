import { useEffect, useState } from 'react'
import { useAppSelector } from '../app/hooks'
import OrderDetails from '../components/Order/OrderDetails'

interface OrderItem {
  id: string
  name: string
  quantity: number
  price: number
  // Add more fields based on the API response
}

export default function Orders() {
  const [orderedItems, setOrderedItems] = useState<OrderItem[]>([])

  const { token } = useAppSelector((store) => store.auth)

  useEffect(() => {
    const getOrderDetails = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/order/order-details`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        const data = await res.json()

        setOrderedItems(data)
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error fetching order details:', error.message)
        } else {
          console.error('Unexpected error:', error)
        }
      }
    }

    getOrderDetails()
  }, [token])

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
