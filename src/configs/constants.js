// CORS Proxy on Swiggy APIs
export const SWIGGY_API =
  "https://corsproxy.io/?" +
  encodeURIComponent(
    "https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.0827&lng=80.2707&page_type=DESKTOP_WEB_LISTING"
  )

export const CLOUDINARY_IMAGE_ID =
  "https://corsproxy.io/?" +
  encodeURIComponent(
    "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/"
  )

export const RESTAURANT_ID =
  "https://corsproxy.io/?" +
  encodeURIComponent(
    "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=13.0827&lng=80.2707&submitAction=ENTER"
  )

export const SWIGGY_MENU_API =
  "https://corsproxy.io/?" +
  encodeURIComponent(
    "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=13.0827&lng=80.2707&restaurantId=96694&submitAction=ENTER"
  )

// export const RESTAURANT_ID =
//   "https://corsproxy.io/?" +
//   encodeURIComponent(
//     "https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=13.0827&lng=80.2707&restaurantId=547669&submitAction=ENTER"
//   )

// const res = await fetch(
//   "https://corsproxy.io/?" +
//     encodeURIComponent(
//       `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=13.0827&lng=80.2707&restaurantId=${resId}&submitAction=ENTER`
//     )
// )
