import { sql } from '@vercel/postgres';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { NextRequest, NextResponse } from 'next/server';

const client = new MercadoPagoConfig({ accessToken: "TEST-5234027709903520-061010-315c94f4b8143d62476e38f884bf751b-139194673" });

export async function POST(request: NextRequest) {
    console.log("ESTOY EN CREATE PREFERENCE")
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
        })),
        back_urls: {
          success: "https://aguilar-bazan-proyecto-nextjs.vercel.app",
          failure: "https://aguilar-bazan-proyecto-nextjs.vercel.app/api/failure-payment", 
          pending: "https://aguilar-bazan-proyecto-nextjs.vercel.app"
        },
        auto_return: "approved",
      }
    });
    console.log(items);
    console.log(response.id)
    for (const item of items) {
      await sql`
        INSERT INTO sales (preference_id, name, price, quantity, subtotal, transaction_date)
        VALUES (${response.id}, ${item.name}, ${item.price},
                ${item.quantity},
                ${item.price * item.quantity},  
                CURRENT_DATE
                )`;
      await sql`
          UPDATE albums
                SET cantidadcomprada = cantidadcomprada + ${item.quantity}
                WHERE name = ${item.name}
            `;          
    }
    return NextResponse.json({ preferenceId: response.id });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}