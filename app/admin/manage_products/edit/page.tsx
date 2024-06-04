"use client";
import { updateLastFMAlbum } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Album } from '@/app/lib/definitions';

type EditAlbumProps = {
    album: Album;
  };

export default function EditAlbum() {
    const name = useSearchParams().get('name');
    const artist = useSearchParams().get('artist');
    const genre = useSearchParams().get('genre');
    const price = useSearchParams().get('price');  

    const [album, setAlbum] = useState<Album>({} as Album);

    useEffect(() => {
            setAlbum({
                name: name as string,
                artist: artist as string,
                genre: genre as string,
                price: parseFloat(price as string),
                smallImage: '',
                mediumimage: '',
                largeimage: '',
                extralargeimage: '',
                megaimage: '',
                lastFmUrl: '',
                listeners: 0,
                summary: '',
                cantidadComprada: 0
            });
        
    }, [ name, artist, genre, price]);

    return (
        <div>
            <h1>Edit Album</h1>
            <form>
                <div className='text-bold'>
                    {album.name} - {album.artist}   
                </div>
                <div>
                    <label>Genre:</label>
                    <input 
                        type="text"
                        className='text-black'
                        value={album.genre} 
                        onChange={(e) => setAlbum({ ...album, genre: e.target.value })} 
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input 
                        type="number"
                        className='text-black'
                        value={album.price} 
                        onChange={(e) => setAlbum({ ...album, price: parseFloat(e.target.value) })} 
                    />
                </div>
                <button 
                    type="submit"
                    onClick={() => updateLastFMAlbum(album)}
                    >Save Changes
                </button>
            </form>
        </div>
    );
}