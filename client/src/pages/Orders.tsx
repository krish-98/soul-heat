import { useEffect, useState } from 'react'
import { useAppSelector } from '../app/hooks'
import OrderDetails from '../components/Order/OrderDetails'
import OrderHeader from '../components/Order/OrderHeader'

export interface OrderItem {
  _id: string
  orders: Array<{
    id: string
    name: string
    category: string
    description: string
    imageId: string
    price: number
    quantity: number
    _id: string
  }>
  userRef: string
  status: 'Paid' | 'Unpaid' | 'Pending' // Enum-like definition for potential statuses
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
  __v: number
}

export default function Orders() {
  const [orderedItems, setOrderedItems] = useState<OrderItem[]>([])
  const [skip, setSkip] = useState<number>(0)
  const [hasMore, setHasMore] = useState<boolean>(true)

  const { token } = useAppSelector((store) => store.auth)

  useEffect(() => {
    const getOrderDetails = async (skipCount: number) => {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/order/order-details?skip=${skipCount}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
            credentials: 'include',
          }
        )
        const data = await res.json()

        console.log(data)

        setOrderedItems((prevOrderItems) => [...prevOrderItems, ...data.orders])
        setHasMore(data.hasMore)
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error fetching order details:', error.message)
        } else {
          console.error('Unexpected error:', error)
        }
      }
    }

    getOrderDetails(skip)
  }, [token, skip])

  const handleShowMore = () => {
    setSkip((prevSkip) => prevSkip + 5)
  }

  return (
    <div className="bg-shBackground min-h-[calc(100vh-96px)] lg:min-h-[calc(100vh-80px)]">
      <div className="max-w-6xl mx-auto py-12 px-6 xl:px-0 space-y-8 ">
        <OrderHeader />

        {!orderedItems.length ? (
          <p>No orders yet</p>
        ) : (
          <>
            <OrderDetails orderedItems={orderedItems} />

            {hasMore ? (
              <button
                onClick={handleShowMore}
                className="block mx-auto text-shOrange2 bg-black px-4 py-3 rounded-2xl hover:border hover:shadow-md hover:shadow-shOrange2 transition-all duration-500"
              >
                Show More Orders
              </button>
            ) : (
              <p className="text-center tracking-tight lg:text-lg">
                No more orders to display
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}
