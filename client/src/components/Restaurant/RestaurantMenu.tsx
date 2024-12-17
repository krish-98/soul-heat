import MenuCardAccordion from './MenuCardAccordion'

const RestaurantMenu = ({ restaurantMenuLists, restaurantDetail }) => {
  const menuLists = restaurantMenuLists?.filter(
    (list) =>
      list?.card?.card['@type'] ===
      'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'
  )

  return (
    <div className="mt-6 w-full space-y-4 md:space-y-8">
      {menuLists?.map((menu, i) => (
        <MenuCardAccordion
          key={i}
          menu={menu}
          restaurantDetail={restaurantDetail}
        />
      ))}
    </div>
  )
}

export default RestaurantMenu
