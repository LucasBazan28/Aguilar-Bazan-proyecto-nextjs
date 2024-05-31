import React from 'react';
import { fetchFilteredAlbums, fetchAlbumsPages } from '@/app/lib/data';
import { Album } from '@/app/lib/definitions';
import AlbumsClientComponent from './AlbumsClientComponent';
import Pagination from './Pagination';

export default async function AlbumsComponent({ query, currentPage }: { query: string, currentPage: number }){
  const albums: Album[] = await fetchFilteredAlbums(query, currentPage);
  const totalPages = await fetchAlbumsPages(query);

  return (
    <>
      {albums.length > 0 ? (
        <>
          <AlbumsClientComponent initialAlbums={albums} />
          <div className="mt-4">
            <Pagination totalPages={totalPages} />
          </div>
        </>
      ) : (
        <p>Sorry, we couldn´t find the album you´re looking for.</p>
      )}
    </>
  );
}