
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Album} from "@/app/lib/definitions"
import { useAlbum} from '@/app/hooks/useAlbum';

const AlbumCard = (album: Album) => {
  // Serializar el objeto album en un JSON string y luego codificarlo para URL
  const { setAlbum } = useAlbum();
  const handleClick = () => {
    setAlbum(album);
  };

  return (
    <Card key={album.name} className="w-full">
        {album.largeimage && (       //pequeño chequeo para poner la imagen solamente si no es nula (tene en cuenta que lastfm siempre devuelve listeners, nombre y artista, pero no siempre imagenes)
          <Image
            alt={album.name}
            className="object-contain w-full"
            src={album.largeimage}
            width={200}
            height={200}
          />
        )}
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start w-full">
        <p className="text-small uppercase font-bold">{album.name}</p>
        <small className="text-default-500">Listeners: {album.listeners}</small>
        <h4 className="font-bold text-large">Genre: {album.genre}</h4>
        <h4 className="text-tiny">${album.price}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2 w-full">
        <div className="mt-2">
          <Link 
            href={{
              pathname: '/product'
            }}
          >
            <button className="btn viewProductButton" onClick={handleClick}>VER PRODUCTO</button>
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};

export default AlbumCard;