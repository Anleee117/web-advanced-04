import { create } from 'zustand'
import type { Product } from '../products/productsSlice'

// ============================================================
// TYPES
// ============================================================
interface FavoritesState {
  items: Product[]
  addFavorite: (product: Product) => void
  removeFavorite: (id: number) => void
  toggleFavorite: (product: Product) => void
  isFavorite: (id: number) => boolean
}

// ============================================================
// ZUSTAND STORE — tách biệt, KHÔNG gộp chung với cartStore
// ============================================================

/*
 * SO SÁNH ZUSTAND VỚI REDUX TOOLKIT (cho tính năng Sản phẩm Yêu thích)
 *
 * ✅ Ưu điểm của Zustand so với Redux Toolkit:
 *  1. Không cần <Provider> bao ngoài — store dùng được ngay trong bất kỳ component nào
 *     mà không phải wrap cả cây component, giúp tích hợp dễ dàng hơn.
 *  2. Boilerplate tối thiểu — không cần tách slice / actions / selectors thành file riêng;
 *     toàn bộ state + logic nằm gọn trong một lần gọi create(), dễ đọc & maintain.
 *  3. API trực quan hơn — component chỉ cần gọi useFavoritesStore(state => state.items),
 *     không phải học useSelector + useDispatch + PayloadAction như RTK.
 *
 * ❌ Nhược điểm của Zustand so với Redux Toolkit:
 *  4. DevTools hạn chế — Redux DevTools Extension hỗ trợ time-travel debugging và
 *     xem diff state theo từng action; Zustand có plugin devtools nhưng kém mạnh hơn.
 *  5. Không có middleware ecosystem — RTK đi kèm redux-thunk, hỗ trợ RTK Query, logger...
 *     trong khi Zustand cần tự cài thêm hoặc tự viết nếu cần logic async phức tạp.
 *  6. Khó đồng bộ nhiều store — App lớn dùng nhiều Zustand store riêng lẻ có thể
 *     gây khó khăn khi cần chia sẻ state giữa các store; RTK có single store dễ trace hơn.
 *  7. Kết luận — Zustand phù hợp cho feature nhỏ, độc lập (như favorites), cần tốc độ
 *     phát triển nhanh; RTK phù hợp hơn khi app lớn cần debuggability và chuẩn hoá cao.
 */
export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  items: [],

  addFavorite: (product: Product) => {
    const exists = get().items.some((item) => item.id === product.id)
    if (!exists) {
      set((state) => ({ items: [...state.items, product] }))
    }
  },

  removeFavorite: (id: number) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }))
  },

  toggleFavorite: (product: Product) => {
    const isFav = get().isFavorite(product.id)
    if (isFav) {
      get().removeFavorite(product.id)
    } else {
      get().addFavorite(product)
    }
  },

  isFavorite: (id: number) => get().items.some((item) => item.id === id),
}))
