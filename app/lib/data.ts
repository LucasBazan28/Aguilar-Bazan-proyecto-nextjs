import "server-only"
import { sql } from '@vercel/postgres';
import {
  Album
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

export async function fetchAllAlbums() {
    noStore();
    try {
      const data = await sql<Album>`
        SELECT *
        FROM albums`;
  
      return data.rows;
    } catch (error) {
      console.error('Database Error:', error);
      throw new Error('Failed to fetch the albums.');
    }
  }

  export async function fetchAlbumsWithListeners(limiteInferior: number, limiteSuperior: number) {
    noStore();
    try {
        const data = await sql<Album>`
            SELECT *
            FROM albums
            WHERE listeners >= ${limiteInferior} AND listeners <= ${limiteSuperior}`;
  
        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the albums.');
    }
}

export async function fetchAlbumsWithGender(genre: string) {  //el parametro del genero debe estar en minuscula o pasarse a minuscula acá
                                                                //la comparación del where es case sensitive
    noStore();
    try {
        const data = await sql<Album>`
            SELECT *
            FROM albums
            WHERE genre = ${genre}`;
  
        return data.rows;
    } catch (error) {
        console.error('Database Error:', error);
        throw new Error('Failed to fetch the albums.');
    }
}

export async function fetchTopListened() {
  noStore();
  try {
    const topListenedAlbumsQuery = await sql<Album>`
      SELECT * FROM albums
      ORDER BY listeners DESC
      LIMIT 5
    `;
    return topListenedAlbumsQuery.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the albums.');
  }
}

export async function fetchTopSelled() {
  noStore();
  try {
    const topSelledAlbumsQuery = await sql<Album>`
      SELECT * FROM albums
      ORDER BY cantidadComprada DESC
      LIMIT 5
    `;
    return topSelledAlbumsQuery.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the albums.');
  }
}

export async function fetchAlbumByName(name: string){
  try {
    const albumQuery = await sql<Album>`
      SELECT * FROM albums
      WHERE LOWER(name) = LOWER(${name})
      LIMIT 1
    `;
    return albumQuery.rows[0] || null;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the album.');
  }
}
