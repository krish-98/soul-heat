const SWIGGY_API_URL =
  "https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.0827&lng=80.2707&page_type=DESKTOP_WEB_LISTING"

const CLOUDINARY_IMAGE_ID_URL =
  "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/"

const RESTAURANT_ID_URL =
  "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=13.0827&lng=80.2707&restaurantId=547669&submitAction=ENTER"

const SWIGGY_MENU_API_URL =
  "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=13.0827&lng=80.2707&restaurantId=96694&submitAction=ENTER"

// CORS Proxy
export const SWIGGY_API =
  "https://corsproxy.io/?" + encodeURIComponent(SWIGGY_API_URL)

export const CLOUDINARY_IMAGE_ID =
  "https://corsproxy.io/?" + encodeURIComponent(CLOUDINARY_IMAGE_ID_URL)

export const RESTAURANT_ID =
  "https://corsproxy.io/?" + encodeURIComponent(RESTAURANT_ID_URL)

export const SWIGGY_MENU_API =
  "https://corsproxy.io/?" + encodeURIComponent(SWIGGY_MENU_API_URL)
