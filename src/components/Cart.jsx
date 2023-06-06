import { useDispatch, useSelector } from "react-redux"
import { CLOUDINARY_IMAGE_ID } from "../constants"
import { RiEBike2Fill } from "react-icons/ri"

const Cart = () => {
  const { cartItems, totalItems, totalAmount } = useSelector(
    (store) => store.cart
  )

  return (
    <div className="p-6 max-w-[900px] mx-auto md:px-10 lg:px-0">
      <h1 className="text-center font-bold text-2xl pb-8">
        CART ({totalItems})
      </h1>

      {!cartItems?.length ? (
        <h1 className="text-xl font-semibold text-center">
          Your Cart is Empty
        </h1>
      ) : (
        <div className="lg:flex justify-between lg:gap-16">
          <div className="flex flex-col gap-8 pb-8 lg:w-[70%]">
            {cartItems.length > 0 &&
              cartItems.map((item) => (
                <div
                  key={item?.id}
                  className="flex justify-between items-center gap-4 "
                >
                  <div className="flex flex-col gap-1 max-w-[60%]">
                    <h3 className="font-medium md:text-lg">
                      {item?.name}{" "}
                      <span className="text-[#f26434]">[{item?.quantity}]</span>
                    </h3>
                    <p className="">₹ {String(item?.price).slice(0, 3)}</p>
                  </div>

                  <div className="max-w-[35%]">
                    <img
                      className="md:w-[200px] object-contain rounded-xl"
                      src={CLOUDINARY_IMAGE_ID + item?.imageId}
                      alt={item?.name}
                    />
                  </div>
                </div>
              ))}
          </div>

          <div className="lg:w-[30%]">
            <div className="py-6 border-t border-b space-y-1">
              <h3 className="flex justify-between items-center font-medium">
                <span>
                  Item {cartItems?.length > 1 ? "Totals" : "Total"} :{" "}
                </span>
                <span>{totalAmount}</span>
              </h3>

              <div className="flex justify-between items-center font-medium">
                <span>
                  <span>Delivery Charges </span>
                  <RiEBike2Fill className="fill-red-600 inline" /> :{" "}
                </span>

                <span>₹ 49</span>
              </div>
            </div>

            <p className="pt-4 text-lg font-semibold flex justify-between items-center">
              <span>Total Amount : </span>

              <span>{totalAmount + 49}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
