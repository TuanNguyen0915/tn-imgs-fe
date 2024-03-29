import {configureStore, combineReducers}  from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import imageReducer from './image/imageSlice'
import allImageReducer from './image/allImagesSlice'
import {persistReducer, persistStore} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage
}

const rootReducer = combineReducers({user:userReducer, image:imageReducer, allImages: allImageReducer})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export const persistor = persistStore(store)