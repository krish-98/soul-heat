import OrdererdCardItem from './OrdererdCardItem'
import { OrderItem } from '../../pages/Orders'

export default function OrderDetails({
  orderedItems,
}: {
  orderedItems: OrderItem[]
}) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-10 lg:gap-12 xl:justify-start">
      {orderedItems?.map((item) => {
        return <OrdererdCardItem key={item?._id} item={item} />
      })}
    </div>
  )
}
