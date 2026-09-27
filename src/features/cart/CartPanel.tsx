import React from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { removeFromCart, updateQuantity, clearCart } from './cartSlice'
import {
  selectCartItems,
  selectCartTotal,
  selectCartCount,
} from './cartSelectors'

const CartPanel: React.FC = () => {
  const dispatch = useAppDispatch()
  const items = useAppSelector(selectCartItems)
  const total = useAppSelector(selectCartTotal)
  const count = useAppSelector(selectCartCount)

  const handleQuantityChange = (id: number, newQty: number) => {
    dispatch(updateQuantity({ id, quantity: newQty }))
  }

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id))
  }

  const handleClearCart = () => {
    dispatch(clearCart())
  }

  if (items.length === 0) {
    return (
      <aside className="cart-panel" aria-label="Giỏ hàng">
        <div className="cart-panel__header">
          <h2 className="cart-panel__title">
            <span className="cart-icon">🛒</span> Giỏ Hàng
          </h2>
          <span className="cart-badge">0</span>
        </div>
        <div className="cart-panel__empty">
          <div className="empty-icon">🛍️</div>
          <p>Giỏ hàng của bạn đang trống</p>
          <span className="empty-hint">Thêm sản phẩm để bắt đầu mua sắm!</span>
        </div>
      </aside>
    )
  }

  return (
    <aside className="cart-panel" aria-label="Giỏ hàng">
      <div className="cart-panel__header">
        <h2 className="cart-panel__title">
          <span className="cart-icon">🛒</span> Giỏ Hàng
        </h2>
        <span className="cart-badge">{count}</span>
      </div>

      <ul className="cart-list" role="list">
        {items.map((item) => (
          <li key={item.id} className="cart-item">
            <img
              src={item.image}
              alt={item.title}
              className="cart-item__img"
            />
            <div className="cart-item__details">
              <p className="cart-item__name">{item.title}</p>
              <span className="cart-item__unit-price">
                ${item.price.toFixed(2)} / cái
              </span>
              <div className="cart-item__controls">
                <div className="qty-control">
                  <button
                    id={`dec-qty-${item.id}`}
                    className="qty-btn"
                    onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                    aria-label="Giảm số lượng"
                  >
                    −
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    id={`inc-qty-${item.id}`}
                    className="qty-btn"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                    aria-label="Tăng số lượng"
                  >
                    +
                  </button>
                </div>
                <span className="cart-item__subtotal">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </div>
            <button
              id={`remove-${item.id}`}
              className="cart-item__remove"
              onClick={() => handleRemove(item.id)}
              aria-label={`Xoá ${item.title} khỏi giỏ`}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>

      <div className="cart-panel__footer">
        <div className="cart-summary">
          <div className="cart-summary__row">
            <span>Số lượng:</span>
            <strong>{count} sản phẩm</strong>
          </div>
          <div className="cart-summary__row cart-summary__total">
            <span>Tổng cộng:</span>
            <strong className="total-price">${total.toFixed(2)}</strong>
          </div>
        </div>
        <button
          id="checkout-btn"
          className="btn btn--primary btn--full"
        >
          Thanh toán
        </button>
        <button
          id="clear-cart-btn"
          className="btn btn--ghost btn--full"
          onClick={handleClearCart}
        >
          Xoá giỏ hàng
        </button>
      </div>
    </aside>
  )
}

export default CartPanel
