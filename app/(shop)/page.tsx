import Head from "next/head";
import AlbumsComponent from "../ui/albumsComponent";
import { signOut } from '@/auth';

export default function Home() {
  return (
    <>
    <Head>
      <title>Home</title>
    </Head>
    
    <AlbumsComponent />
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
