"use client";

import { useEffect, useState } from 'react';
import {Album} from "@/app/lib/definitions"
import Image from 'next/image';
import { Inter } from 'next/font/google'
import { CartProvider } from '@/app/contexts/cartContext';
import { ManageProductInCart } from '@/app/ui/manageProductInCart';
 
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] })

export default function ProductPage() {
  const [album, setAlbum] = useState<Album | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const albumData = queryParams.get('album');

    if (albumData) {
      const parsedAlbum = JSON.parse(decodeURIComponent(albumData));
      setAlbum(parsedAlbum);
    }
  }, []);

  const summary = album?.summary?.replace(/<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1[^>]*>.*?<\/a>/gi, '') ?? '';

  return (
    <div>

    <div className="flex min-h-screen min-w-screen">
        <div className="ml-8 w-full h-full flex-col p-4 mr-8">
          {album && (
            <>
              <div className="mt-custom">
              </div>
              <div className="text-4xl font-bold text-white mb-4 mt-4">Name: {album.name}</div>
              <ul className={`${inter.className} text-white list-none space-y-2 mb-8`}>
                <li>Artist: {album.artist}</li>
                <li>Listeners: {album.listeners}</li>
                <li>Genre: {album.genre}</li>
              </ul>
              
              {album.extralargeimage &&
              (<div className = "flex justify-center sm:w-full sm:h-full md:w-1/5 md:h-1/5">
                <div className="relative w-full h-full">
                  <Image
                    src={album.extralargeimage}
                    className="object-cover rounded-xl h-full w-full"
                    alt={album.name}
                    width={300}
                    height={300} 
                  />
                </div>
              </div>)}
              {summary && (<div className={`${inter.className} justify-center text-white mt-8 mb-8 sm:mr-8 md:mr-40 prose`}>
                    Summary: {summary}
              </div>)
              }
            
              <CartProvider>
                <ManageProductInCart album={album}/>
              </CartProvider>
              
            </>
          )}
          
        </div>
      </div>
      
    </div>
  );
}
