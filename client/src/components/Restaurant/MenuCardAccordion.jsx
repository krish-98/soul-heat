import { useState } from 'react'
import { FaChevronUp, FaChevronDown } from 'react-icons/fa6'
import MenuCardItem from './MenuCardItem'

const MenuCardAccordion = ({ menu }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(true)

  return (
    <div className="cursor-pointer space-y-6">
      <div
        onClick={() =>
          setIsAccordionOpen((toggleAccordianState) => !toggleAccordianState)
        }
        className="flex items-center justify-between"
      >
        <span className="text-xl font-semibold">
          {menu?.card?.card?.title} ({menu?.card?.card?.itemCards?.length})
        </span>
        <span>{isAccordionOpen ? <FaChevronDown /> : <FaChevronUp />}</span>
      </div>

      {isAccordionOpen && (
        <>
          {menu?.card?.card?.itemCards?.map((dish) => {
            const item = dish?.card || dish?.dish

            return (
              <MenuCardItem
                key={item?.info?.id || dish?.dish?.info?.id}
                item={item}
              />
            )
          })}
        </>
      )}

      <p className="h-4 bg-slate-100 opacity-70" />
    </div>
  )
}

export default MenuCardAccordion
