'use server';

import { signIn, signOut, auth } from '@/auth';
import { AuthError } from 'next-auth';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Album } from './definitions';
import { NextApiRequest, NextApiResponse } from 'next';

export async function logOut(){
  try{
    await signOut();
  }
  catch(error){
    if ((error as Error).message === 'NEXT_REDIRECT')  {
      console.log("redireccion a home")
      redirect("/login")
    }
    else throw error
  }
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }

  export async function createLastFMAlbum(
    prevState: string | undefined,
    formData: FormData
) {
  let inserted = false;
  try{
      const artist = formData.get('artist') as string ;
      const album = formData.get('albumName') as string;

      const apiKey = process.env.LASTFM_APIKEY;
      const url = `https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${apiKey}&artist=${artist}&album=${album}&format=json`;
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.error) {
        // Si el JSON contiene el atributo 'error', se muestra el mensaje de error
        return (data.message);
      } else if (!data.album.image || !data.album.image[0] || !data.album.image[0]['#text']) {
        // Si no hay error pero el JSON no tiene el atributo 'images' o 'images[0].text' está vacío
        return ("El album encontrado no tiene los atributos suficientes");
      } else {
        const result = await sql`SELECT * FROM albums WHERE LOWER(name) = LOWER(${album})`;

        // El resultado de la consulta EXISTS será un objeto con una propiedad 'exists'
        if (result.rows.length > 0) {
          return "El álbum ya se encuentra disponible";
        }
        else{
          inserted = true;

          data.album.genre = formData.get('genre') as string ;
          const priceValue = formData.get('price');

          let price: number | null = null;

          if (typeof priceValue === 'string') {
            // Solo si priceValue es una cadena, convertir a número
            price = parseFloat(priceValue);
          }

          data.album.price = price;
          data.album.cantidadComprada = 0;
          await sql`
            INSERT INTO albums (name, artist, smallImage, mediumImage, largeImage, extraLargeImage, megaImage, lastFmUrl, listeners, genre, summary, price, cantidadComprada)
            VALUES (${data.album.name}, ${data.album.artist}, NULLIF(${data.album.image[0]["#text"]}, ''), 
            NULLIF(${data.album.image[1]["#text"]}, ''), NULLIF(${data.album.image[2]["#text"]}, ''), 
            NULLIF(${data.album.image[3]["#text"]}, ''), NULLIF(${data.album.image[4]["#text"]}, ''), 
            ${data.album.url ? data.album.url: null}, ${parseInt(data.album.listeners, 10)},
            ${data.album.genre}, ${data.album.wiki ? data.album.wiki.summary : null}, 
            ${data.album.price}, ${data.album.cantidadComprada}
            )
          `;
        }
    }
  }
  catch(error){
    return ("Something went wrong");
  }
  finally{
    if (inserted){
      revalidatePath('/');
      redirect('/');
    }
  }
}

  export async function getArtistInfo(
    formData: FormData
  ){
    let inserted = false;
    const artist = formData.get('artist') as string;

  try {
    const apiKey = process.env.LASTFM_APIKEY;
    const url = `https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artist}&api_key=${apiKey}&format=json`;

    const response = await fetch(url);
    const data = await response.json();

    if (data.error) {
      return data.message; // Si hay un error, devuelve el mensaje de error
    }  else if (!data.artist.bio || !data.artist.bio.summary) {
      return 'El artista no tiene un resumen disponible'; // Si no hay resumen disponible para el artista
    } else {
      const result = await sql`SELECT * FROM artists WHERE LOWER(name) = LOWER(${data.artist.name})`;

      inserted = true;
      if (result.rows.length == 0) {

        // Insertar en la tabla de artistas
        await sql`
          INSERT INTO artists (name, summary)
          VALUES (${data.artist.name}, ${data.artist.bio.summary})
        `;
      }
    }
  } catch (error) {
    console.error('Error al crear artista:', error);
    return 'Ocurrió un error al crear el artista';
  } finally {
    if (inserted) {
      const artistNameQueryParam = encodeURIComponent(artist);
      revalidatePath(`/product/artist?name=${artistNameQueryParam}`);
      redirect(`/product/artist?name=${artistNameQueryParam}`);
    }
  }
  }

  
  export async function deleteLastFMAlbum(
    album: Album
  ) {
  let deleted = false;
  try{
      const artist = album.artist
      const albumName = album.name;   
      
      await sql`DELETE FROM albums WHERE LOWER(name) = LOWER(${albumName}) AND LOWER(artist) = LOWER(${artist})`;
      deleted = true;
  }
  catch(error){
    return ("Something went wrong");
  }
  finally{
    if (deleted){
      revalidatePath('/');
      redirect('/');
    }
  }

  }
  export async function updateLastFMAlbum(
    formData: FormData
  ) {
  let updated = false;
  try{
      const artist = formData.get("artist") as string;
      const albumName = formData.get("album") as string; 

      const genre = formData.get('genre') as string ;
      const priceValue = formData.get('price');

      let price: number | null = null;

      if (typeof priceValue === 'string') {
          // Solo si priceValue es una cadena, convertir a número
          price = parseFloat(priceValue);
      }

      
      await sql`UPDATE albums
                SET genre = ${genre}, price = ${price}      
                WHERE LOWER(name) = LOWER(${albumName}) AND LOWER(artist) = LOWER(${artist})`;
      updated = true;
    }
    catch(error){
      return ("Something went wrong");
    }
    finally{
      if (updated){
        revalidatePath('/');
        redirect('/');
    }
  }

  }