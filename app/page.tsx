import Head from "next/head";
import Header from "./ui/topNav";
import AlbumComponent from "./ui/albumsComponent";

export default function Home() {
  return (
    <>
    <Head>
      <title>Home</title>
    </Head>
    
    <Header />

    <AlbumComponent />  
    </>
  );
}
