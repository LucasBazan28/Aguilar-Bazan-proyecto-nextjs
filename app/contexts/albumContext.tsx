"use client";
import { useState, createContext, ReactNode } from 'react';
import {Album, AlbumContextType} from '../lib/definitions';

// Create the context with default values
export const AlbumContext = createContext<AlbumContextType>({
  album: null,
  setAlbum: () => {}
});


export function useAlbum() {
  const [album, setAlbumState] = useState<Album | null>(null);

  const setAlbum = (album: Album) => {
    setAlbumState(album);
  };

  return { album, setAlbum };
}

type AlbumProviderProps = {
  children: ReactNode;
}

export function AlbumProvider({ children }: AlbumProviderProps) {
  const { album, setAlbum } = useAlbum();

  return (
    <AlbumContext.Provider value={{ album, setAlbum }}>
      {children}
    </AlbumContext.Provider>
  );
}