"use client";
import Head from "next/head";
import AlbumsComponent from "../ui/albumsComponent";
import {logOut } from '@/app/lib/actions';
import { useState } from "react";
import { FiltersComponent } from "../ui/filtersComponent";
import HomeCarousel from "../ui/homeCarousel";

export default function Home() {
  const [filters, setFilters] = useState({
    genre: "all",
    minPrice: 0,
    maxPrice: 1000,
  });

 
  return (
    <>
    <Head>
      <title>Home</title> 
    </Head>

    {/*PONER CARROUSSEL DE IMAGENES AQUI*/}
    <HomeCarousel/>
    <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/6 p-4">
          <FiltersComponent setFilters={setFilters} />
        </div>
        <div className="w-full md:w-5/6 p-4">
          <AlbumsComponent filters={filters} />
        </div>
    </div>
    <form
          action={logOut}
        >
          <button className="flex h-[60px] w-full items-center justify-center gap-2 rounded-md bg-black p-4 text-lg font-medium text-gray-800 hover:bg-gray-200 hover:text-black md:w-auto md:justify-start">
            <div className="hidden md:block">Sign Out</div>
          </button>
      </form>
    </>
  );
}
