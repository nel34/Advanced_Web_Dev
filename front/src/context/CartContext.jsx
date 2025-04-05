import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart')
    return savedCart ? JSON.parse(savedCart) : []
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === product._id)
      if (existingItem) {
        return prevCart.map((item) =>
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        )
      } else {
        return [...prevCart, { ...product, quantity: 1 }]
      }
    })
  }

  const decreaseQuantity = (productId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item._id === productId)
      if (existingItem.quantity === 1) {
        return prevCart.filter((item) => item._id !== productId)
      } else {
        return prevCart.map((item) =>
          item._id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
      }
    })
  }

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item._id !== productId))
  }

  const getTotalPrice = () => {
    return cart.reduce((sum, item) => sum + item.quantity * item.price, 0)
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, decreaseQuantity, removeFromCart, getTotalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  return useContext(CartContext)
}