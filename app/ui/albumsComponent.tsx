import React from 'react';
import { fetchAllAlbums } from '@/app/lib/data';
import { Album } from '@/app/lib/definitions';
import AlbumsClientComponent from './AlbumsClientComponent';

export default async function AlbumsComponent() {
  const albums: Album[] = await fetchAllAlbums();

  return (
      <AlbumsClientComponent initialAlbums={albums} />  
  );
}