import React from 'react'
import { useFavoritesStore } from './favoritesStore'

const FavoritesPanel: React.FC = () => {
  const items = useFavoritesStore((state) => state.items)
  const removeFavorite = useFavoritesStore((state) => state.removeFavorite)

  return (
    <aside className="favorites-panel" aria-label="Sản phẩm yêu thích">
      <div className="favorites-panel__header">
        <h2 className="favorites-panel__title">
          <span className="fav-icon">❤️</span> Yêu Thích
        </h2>
        <span className="favorites-badge">{items.length}</span>
      </div>

      {items.length === 0 ? (
        <div className="favorites-panel__empty">
          <div className="empty-icon">🤍</div>
          <p>Chưa có sản phẩm yêu thích</p>
          <span className="empty-hint">Nhấn ❤️ để thêm sản phẩm bạn thích!</span>
        </div>
      ) : (
        <ul className="favorites-list" role="list">
          {items.map((item) => (
            <li key={item.id} className="favorites-item">
              <img
                src={item.image}
                alt={item.title}
                className="favorites-item__img"
              />
              <div className="favorites-item__details">
                <p className="favorites-item__name">{item.title}</p>
                <span className="favorites-item__price">
                  ${item.price.toFixed(2)}
                </span>
              </div>
              <button
                id={`remove-fav-${item.id}`}
                className="favorites-item__remove"
                onClick={() => removeFavorite(item.id)}
                aria-label={`Xoá ${item.title} khỏi yêu thích`}
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  )
}

export default FavoritesPanel
