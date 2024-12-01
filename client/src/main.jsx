import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Provider } from 'react-redux'
import { persistor, store } from './app/store'
import { PersistGate } from 'redux-persist/integration/react'

import { Toaster } from 'react-hot-toast'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import Fallback from './components/Fallback.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
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
)
