'use client';

import React, { useState, useEffect } from 'react';
import AlbumCard from './albumCard';
import { Album, Filters } from '../lib/definitions';

type AlbumsClientComponentProps = {
  initialAlbums: Album[];
};

const AlbumsClientComponent: React.FC<AlbumsClientComponentProps> = ({ initialAlbums }) => {
  const [filters, setFilters] = useState<Filters>({ genre: 'all', minPrice: 0, maxPrice: 1000 });
  const [albums, setAlbums] = useState<Album[]>(initialAlbums);
  const [filteredAlbums, setFilteredAlbums] = useState<Album[]>(initialAlbums);
  
  useEffect(() => {
    setFilteredAlbums(albums.filter(album => {
      return (filters.genre === 'all' || album.genre === filters.genre) && album.price >= filters.minPrice && album.price <= filters.maxPrice;
    }));
  }, [albums, filters]);

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters(prevFilters => ({
      ...prevFilters,
      genre: event.target.value,
    }));
  };

  const handleChangeMinPrice = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setFilters(prevFilters => ({
      ...prevFilters,
      minPrice: value,
    }));
  };

  return (
    <>
    <div className="filters-container">
        <div className="w-full md:w-1/6 flex flex-col gap-4">
            <label htmlFor="genre" className="text-lg font-medium">Genre</label>
            <select id="genre" value={filters.genre} onChange={handleGenreChange}>
              <option value="all">Todos</option>
              <option value="rock">Rock</option>
              <option value="metal">Metal</option>
              <option value="pop">Pop</option>
            </select>
        </div>
     
        <div className="flex flex-col gap-4">
          <label htmlFor="price" className="text-lg font-medium">Minimum Price</label>
          <input
            type="range"
            id="price"
            min="0"
            max="1000"
            value={filters.minPrice}
            onChange={handleChangeMinPrice}
          />
          <span>${filters.minPrice}</span>
        </div>
    </div>
      <div className= "w-full md:w-5/6 p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 albums-container">
        {filteredAlbums.map(album => (
          <AlbumCard key={album.name} {...album} />
        ))}
      </div>
    </>
  );
};

export default AlbumsClientComponent;