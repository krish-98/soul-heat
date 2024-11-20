import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import cartReducer from '../features/cartSlice'
import authReducer from '../features/authSlice'

const rootReducer = combineReducers({ cart: cartReducer, auth: authReducer })
const persistConfig = { key: 'root', storage, version: 1 }

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
})

export const persistor = persistStore(store)
