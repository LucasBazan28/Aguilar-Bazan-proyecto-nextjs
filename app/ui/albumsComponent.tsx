import React, { useState, useEffect } from 'react';
import { fetchAllAlbums } from '@/app/lib/data';
import AlbumCard from './albumCard';
import { Album, Filters } from '@/app/lib/definitions';

type AlbumsComponentProps = {
  filters: Filters;
};


export default async function AlbumsComponent({filters} : AlbumsComponentProps) {
  /*const albums = await fetchAllAlbums();
  return (
    /*<div className="albums-container">
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 albums-container">
    {albums.map((album) => (
        <AlbumCard key={album.name} {...album} />
      ))}
      </div>
  );*/ 
  const albums: Album[] = await fetchAllAlbums();
  const filteredAlbums: Album[]= albums.filter((album, index) => {
    return filters.genre === "all" || album.genre === filters.genre;
  });

  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 albums-container">
      {filteredAlbums.map((album) => (
        <AlbumCard key={album.name} {...album} />
      ))}
    </div>
  );
}; 
