import Head from "next/head";
import AlbumsComponent from "../ui/albumsComponent";
import {logOut } from '@/app/lib/actions';
import { FiltersComponent } from "../ui/filtersComponent";
import HomeCarousel from "../ui/homeCarousel";

export default function Home() {
 
  return (
    <>
    <Head>
      <title>Home</title> 
    </Head>

    {/*PONER CARROUSSEL DE IMAGENES AQUI*/}
    <HomeCarousel/>
    <div className="flex flex-col md:flex-row">

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
