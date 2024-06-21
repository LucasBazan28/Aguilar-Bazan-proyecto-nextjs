import AlbumsComponent from "../ui/albumsComponent";
import {logOut } from '@/app/lib/actions';
import HomeCarousel from "../ui/homeCarousel";
import Search from "../ui/Search";
import {Suspense} from 'react';

export default async function Home({
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

    <HomeCarousel/>
    <Search placeholder="Search Albums"/>
    <div className="flex flex-col min-h-screen min-w-screen mt-4 mb-4">
      <div className="flex-col md:flex-row">
        <Suspense key={query + currentPage} fallback={<div>Loading...</div>}>
          <AlbumsComponent query={query} currentPage={currentPage} />
        </Suspense>      
      </div>
      <form
          action={logOut}
        >
          <button className="mt-4 mr-8 ml-4 flex h-[60px] w-full items-center justify-center gap-2 rounded-md bg-black p-4 text-lg font-medium text-gray-800 hover:bg-gray-200 hover:text-black md:w-auto md:justify-start">
            <div className="block">Sign Out</div>
          </button>
        </form>
      </div>
    </>
  );
}
