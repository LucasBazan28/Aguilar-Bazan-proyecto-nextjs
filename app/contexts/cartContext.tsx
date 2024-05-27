import { useState, createContext, ReactNode } from 'react'
import { AlbumInCart, CartContextType } from '../lib/definitions';


  
export const CartContext = createContext<CartContextType>({
    cart: [],
    addOneToCart: () => {},
    removeOneFromCart: () => {},
    removeFromCart: () => {},
    setProductQuantity: () => {},
    clearCart: () => {}
});

const cartItem = window.localStorage.getItem('cart');
const cartInitialState: AlbumInCart[] = cartItem ? JSON.parse(cartItem) : [];

const updateLocalStorage = (cart: AlbumInCart[]) => {
    window.localStorage.setItem('cart', JSON.stringify(cart));
  };

export function useCart() {
    const [cart, setCartState] = useState<AlbumInCart[]>(cartInitialState);
  
    const addOneToCart = (product: AlbumInCart) => {
        setCartState(prevState => {
        const productInCartIndex = prevState.findIndex(item => item.name === product.name);
  
        let newState;
        if (productInCartIndex >= 0) {
          newState = [
            ...prevState.slice(0, productInCartIndex),
            { ...prevState[productInCartIndex], quantity: prevState[productInCartIndex].quantity + 1 },
            ...prevState.slice(productInCartIndex + 1)
          ];
        } else {
          product.quantity = 1
          newState = [...prevState, product];
        }
  
        updateLocalStorage(newState);
        return newState;
      });
    };

    const removeOneFromCart = (product: AlbumInCart) => {
        setCartState(prevState => {
          const productInCartIndex = prevState.findIndex(item => item.name === product.name);
    
          let newState;
          if (productInCartIndex >= 0) {
            const currentQuantity = prevState[productInCartIndex].quantity;
            if (currentQuantity > 1) {
              newState = [
                ...prevState.slice(0, productInCartIndex),
                { ...prevState[productInCartIndex], quantity: currentQuantity - 1 },
                ...prevState.slice(productInCartIndex + 1)
              ];
            } else {
              newState = [
                ...prevState.slice(0, productInCartIndex),
                ...prevState.slice(productInCartIndex + 1)
              ];
            }
    
            updateLocalStorage(newState);
            return newState;
          }
    
          return prevState;
        });
      };
  
    const removeFromCart = (product: AlbumInCart) => {
      setCartState(prevState => {
        const newState = prevState.filter(item => item.name !== product.name);
        updateLocalStorage(newState);
        return newState;
      });
    };

    const setProductQuantity = (product: AlbumInCart, quantity: number) => {
        setCartState(prevState => {
          const productInCartIndex = prevState.findIndex(item => item.name === product.name);
      
          let newState;
          if (productInCartIndex >= 0) {
            if (quantity > 0) {
              newState = [
                ...prevState.slice(0, productInCartIndex),
                { ...prevState[productInCartIndex], quantity: quantity },
                ...prevState.slice(productInCartIndex + 1)
              ];
            } else {
              // Si la cantidad es 0 o menos, elimina el producto del carrito
              newState = [
                ...prevState.slice(0, productInCartIndex),
                ...prevState.slice(productInCartIndex + 1)
              ];
            }
          } else if (quantity > 0) {
            // Si el producto no está en el carrito y la cantidad es mayor que 0, agrega el producto
            newState = [...prevState, { ...product, quantity }];
          } else {
            // Si el producto no está en el carrito y la cantidad es 0 o menos, no hace nada
            newState = prevState;
          }
      
          updateLocalStorage(newState);
          return newState;
        });
      };
  
    const clearCart = () => {
      setCartState([]);
      updateLocalStorage([]);
    };

    return { cart, addOneToCart, removeOneFromCart, removeFromCart, setProductQuantity, clearCart };
}

type CartProviderProps = {
    children: ReactNode;
}

export function CartProvider ({ children }: CartProviderProps) {

  const { cart, addOneToCart, removeOneFromCart, removeFromCart, setProductQuantity, clearCart } = useCart();

  return (
    <CartContext.Provider value={{
      cart,
      addOneToCart,
      removeOneFromCart,
      removeFromCart,
      setProductQuantity,
      clearCart
    }}
    >
      {children}
    </CartContext.Provider>
  )
}