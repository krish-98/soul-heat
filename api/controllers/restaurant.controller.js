export const allRestaurants = async (req, res) => {
  const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=9.928668&lng=78.092783&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`

  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then((data) => {
      res.json(data)
    })
    .catch((error) => {
      console.error(error)
      res.status(500).send('An error occurred')
    })
}

export const restaurantInfo = async (req, res) => {
  const { id } = req.params
  const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=20.275845&lng=85.776639&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`

  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok')
      }
      return response.json()
    })
    .then((data) => {
      res.json(data)
    })
    .catch((error) => {
      console.error(error)
      res.status(500).send('An error occurred')
    })
}
