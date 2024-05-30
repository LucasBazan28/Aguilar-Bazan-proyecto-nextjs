import AlbumsComponent from "../ui/albumsComponent";
import {logOut } from '@/app/lib/actions';
import HomeCarousel from "../ui/homeCarousel";
import Search from "../ui/Search";
import {Suspense} from 'react';

export default function Home({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

 
  return (
    <>

    {/*<HomeCarousel/>*/}
    {/*<Search placeholder="Search Albums"/>Componente que sirve para la búsqueda
    Si lo descomentamos aquí queda oculto detrás del topNav*/}

    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-5/6 p-4 overflow-y-auto">
        <AlbumsComponent/>
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
