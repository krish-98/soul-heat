import { useRouteError } from "react-router-dom"

const ErrorPage = () => {
  const error = useRouteError()
  console.log(error)
  return <div>ErrorPage</div>
}

export default ErrorPage
