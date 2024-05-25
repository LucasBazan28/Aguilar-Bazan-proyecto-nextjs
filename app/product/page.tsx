"use client";
import { useEffect, useState } from 'react';
import {Album} from "@/app/lib/definitions"

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
      <h1>Product Details</h1>
      {album && (
        <>
          <p>Name: {album.name}</p>
          <p>Listeners: {album.listeners}</p>
          <p>Genre: {album.genre}</p>
          <p>Summary: {album.summary}</p>
        </>
      )}
    </div>
  );
}
