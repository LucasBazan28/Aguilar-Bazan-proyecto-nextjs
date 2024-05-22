// ./components/AlbumsComponent.tsx

import React, { useState, useLayoutEffect } from 'react';
import { fetchAllAlbums } from '@/app/lib/data';
import 'tailwindcss/tailwind.css';

export default async function AlbumsComponent() {
  const albums = await fetchAllAlbums();
  return (
    /*<div className="container mx-auto py-6">
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
    </div>*/
    <div className="albums-container">
      <div className="container mx-auto  grid grid-cols-4 gap-4">
        {albums.map((album) => (
          <div key={album.name} className="border p-4 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <div className="flex justify-center mb-4">
              {/*<img src={album.imageUrl} alt={album.name} className="w-full h-48 object-cover rounded-lg" />*/}
            </div>
            <h2 className="text-xl font-bold mb-2">{album.name}</h2>
            <p className="text-gray-700">Artist: {album.artist}</p>
            <p className="text-gray-700">Listeners: {album.listeners}</p>
            <p className="text-gray-700">Genre: {album.genre}</p>
            <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300">View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
}; 
