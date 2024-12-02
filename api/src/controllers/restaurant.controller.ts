import { Request, Response } from 'express'

export const allRestaurants = async (_req: Request, res: Response) => {
  try {
    const URL = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=9.928668&lng=78.092783&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`

    const response = await fetch(URL, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
      },
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'An error occurred' })
  }
}

export const restaurantInfo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const URL = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=20.275845&lng=85.776639&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`

    const response = await fetch(URL, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
      },
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    res.json(data)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'An error occurred' })
  }
}
