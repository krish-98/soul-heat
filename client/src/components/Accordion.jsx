import { useState } from 'react'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa6'

const Accordion = ({ menu, loading, handleAddItemToCart }) => {
  const [accordion, setAccordion] = useState(true)

  return (
    <div className="cursor-pointer space-y-6">
      <div
        onClick={() =>
          setAccordion((toggleAccordianState) => !toggleAccordianState)
        }
        className="flex items-center justify-between"
      >
        <span className="text-xl font-semibold">
          {menu?.card?.card?.title} ({menu?.card?.card?.itemCards?.length})
        </span>
        <span>{accordion ? <FaChevronDown /> : <FaChevronUp />}</span>
      </div>

      {accordion && (
        <>
          {menu?.card?.card?.itemCards?.map((dish) => {
            const item = dish?.card || dish?.dish

            return (
              <div
                key={item?.info?.id || dish?.dish?.info?.id}
                className="flex justify-between items-center pb-7 border-b"
              >
                <div className="flex flex-col gap-1 max-w-[65%] md:gap-2">
                  <h3 className="text-sm font-semibold md:text-base">
                    {item?.info?.name}
                  </h3>
                  <p className="text-sm md:text-base">
                    ₹{' '}
                    {item?.info?.price
                      ? String(item?.info?.price).slice(0, 3)
                      : String(item?.info?.defaultPrice).slice(0, 3)}
                  </p>
                  <p className="text-sm text-gray-400 md:text-base">
                    {item?.info?.description}
                  </p>
                </div>

                <div className="max-w-[30%] relative">
                  <img
                    className="w-[170px] h-[78px] md:h-[125px] object-cover rounded-xl"
                    src={
                      'https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/' +
                      item?.info?.imageId
                    }
                    alt={item?.info?.name}
                  />

                  <button
                    disabled={loading}
                    onClick={() => handleAddItemToCart(item?.info)}
                    className="absolute -bottom-3 bg-white text-[#60b246] border w-[80%] left-3 py-1 rounded-lg text-sm font-bold md:text-base md:left-4 hover:bg-gray-50 transition-all duration-300"
                  >
                    ADD
                  </button>
                </div>
              </div>
            )
          })}
        </>
      )}

      <p className="h-4 bg-slate-100 opacity-70" />
    </div>
  )
}

export default Accordion
