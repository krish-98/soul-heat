export interface CustomError extends Error {
  statusCode?: number
}

export const handleError = (
  statusCode: number,
  message: string
): CustomError => {
  const error: CustomError = new Error()

  error.statusCode = statusCode
  error.message = message

  return error
}
