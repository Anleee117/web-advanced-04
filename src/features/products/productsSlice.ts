import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

// ============================================================
// TYPES
// ============================================================
export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: {
    rate: number
    count: number
  }
}

interface ProductsState {
  items: Product[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

// ============================================================
// INITIAL STATE
// ============================================================
const initialState: ProductsState = {
  items: [],
  status: 'idle',
  error: null,
}

// ============================================================
// ASYNC THUNK — Fetch products từ API giả lập (fakestoreapi)
// ============================================================
export const fetchProducts = createAsyncThunk<Product[], void, { rejectValue: string }>(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://fakestoreapi.com/products?limit=12')
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data: Product[] = await response.json()
      return data
    } catch (err) {
      if (err instanceof Error) {
        return rejectWithValue(err.message)
      }
      return rejectWithValue('Lỗi không xác định khi tải sản phẩm')
    }
  }
)

// ============================================================
// SLICE
// ============================================================
const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload ?? 'Đã xảy ra lỗi'
      })
  },
})

export default productsSlice.reducer
