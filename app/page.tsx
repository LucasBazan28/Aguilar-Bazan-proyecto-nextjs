//import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import "daisyui/dist/full.css";
import Header from "./ui/topNav";
import AlbumComponent from "./ui/albumsComponent";

export default function Home() {
  return (
    <>
    <Head>
      <title>Home</title>
    </Head>

    <Header />

    <div style={{ height: '2000px' }}>
      {/*<AlbumComponent /> */}  
    </div>
    </>
  );
}
