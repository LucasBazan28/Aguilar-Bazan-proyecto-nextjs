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
        <div className="grid-cols-1 justify-items-center">
          <AlbumsClientComponent initialAlbums={albums} />
          <div className="mt-4 flex items-center justify-center">
            <Pagination totalPages={totalPages} />
          </div>
        </div>
      ) : (
        <p>Sorry, we couldn´t find the album you´re looking for.</p>
      )}
    </>
  );
}