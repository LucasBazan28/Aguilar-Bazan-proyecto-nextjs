"use client";
import Image from 'next/image';
import { Inter } from 'next/font/google'
import { ManageProductInCart } from '@/app/ui/manageProductInCart';
import { useAlbum} from '@/app/hooks/useAlbum';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { getArtistInfo } from '@/app/lib/actions';
import { useEffect, useRef, useState } from 'react';
import { Album } from '@/app/lib/definitions';
import { useSearchParams } from 'next/navigation';
 
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] })

export default function ProductPage() {
  const { album } = useAlbum();
  const [generalAlbum, setAlbum] = useState<Album | null>(null);
  const [summary, setSummary] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
          const queryParams = new URLSearchParams(window.location.search);
          const name = queryParams.get('name');
          const response = await fetch(`/api/album?name=${name as string}`);
          if (response.ok) {
            const albumData = await response.json();
            setAlbum(albumData);
            const albumSummary = albumData.summary.replace(/<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1[^>]*>.*?<\/a>/gi, '');
            setSummary(albumSummary);
          } else {
            throw new Error('Failed to fetch album details');
          }
      } catch (error) {
        console.error('Error fetching album details:', error);
      }
    };

       //tries to get from context, ifnot, takes it from api/album
    if (!album) {
      fetchAlbum();
    }
    else{
      setAlbum(album);
      const albumSummary = album.summary?.replace(/<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1[^>]*>.*?<\/a>/gi, '') ?? null;
      setSummary(albumSummary);
    }
  }, []);
  

  let errorMessage;
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    
    if(formRef.current){
        const formData = new FormData(formRef.current);
    
        // Agregar datos adicionales
        if (generalAlbum)
            formData.append('artist', (generalAlbum as Album).artist);
    
        errorMessage = getArtistInfo(formData)
      }
  };
  

  return (
    <div>

    <div className="flex min-h-screen min-w-screen">
        <div className="ml-8 w-full h-full flex-col p-4 mr-8">
          {generalAlbum && (
            <>
              <div className="mt-custom">
              </div>
              <div className="text-4xl font-bold text-white mb-4 mt-4">Name: {generalAlbum.name}</div>
              <ul className={`${inter.className} text-white list-none space-y-2 mb-8`}>
                <li>Artist: {generalAlbum.artist}</li>
                <li>Listeners: {generalAlbum.listeners}</li>
                <li>Genre: {generalAlbum.genre}</li>
              </ul>
              
              {generalAlbum.extralargeimage &&
              (<div className = "flex justify-center sm:w-full sm:h-full md:w-1/5 md:h-1/5">
                <div className="relative w-full h-full">
                  <Image
                    src={generalAlbum.extralargeimage}
                    className="object-cover rounded-xl h-full w-full"
                    alt={generalAlbum.name}
                    width={300}
                    height={300} 
                  />
                </div>
              </div>)}
              {summary && (<div className={`${inter.className} justify-center text-white mt-8 mb-8 sm:mr-8 md:mr-40 prose`}>
                    Summary: {summary}
              </div>)
              }
              <form ref={formRef} onSubmit={handleSubmit}>
                <button className="rounded-md border p-2 bg-white hover:bg-gray-100">
                <span className="text-black">Search Artist</span>
                </button>
                <div
                  className="flex items-center space-x-1"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {errorMessage &&
                    (<>
                      <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                      <p className="text-sm text-red-500">{errorMessage + ". Por favor ingrese el album en forma manual"}</p>
                    </>
                   )}
                </div>
              </form>
            
              
                <ManageProductInCart album={generalAlbum}/>
             
              
            </>
          )}
          
        </div>
      </div>
      
    </div>
  );
}
