import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { Product } from '../products/productsSlice'

// ============================================================
// TYPES
// ============================================================
export interface CartItem extends Product {
  quantity: number
}

interface CartState {
  items: CartItem[]
}

// ============================================================
// INITIAL STATE
// ============================================================
const initialState: CartState = {
  items: [],
}

// ============================================================
// SLICE
// ============================================================
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Thêm sản phẩm vào giỏ (nếu đã có thì tăng số lượng)
    addToCart: (state, action: PayloadAction<Product>) => {
      const existing = state.items.find((item) => item.id === action.payload.id)
      if (existing) {
        existing.quantity += 1
      } else {
        state.items.push({ ...action.payload, quantity: 1 })
      }
    },

    // Xoá sản phẩm khỏi giỏ hàng
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload)
    },

    // Cập nhật số lượng (nếu <= 0 thì xoá)
    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload
      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.id !== id)
      } else {
        const item = state.items.find((item) => item.id === id)
        if (item) {
          item.quantity = quantity
        }
      }
    },

    // Xoá toàn bộ giỏ hàng
    clearCart: (state) => {
      state.items = []
    },
  },
})

export const { addToCart, removeFromCart, updateQuantity, clearCart } =
  cartSlice.actions

export default cartSlice.reducer
