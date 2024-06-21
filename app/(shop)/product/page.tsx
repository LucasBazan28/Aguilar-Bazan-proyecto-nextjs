"use client";
import Image from 'next/image';
import { Inter } from 'next/font/google'
import { ManageProductInCart } from '@/app/ui/manageProductInCart';
import { useAlbum} from '@/app/hooks/useAlbum';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useFormStatus } from 'react-dom';
import { getArtistInfo } from '@/app/lib/actions';
import { useRef } from 'react';
import { Album } from '@/app/lib/definitions';
 
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ['latin'] })

export default function ProductPage() {

  const { album } = useAlbum();
  let errorMessage;
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    
    if(formRef.current){
        const formData = new FormData(formRef.current);
    
        // Agregar datos adicionales
        if (album)
            formData.append('artist', (album as Album).artist);
    
        errorMessage = getArtistInfo(formData)
      }
};
  

  const summary = album?.summary?.replace(/<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1[^>]*>.*?<\/a>/gi, '') ?? '';

  return (
    <div>

    <div className="flex min-h-screen min-w-screen">
        <div className="ml-8 w-full h-full flex-col p-4 mr-8">
          {album && (
            <>
              <div className="mt-custom">
              </div>
              <div className="text-4xl font-bold text-white mb-4 mt-4">Name: {album.name}</div>
              <ul className={`${inter.className} text-white list-none space-y-2 mb-8`}>
                <li>Artist: {album.artist}</li>
                <li>Listeners: {album.listeners}</li>
                <li>Genre: {album.genre}</li>
              </ul>
              
              {album.extralargeimage &&
              (<div className = "flex justify-center sm:w-full sm:h-full md:w-1/5 md:h-1/5">
                <div className="relative w-full h-full">
                  <Image
                    src={album.extralargeimage}
                    className="object-cover rounded-xl h-full w-full"
                    alt={album.name}
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
            
              
                <ManageProductInCart album={album}/>
             
              
            </>
          )}
          
        </div>
      </div>
      
    </div>
  );
}
