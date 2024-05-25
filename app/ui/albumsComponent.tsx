import React, { useState, useLayoutEffect } from 'react';
import { fetchAllAlbums } from '@/app/lib/data';
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import AlbumCard from './albumCard';

export default async function AlbumsComponent() {
  const albums = await fetchAllAlbums();
  return (
    <div className="albums-container">
    {albums.map((album) => (
        <AlbumCard key={album.name} {...album} />
      ))}
      </div>
  );
}; 
