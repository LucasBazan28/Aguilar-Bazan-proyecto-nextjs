import { fetchTopListened } from "../lib/data";
import { Album } from "../lib/definitions";

export default async function Home() {
    const albums: Album[] = await fetchTopListened();
    return (
      <div>
        <h1>Top 5 Listened Albums</h1>
        <ul>
          {albums.map((album) => (
            <li key={album.name}>
              <p>Artist: {album.artist}</p>
              <p>Listeners: {album.listeners}</p>
            </li>
          ))}
        </ul>
      </div>
    );
  }