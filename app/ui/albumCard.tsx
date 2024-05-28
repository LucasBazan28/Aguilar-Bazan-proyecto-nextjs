
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Album} from "@/app/lib/definitions"

const AlbumCard = (album: Album) => {
  // Serializar el objeto album en un JSON string y luego codificarlo para URL
  const albumData = encodeURIComponent(JSON.stringify(album));

  return (
    <Card key={album.name} className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-small uppercase font-bold">{album.name}</p>
        <small className="text-default-500">Listeners: {album.listeners}</small>
        <h4 className="font-bold text-large">Genre: {album.genre}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        {album.mediumimage && (       //pequeño chequeo para poner la imagen solamente si no es nula (tene en cuenta que lastfm siempre devuelve listeners, nombre y artista, pero no siempre imagenes)
          <Image
            alt={album.name}
            className="object-cover rounded-xl"
            src={album.mediumimage}
            width={50}
            height={50}
          />
        )}
        <div className="mt-2">
          <Link 
            href={{
              pathname: '/product', 
              query: { album: albumData }
            }}
          >
            <button className="btn btn-primary">VER PRODUCTO</button>
          </Link>
        </div>
      </CardBody>
    </Card>
  );
};

export default AlbumCard;