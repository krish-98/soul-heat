import React, { ErrorInfo } from 'react'

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback: React.ReactNode
}

interface ErrorBoundaryState {
  hasError: boolean
}

export default class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)

    this.state = {
      hasError: false,
    }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    console.log(error)

    return {
      hasError: true,
    }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.log(error, info)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }

    return this.props.children
  }
}
