import { configureStore } from '@reduxjs/toolkit'
import cartReducer from '../features/cart/cartSlice'
import productsReducer from '../features/products/productsSlice'

// Lưu ý: favoritesStore được quản lý bởi Zustand (tách biệt, không gộp vào đây)
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
