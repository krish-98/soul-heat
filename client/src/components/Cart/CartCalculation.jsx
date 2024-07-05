import { IoBagCheckOutline } from 'react-icons/io5'
import { RiEBike2Fill } from 'react-icons/ri'

export default function CartCalculation({
  cartItems,
  totalAmount,
  paymentLoader,
  handleCheckout,
}) {
  return (
    <div className="lg:w-[30%]">
      <div className="py-6 border-t border-b space-y-1">
        <h3 className="flex justify-between items-center font-medium">
          <span>Item {cartItems?.length > 1 ? 'Totals' : 'Total'} : </span>
          <span>
            {totalAmount.toLocaleString('en-US', {
              style: 'currency',
              currency: 'INR',
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </span>
        </h3>

        <div className="flex justify-between items-center font-medium">
          <span>
            <span>Delivery Charges </span>
            <RiEBike2Fill className="fill-red-600 inline" /> :{' '}
          </span>
          <span className="space-x-2">
            <span>Free</span>
            <span className="line-through">₹ 49</span>
          </span>
        </div>
      </div>

      <p className="pt-4 text-lg font-semibold flex justify-between items-center">
        <span>Total Amount : </span>
        <span>
          {/* ₹{' '} */}
          {totalAmount.toLocaleString('en-US', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
        </span>
      </p>

      <button
        onClick={handleCheckout}
        disabled={paymentLoader}
        className={`bg-[#fb923c] w-full mt-10 py-3 px-6 rounded-2xl flex items-center justify-center gap-1 hover:bg-[#ffa13c] hover:shadow-xl transistion duration-300 cursor-pointer focus:scale-90 ${
          paymentLoader && 'disabled:opacity-75 hover:cursor-not-allowed'
        }`}
      >
        <p className="text-white font-semibold tracking-wider uppercase">
          {paymentLoader ? 'Processing...' : 'Checkout'}
        </p>
        {!paymentLoader && (
          <IoBagCheckOutline className="w-7 h-[26px] stroke-white" />
        )}
      </button>
    </div>
  )
}
