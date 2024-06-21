import { useContext } from 'react'
import { AlbumContext } from '../contexts/albumContext'

export const useAlbum = () => {
  const context = useContext(AlbumContext)

  if (context === undefined) {
    throw new Error('useAlbum must be used within a AlbumProvider')
  }

  return context
}