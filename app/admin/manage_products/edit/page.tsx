"use client";
import { updateLastFMAlbum } from '@/app/lib/actions';
import { useEffect, useState } from 'react';
import {useRef} from 'react';

export default function EditAlbum() {
    const [name, setName] = useState<string | null>(null); // Extrae el valor y la función de actualización
    const [artist, setArtist] = useState<string | null>(null); // Extrae el valor y la función de actualización
    const [genre, setGenre] = useState<string | null>(null); // Extrae el valor y la función de actualización
    const [price, setPrice] = useState<string | null>(null); // Extrae el valor y la función de actualización


    useEffect(() => {
        const queryParams = new URLSearchParams(window.location.search);
        setName(queryParams.get('name'));
        setArtist(queryParams.get('artist'));
        setGenre(queryParams.get('genre'));
        setPrice(queryParams.get('price'));
    }, []);

    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (event: any) => {
        event.preventDefault();
        
        if(formRef.current){
            const formData = new FormData(formRef.current);
        
            // Agregar datos adicionales
            if (artist)
                formData.append('artist', artist);
            if (name)
                formData.append('album', name);
        
            updateLastFMAlbum(formData)
          }
    };

    return (
        <div className='flex items-center justify-center min-h-screen'>
            <div className="p-6 items-center relative border border-white rounded-lg bg-white mx-auto flex w-1/2 md:w-2/5 flex-col sm:-mt-20 shadow-md" >
                <h1 className="relative flex w-full text-2xl text-black font-bold mb-4">Edit Album</h1>
                <form ref={formRef} onSubmit={handleSubmit} >
                    <div className='text-lg text-black font-bold mb-4'>
                        {name} - {artist}   
                    </div>
                    <div className='mb-4 text-black'>
                        <label htmlFor='genre' className='font-semibold'>Genre: </label>
                        <input 
                            type="genre"
                            id="genre"
                            name="genre"
                            className="shadow-md px-3 py-2 border border-gray-300 rounded-md text-black"
                            value={genre || ""} 
                            onChange={(e) => setGenre(e.target.value )} 
                        />
                    </div>
                    <div className='mb-4 text-black'>
                        <label className='mb-2 font-semibold'>Price: $</label>
                        <input 
                            id="price"
                            type="number"
                            name="price"
                            inputMode="decimal"
                            className="shadow-md px-3 py-2 border border-gray-300 rounded-md text-black"
                            value={price || ""} 
                            onChange={(e) => setPrice( (e.target.value) )} 
                        />
                    </div>
                    <div className="flex justify-center items-center">
                        <button className="submitButton shadow-md">
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}