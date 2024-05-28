"use client";
import { useContext, useEffect, useState } from 'react';
import { CartContext } from '@/app/contexts/cartContext';
import { AlbumInCart } from '../lib/definitions';
import {Album} from '../lib/definitions';
import { RemoveFromCartIcon, AddToCartIcon } from './cartIcons';

type ManageProductInCartProps = {
  album: Album;
};

export function ManageProductInCart({ album }: ManageProductInCartProps) {
  

  const { cart, addOneToCart, removeOneFromCart, setProductQuantity } = useContext(CartContext);
  const albumInCart = cart.find(item => item.name === album.name);
  const InitialQuantity: number = albumInCart ? albumInCart.quantity : 0;

  let albumCart: AlbumInCart = {name: album.name, artist: album.artist, price: album.price, quantity: InitialQuantity}

  const handleAdd = () => {
    addOneToCart(albumCart);
  };

  const handleRemove = () => {
    removeOneFromCart(albumCart);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    albumCart.quantity = value;
    setProductQuantity(albumCart, value);
  };

  return (
    <div className="manage-product-container p-4 bg-gray-800 rounded-lg shadow-lg flex flex-col items-center">
      <h2 className="text-2xl font-bold text-white mb-4">Manage Album in Cart</h2>
      <div className="quantity-control flex items-center space-x-4">
        <button
          className="bg-red-500 text-white px-3 py-2 rounded-lg"
          onClick={handleRemove}
        >
        <RemoveFromCartIcon/>
        </button>
        <input
          type="number"
          min="0"
          className="text-center w-12 py-2 bg-gray-700 text-white rounded-lg"
          value={albumCart.quantity}
          onChange={handleChange}
        />
        <button
          className="bg-green-500 text-white px-3 py-2 rounded-lg"
          onClick={handleAdd}
        >
        <AddToCartIcon/>
        </button>
      </div>
      <p className="text-white mt-4">Quantity: {albumCart.quantity}</p>
    </div>
  );
};