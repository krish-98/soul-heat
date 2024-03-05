import Accordion from './Accordion'

const RestaurantDishes = ({ restaurantMenuLists }) => {
  const menuLists = restaurantMenuLists?.filter(
    (list) =>
      list?.card?.card['@type'] ===
      'type.googleapis.com/swiggy.presentation.food.v2.ItemCategory'
  )

  return (
    <div className="mt-6 w-full space-y-4 md:space-y-8">
      {menuLists?.map((menu, i) => (
        <Accordion key={i} menu={menu} />
      ))}
    </div>
  )
}

export default RestaurantDishes
