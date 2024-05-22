// ./components/AlbumsComponent.tsx

import React, { useState, useLayoutEffect } from 'react';
import { fetchAllAlbums } from '@/app/lib/data';
import 'tailwindcss/tailwind.css';

export default async function AlbumsComponent() {
  const albums = await fetchAllAlbums();
  return (
    <div className="container mx-auto py-6">
      <div className="gap-6 columns-6">
        {albums.map((album) => (
          <div key={album.name} className="border p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-2">{album.name}</h2>
            <p className="text-gray-700">Artist: {album.artist}</p>
            <p className="text-gray-700">Listeners: {album.listeners}</p>
            <p className="text-gray-700">Genre: {album.genre}</p>
          </div>
        ))}
      </div>
    </div>
  );
}; 
