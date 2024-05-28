export type Album = {
    name: string,
    artist: string,
    smallImage: string,
    mediumimage: string,
    largeimage: string,
    extralargeimage: string,
    megaimage: string,
    lastFmUrl: string,
    listeners: number,
    genre: string,
    summary: string,
    price: number,
    cantidadComprada: number
  };

  export type User = {
    email: string;
    password: string
  };

export type AlbumInCart = {
    name: string,
    artist: string,
    price: number,
    quantity: number
} 

export type CartContextType = {
  cart: AlbumInCart[];
  addOneToCart: (product: AlbumInCart) => void,
  removeOneFromCart: (product: AlbumInCart) => void;
  removeFromCart: (product: AlbumInCart) => void;
  setProductQuantity: (product: AlbumInCart, quantity: number) => void;
  clearCart: () => void;
}