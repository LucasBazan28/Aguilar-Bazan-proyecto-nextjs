'use server';

import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Album } from './definitions';
import { NextApiRequest, NextApiResponse } from 'next';

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
  let inserted = false;
  try{
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

  /*//Crear preferencia
  import { MercadoPagoConfig, Preference } from 'mercadopago'; // SDK de Mercado Pago
  const client = new MercadoPagoConfig({ accessToken: 'TEST-5234027709903520-061010-315c94f4b8143d62476e38f884bf751b-139194673' });
  
  export async function createPreference(
    formData: FormData
    //Debería ser un array de albumes en vez de uno solo
    ) {
      
      const artist = formData.get("artist") as string;
      const albumName = formData.get("album") as string; 
      const genre = formData.get('genre') as string ;
      const priceValue = formData.get('price');
      
      const preference = new Preference(client);
        //VER TEMA REQ RES
    const result =  preference.create({
        body: {
          items: [
            {
              title: artist + " - " + albumName,
              quantity: 1,
              unit_price: 2000,
              id: ''
            }
          ],
          back_urls: {
            success: "http://localhost:3000/successPrueba", //MODIFICARRRR
            failure: "http://localhost:3000/failure",
            pending: "http://localhost:3000/pending"
          },
        }
      })
    .then(console.log)
    .catch(console.log);
  } */



  //_________________ BUENO  
  /*import type { NextApiRequest, NextApiResponse } from 'next';
  import { MercadoPagoConfig, Preference } from 'mercadopago';
  const client = new MercadoPagoConfig({ accessToken: 'TEST-5234027709903520-061010-315c94f4b8143d62476e38f884bf751b-139194673' });
  
  export default async function createPreference(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        /*const { title, price, quantity } = req.body;

        if (!title || !price || !quantity) {
            return res.status(400).json({ error: "Faltan datos requeridos" });
        }*/

      /* const preference = new Preference(client);
       const result =  preference.create({
        body: {
          items: [
            {
              title: req.body.title,
              quantity: req.body.quantity,
              unit_price: req.body.price,
              id: ''
            }
          ],
          back_urls: {
            success: "http://localhost:3000/successPrueba", //MODIFICARRRR
            failure: "http://localhost:3000/failure",
            pending: "http://localhost:3000/pending"
          },
        }
      })
    
        //const result = await preference.create({body});

        res.status(200).json({ id: result.body.id });
    } catch (error) {
        console.error("Error al crear la preferencia", error);
        res.status(500).json({ error: "Error al crear la preferencia" });
    }
}*/


//NO PUEDE PASAR A SERVER ACTION, DEBE SER DE API

/*import { MercadoPagoConfig, Preference } from 'mercadopago';
import { NextRequest, NextResponse } from 'next/server';

const client = new MercadoPagoConfig({ accessToken: "TEST-5113519851838077-060615-2bbfd7b8a6495ed0b67f8f618bb0f4a3-272885138" });

export async function POST(request: NextRequest) {
  try {
    const { items } = await request.json();
    if (!items || items.length === 0) {
      return NextResponse.json({ message: 'No items provided' }, { status: 400 });
    }

    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        external_reference: '123',
        items: items.map((item: { name: string; quantity: number; price: number }) => ({
          title: item.name,
          quantity: item.quantity,
          unit_price: Number(item.price) ,
        }))
      }
    });

    return NextResponse.json({ preferenceId: response.id, items });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
} */