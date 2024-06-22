import "server-only"
import { sql } from '@vercel/postgres';
import {
  Album,
  Sale
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

  export async function fetchAllSales() {
    noStore();
    try {
      // Realizar la consulta SQL para seleccionar todas las ventas
      const result = await sql<Sale>`
        SELECT * FROM sales;
      `;
  
      // Devolver el resultado de la consulta
      return result.rows;
    } catch (error) {
      // Manejar cualquier error de consulta o conexión
      console.error('Error fetching sales:', error);
      throw error; // Opcional: propagar el error para manejarlo en un nivel superior
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

export async function fetchAlbumsWithGenre(genre: string) {  //el parametro del genero debe estar en minuscula o pasarse a minuscula acá
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
const ITEMS_PER_PAGE = 6;
export async function fetchFilteredAlbums(
  query: string,
  currentPage: number,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const albums = await sql<Album>`
      SELECT *
      FROM albums
      WHERE
        name ILIKE ${`%${query}%`} OR
        artist ILIKE ${`%${query}%`} OR
        genre ILIKE ${`%${query}%`} OR
        summary ILIKE ${`%${query}%`}
      ORDER BY name DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return albums.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch albums.');
  }
}
export async function fetchAlbumsPages(query: string) {
  noStore();
  try {
    const count = await sql`
      SELECT COUNT(*)
      FROM albums
      WHERE
        name ILIKE ${`%${query}%`} OR
        artist ILIKE ${`%${query}%`} OR
        genre ILIKE ${`%${query}%`} OR
        summary ILIKE ${`%${query}%`}
    `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of albums.');
  }
}

export async function fetchTopListened() {
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

export async function fetchArtist(name: string){
  try {
    const artistQuery = await sql<Album>`
      SELECT * FROM artists
      WHERE LOWER(name) = LOWER(${name})
      LIMIT 1
    `;
    return artistQuery.rows[0] || null;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the album.');
  }
}
