"use client";
import { useEffect, useState } from 'react';
import {Album} from "@/app/lib/definitions"
import Image from 'next/image';

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

  return (
    <div>

      <main className="flex justify-center min-h-screen min-w-screen">
        <div className="w-full h-full justify-center flex-col p-4">
          {album && (
            <>
              <div className="text-4xl font-bold text-white mb-4 mt-4">Name: {album.name}</div>
              <ul className="text-white list-none space-y-2 mb-8">
                <li>Artist: {album.artist}</li>
                <li>Listeners: {album.listeners}</li>
                <li>Genre: {album.genre}</li>
              </ul>
              <div className = "flex align-center justify-center w-1/5 h-1/5">
                <div className="relative w-full h-full">
                  <Image
                    src={album.extralargeimage}
                    className="object-cover rounded-xl h-full w-full"
                    alt={album.name}
                    width={300}
                    height={300}
                  />
                </div>
              </div>
              <div className="justify-center text-white mt-8 mb-8">Summary: {album.summary}</div>
            </>
          )}
          
        </div>
      </main>
      
    </div>
  );
}
