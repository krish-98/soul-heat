import { NextFunction, Request, Response } from 'express'

export const getAllRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const URL = `${process.env.RESTAURANT_URL}/restaurants/list/v5?lat=9.928668&lng=78.092783&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`

  try {
    const response = await fetch(`${URL}`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
      },
    })

    if (!response.ok) throw new Error('Something went wrong!')

    const data = await response.json()

    return res.json({
      success: true,
      data,
    })
  } catch (error) {
    console.error(error)

    return next(error)
  }
}

export const restaurantInfo = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const { restaurantId } = req.params
    const URL = `${process.env.RESTAURANT_URL}/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=20.275845&lng=85.776639&restaurantId=${restaurantId}&catalog_qa=undefined&submitAction=ENTER`

    const response = await fetch(`${URL}`, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
      },
    })

    if (!response.ok) throw new Error('Something went wrong!')

    const data = await response.json()

    return res.json({
      success: true,
      data,
    })
  } catch (error) {
    console.error(error)

    return next(error)
  }
}
