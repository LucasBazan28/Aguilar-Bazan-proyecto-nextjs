import Head from "next/head";
import AlbumsComponent from "../ui/albumsComponent";
import { signOut } from '@/auth';
import { useState } from "react";

//Si tomase datos de un json haría: import {albums as initialAlbums} from "../mock/albums.json";
import { filtersComponent } from "../ui/filtersComponent";

export default function Home() {
  //const [albums] = useState(initialAlbums);
  const [filters, setFilters] = useState({
    genre: "all",
    //minPrice: 0,
    //maxPrice: 1000,
  });

  const filterAlbums = (albums) => {
    return albums.filter((album) => {
      return (
        (filters.genre === "all" || album.genre === filters.genre)
        //&& (filters.minPrice <= album.price && album.price <= filters.maxPrice)
      );
    });
  }

  const filteredAlbums = filterAlbums(albums);
  return (
    <>
    <Head>
      <title>Home</title>
    </Head>
    <filtersComponent changeFilters={setFilters}/>
    <AlbumsComponent albums = filteredAlbums={}/>
    <form
          action={async () => {
            'use server';
            await signOut();
          }}
        >
          <button className="flex h-[60px] w-full items-center justify-center gap-2 rounded-md bg-black p-4 text-lg font-medium text-gray-800 hover:bg-gray-200 hover:text-black md:w-auto md:justify-start">
            <div className="hidden md:block">Sign Out</div>
          </button>
      </form>
    </>
  );
}
