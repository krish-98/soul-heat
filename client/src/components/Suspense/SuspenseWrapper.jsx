import { Suspense } from 'react'
import Loader from './Loader'

export default function SuspenseWrapper({ component: ActualComponent }) {
  return (
    <Suspense fallback={<Loader />}>
      <ActualComponent />
    </Suspense>
  )
}
