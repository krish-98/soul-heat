import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Provider } from 'react-redux'
import { persistor, store } from './app/store'
import { Toaster } from 'react-hot-toast'
import { PersistGate } from 'redux-persist/integration/react'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import Fallback from './components/Fallback.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>

  // </React.StrictMode>

  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Toaster />
      <ErrorBoundary fallback={<Fallback />}>
        <App />
      </ErrorBoundary>
    </PersistGate>
  </Provider>
)
