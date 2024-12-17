import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

import { Provider } from 'react-redux'
import { persistor, store } from './app/store.ts'
import { PersistGate } from 'redux-persist/integration/react'

import { Toaster } from 'react-hot-toast'
import ErrorBoundary from './components/ErrorBoundary.tsx'
import Fallback from './components/Fallback.tsx'

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Toaster reverseOrder={false} />
      <ErrorBoundary fallback={<Fallback />}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ErrorBoundary>
    </PersistGate>
  </Provider>
  // </StrictMode>
)
