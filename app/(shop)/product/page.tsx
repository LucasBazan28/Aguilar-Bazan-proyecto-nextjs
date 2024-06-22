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
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchAlbum = async () => {
      setLoading(true); // Activar el estado de carga al iniciar la solicitud
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
      finally{
        setLoading(false);
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
  }, [album]);
  

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
    <div className="flex min-h-screen min-w-screen">
      {loading ? (
        <div>
          <div className="mt-custom"></div>
          <p className="text-center text-xl ml-6 mt-6">Loading...</p>
        </div>
      ) : (
        <div className="flex flex-col md:flex-row w-full p-4">
          <div className="w-full md:w-2/3">
            {generalAlbum && (
              <>
                <div className="mt-custom"></div>
                <div className="text-4xl font-bold text-white mb-4 mt-4">Name: {generalAlbum.name}</div>
                <ul className={`${inter.className} text-white list-none space-y-2 mb-8`}>
                  <li>Artist: {generalAlbum.artist}</li>
                  <li>Listeners: {generalAlbum.listeners}</li>
                  <li>Genre: {generalAlbum.genre}</li>
                </ul>
                
                {generalAlbum.extralargeimage &&
                (<div className="flex justify-center sm:w-full sm:h-full md:w-1/2 md:h-1/2 lg:w-1/3 lg:h-1/3">
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
                
                {summary && (
                  <div className={`${inter.className} text-white mt-8 prose`}>
                    Summary: {summary}
                  </div>
                )}
                
                <form ref={formRef} onSubmit={handleSubmit} className="mb-8">
                  <button className="rounded-md border p-2 bg-white mt-8 hover:bg-gray-300">
                    <span className="text-black">Search Artist</span>
                  </button>
                  <div
                    className="flex items-center space-x-1"
                    aria-live="polite"
                    aria-atomic="true"
                  >
                    {errorMessage && (
                      <>
                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                        <p className="text-sm text-red-500">{errorMessage + ". Por favor ingrese el album en forma manual"}</p>
                      </>
                    )}
                  </div>
                </form>
              </>
            )}
          </div>
          
          <div className="w-full mt-4 md:w-1/3 md:pl-8 md:mt-custom">
            {generalAlbum && (
              <ManageProductInCart album={generalAlbum} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
