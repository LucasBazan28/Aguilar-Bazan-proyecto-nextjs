// ./pages/page.tsx



import { fetchAllAlbums } from '@/app/lib/data';


export default async function Page() {
    const albums = await fetchAllAlbums();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {albums.map((album) => (
          <div key={album.name} className="border p-4 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-2">{album.name}</h2>
            <p className="text-gray-700">Artist: {album.artist}</p>
            <p className="text-gray-700">Listeners: {album.listeners}</p>
            <p className="text-gray-700">Genre: {album.genre}</p>
          </div>
        ))}
      </div>
    </div>
  );
  

}