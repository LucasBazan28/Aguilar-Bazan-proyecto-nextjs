"use client";
import { useCart } from '@/app/hooks/useCart';
import { AlbumInCart } from '@/app/lib/definitions';
import { ClearCartIcon } from '@/app/ui/cartIcons';
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';
import { useEffect, useState } from "react"

export default function CartPage() {
  const { cart, addOneToCart, removeOneFromCart, removeFromCart, clearCart } = useCart();
  const [preferenceId, setPreferenceId] = useState<string | null>(null);

  useEffect(() => {
    initMercadoPago('TEST-4073b790-86dd-40c2-b12d-5dc16f3c774a', { locale: 'es-AR' }); //PUBLIC KEY
  }, [])

  const handleClick = async () => {
    try {
      const response = await fetch('/api/create_preference', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: cart }),
      });
      const data = await response.json();
      setPreferenceId(data.preferenceId);
    } catch (error) {
      console.error('Error creating preference:', error);
    }
  };
  return (
    <div className="min-h-screen container mx-auto p-4 mt-custom">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-lg">Your cart is empty</p>
      ) : (
        <div>
          {cart.map((album: AlbumInCart) => (
            <div key={album.name} className="mb-4 p-4 border rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">{album.name}</h2>
              <p>Artist: {album.artist}</p>
              <p>Quantity: {album.quantity}</p>
              <div className="flex space-x-2 mt-2">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  onClick={() => addOneToCart(album)}
                >
                  Add one
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => removeOneFromCart(album)}
                >
                  Remove one
                </button>
                <button
                  className="bg-gray-500 text-white px-3 py-1 rounded"
                  onClick={() => removeFromCart(album)}
                >
                  Remove from cart
                </button>
              </div>
            </div>
          ))}
          <button
            className="bg-red-700 text-white px-4 py-2 rounded mt-4"
            onClick={clearCart}
          >
            <ClearCartIcon/>
          </button>
          <button onClick={handleClick} >Procesar pago</button>
          {preferenceId && <Wallet initialization={{ preferenceId }} />}  
        </div>
      )}
    </div>
  );
};
