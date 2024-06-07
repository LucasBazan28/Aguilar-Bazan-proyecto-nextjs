'use client';

import React, { useState, useEffect } from 'react';
import AlbumCard from './albumCard';
import { Album, Filters } from '../lib/definitions';

type AlbumsClientComponentProps = {
  initialAlbums: Album[];
};

const AlbumsClientComponent: React.FC<AlbumsClientComponentProps> = ({ initialAlbums }) => {
  const [filters, setFilters] = useState<Filters>({ genre: 'all', minPrice: 0, maxPrice: 200 });
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

if(filteredAlbums.length > 0){
  return (
    <>
    <div className="flex flex-wrap">
      
      <div className="w-full md:w-1/6 flex flex-col gap-4 p-4">
        <div className="flex flex-col gap-4">
            <label htmlFor="genre" className="text-lg font-medium text-white">Genre</label>
            <select className="text-black" id="genre" value={filters.genre} onChange={handleGenreChange}>
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
            max="200"
            value={filters.minPrice}
            onChange={handleChangeMinPrice}
          />
          <span>${filters.minPrice}</span>
        </div>
      </div>

      <div className = "w-full md:w-5/6 p-4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 albums-container">
        {filteredAlbums.map(album => (
          <AlbumCard key={album.name} {...album} />
        ))}
      </div>
      
    </div>
    </>
  );
}else{
  return(
    <>
    <p>Sorry, we couldn´t find the album you´re looking for.</p>
    <div className="w-full">
          <div className="flex flex-col gap-4">
              <label htmlFor="genre" className="text-lg font-medium text-white">Genre</label>
              <select className="text-black" id="genre" value={filters.genre} onChange={handleGenreChange}>
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
              max="200"
              value={filters.minPrice}
              onChange={handleChangeMinPrice}
            />
            <span>${filters.minPrice}</span>
          </div>
        </div>
    </>
  )
}
};

export default AlbumsClientComponent;