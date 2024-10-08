import React from 'react';
import { fetchFilteredAlbums, fetchAlbumsPages, fetchAllGenres } from '@/app/lib/data';
import { Album, Genre } from '@/app/lib/definitions';
import AlbumsClientComponent from './AlbumsClientComponent';
import Pagination from './Pagination';

export default async function AlbumsComponent({ query, currentPage }: { query: string, currentPage: number }){
  const albums: Album[] = await fetchFilteredAlbums(query, currentPage);
  const totalPages = await fetchAlbumsPages(query);
  const genres: Genre[] = await fetchAllGenres();

  return (
    <>
      {albums.length > 0 ? (
        <div className="grid-cols-1 justify-items-center">
          <AlbumsClientComponent initialAlbums={albums} genres={genres} />
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