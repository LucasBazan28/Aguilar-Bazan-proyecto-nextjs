import Head from "next/head";
import AlbumComponent from "./ui/albumsComponent";

export default function Home() {
  return (
    <>
    <Head>
      <title>Home</title>
    </Head>

    <AlbumComponent />
    </>
  );
}
