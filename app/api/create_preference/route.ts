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
          success: "http://facebook.com", //MODIFICAR, SOLO FUNCIONAN CON LINKS VERDADEROS
          failure: "http://localhost:3000/failure",
          pending: "http://localhost:3000/pending"
        },
        auto_return: "approved",
      }
    });
    console.log(items);
    for (const item of items) {
    await sql`
        INSERT INTO sales (price, quantity, subtotal, transactionDate, id)
        VALUES (${item.price},
                ${item.quantity},
                ${item.price * item.quantity},  
                CURRENT_DATE,
                ${response.id}
                )

    `;}
    return NextResponse.json({ preferenceId: response.id, items });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}