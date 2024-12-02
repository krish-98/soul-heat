export interface MenuItem {
  card: {
    card: {
      info?: RestaurantInfo
      // Add more fields as required
    }
  }
  groupedCard?: {
    cardGroupMap?: {
      REGULAR?: {
        cards?: MenuItem[]
      }
    }
  }
}

interface RestaurantInfo {
  name?: string
  cuisine?: string[]
  location?: string
  // Add more fields based on your API response
}
