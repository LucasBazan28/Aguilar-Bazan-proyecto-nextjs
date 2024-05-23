import React, { useState, useLayoutEffect } from 'react';
import { fetchAllAlbums } from '@/app/lib/data';
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import Image from "next/image";


export default async function AlbumsComponent() {
  const albums = await fetchAllAlbums();
  return (
    <div className="albums-container">
    {albums.map((album) => (
      <Card key={album.name} className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <p className="text-tiny uppercase font-bold">{album.name}</p>
        <small className="text-default-500">{album.listeners}</small>
        <h4 className="font-bold text-large">{album.genre}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt=""
          className="object-cover rounded-xl"
          src={album.mediumImage}
          width={270}
        />
      </CardBody>
      </Card>
      ))}
      </div>
  );
}; 
