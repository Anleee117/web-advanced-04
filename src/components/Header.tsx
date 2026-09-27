import React from 'react'
import { useAppSelector } from '../app/hooks'
import { selectCartCount, selectCartTotal } from '../features/cart/cartSelectors'
import { useFavoritesStore } from '../features/favorites/favoritesStore'

interface HeaderProps {
  onCartClick: () => void
  onFavClick: () => void
  cartOpen: boolean
  favOpen: boolean
}

const Header: React.FC<HeaderProps> = ({ onCartClick, onFavClick, cartOpen, favOpen }) => {
  const count = useAppSelector(selectCartCount)
  const total = useAppSelector(selectCartTotal)
  const favCount = useFavoritesStore((state) => state.items.length)

  return (
    <header className="header" role="banner">
      <div className="header__inner">
        <div className="header__brand">
          <span className="brand-icon">🏪</span>
          <div>
            <h1 className="brand-name">Anlee Shop</h1>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
