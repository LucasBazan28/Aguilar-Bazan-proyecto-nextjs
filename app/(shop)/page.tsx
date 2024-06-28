import AlbumsComponent from "../ui/albumsComponent";
import {logOut, isLoggedIn } from '@/app/lib/actions';
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
  const userLoggedIn = await isLoggedIn(); // Verificar si el usuario está logueado

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
      {userLoggedIn && (
      <form action={logOut}>
                    <button className="ml-8 mb-4 rounded-md bg-black p-4 text-lg font-medium text-white hover:bg-white hover:text-black">
                        <div>Sign Out</div>
                    </button>
                </form>
      )}
      </div>
    </>
  );
}
