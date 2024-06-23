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
    initMercadoPago('APP_USR-172e031e-80ad-47eb-91d2-c03212e5e63b', { locale: 'es-AR' }); //PUBLIC KEY
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
    <div className="mt-custom">
      {cart.length > 0 && (
        <h1 className="text-2xl font-bold mt-8 ml-4">Your Cart</h1>
      )}
      <div className="min-h-screen container mx-auto p-4">
        {cart.length === 0 ? (
          <p className="text-lg">Your cart is empty</p>
        ) : (
          <div className="flex flex-col md:flex-row md:space-x-4">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 md:max-h-[calc(100vh-200px)] md:overflow-y-auto">
              {cart.map((album: AlbumInCart) => (
                <div key={album.name} className="mb-4 p-4 border rounded-lg shadow-md bg-[#3d3c3d] h-[170px] flex flex-col justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-white">{album.name}</h2>
                    <p className="text-white">Artist: {album.artist}</p>
                    <p className="text-white">Quantity: {album.quantity}</p>
                  </div>
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
            </div>
            <div className="sticky top-4 w-full md:w-80 h-fit overflow-hidden rounded-xl bg-[#3d3c3d] mt-4 md:mt-0 p-4 border-1 border-white">
              <div className="flex flex-col items-center justify-center text-white">
                <button
                  className="w-full bg-black text-white px-4 py-2 rounded mb-4"
                  onClick={handleClick}
                >
                  Procesar pago
                </button>
                {preferenceId && (
                  <div className="w-full mb-4">
                    <Wallet initialization={{ preferenceId }} />
                  </div>
                )}
                <button
                  className="w-full bg-red-700 text-white px-4 py-2 rounded flex items-center justify-center"
                  onClick={clearCart}
                >
                  <ClearCartIcon />
                  <span className="ml-2">Clear Cart</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}