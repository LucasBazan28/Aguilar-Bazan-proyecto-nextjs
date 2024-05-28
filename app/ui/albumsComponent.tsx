import React, { useState, useLayoutEffect } from 'react';
import { fetchAllAlbums } from '@/app/lib/data';
import AlbumCard from './albumCard';

export default async function AlbumsComponent() {
  const albums = await fetchAllAlbums();
  return (
    /*<div className="albums-container">*/
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 albums-container">
    {albums.map((album) => (
        <AlbumCard key={album.name} {...album} />
      ))}
      </div>
  );
}; 
