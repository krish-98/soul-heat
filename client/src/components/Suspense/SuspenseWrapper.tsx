import { ComponentType, Suspense } from 'react'
import Loader from './Loader'

interface SuspenseWrapperProps {
  component: ComponentType // Accepts any React component
}

export default function SuspenseWrapper({
  component: ActualComponent,
}: SuspenseWrapperProps) {
  return (
    <Suspense fallback={<Loader />}>
      <ActualComponent />
    </Suspense>
  )
}
