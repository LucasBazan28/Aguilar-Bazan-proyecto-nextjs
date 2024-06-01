'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function logOut(){
  await signOut();
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

      const artist = formData.get('artist') as string ;
      const album = formData.get('albumName') as string;

      const apiKey = '7bdea081f9cfb2778ce14d92ef7cc2ed';
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
          VALUES (${data.album.name}, ${data.album.artist},
                  ${data.album.image[0]["#text"]}, ${data.album.image[1]["#text"]},
                  ${data.album.image[2]["#text"]}, ${data.album.image[3]["#text"]},
                  ${data.album.image[4]["#text"]}, ${data.album.url}, ${parseInt(data.album.listeners, 10)},
                  ${data.album.genre}, ${data.album.wiki ? data.album.wiki.summary : null}, ${data.album.price},
                  ${data.album.cantidadComprada}
          )
        `;
        revalidatePath('/');
        redirect('/');
      }


  }