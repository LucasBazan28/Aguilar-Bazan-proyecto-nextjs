"use client";
import { updateLastFMAlbum } from '@/app/lib/actions';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Album } from '@/app/lib/definitions';
import {useRef} from 'react';
type EditAlbumProps = {
    album: Album;
  };

export default function EditAlbum() {
    const name = useSearchParams().get('name');
    const artist = useSearchParams().get('artist');
    const genre = useSearchParams().get('genre');
    const price = useSearchParams().get('price');  
    const formRef = useRef<HTMLFormElement>(null)

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

    const handleSubmit = (event: any) => {
        event.preventDefault();
        
        if(formRef.current){
        const formData = new FormData(formRef.current);
    
        // Agregar datos adicionales
        formData.append('artist', album.artist);
        formData.append('album', album.name);
    
        updateLastFMAlbum(formData)
      }
    };

    return (
        <div>
            <h1>Edit Album</h1>
            <form ref={formRef} onSubmit={handleSubmit} >
                <div className='text-bold'>
                    {album.name} - {album.artist}   
                </div>
                <div>
                    <label htmlFor='genre'>Genre:</label>
                    <input 
                        type="genre"
                        id="genre"
                        name="genre"
                        className='text-black'
                        value={album.genre} 
                        onChange={(e) => setAlbum({ ...album, genre: e.target.value })} 
                    />
                </div>
                <div>
                    <label>Price:</label>
                    <input 
                        id="price"
                        type="number"
                        name="price"
                        inputMode="decimal"
                        className='text-black'
                        value={album.price} 
                        onChange={(e) => setAlbum({ ...album, price: parseFloat(e.target.value) })} 
                    />
                </div>
                <button
                    >Save Changes
                </button>
            </form>
        </div>
    );
}