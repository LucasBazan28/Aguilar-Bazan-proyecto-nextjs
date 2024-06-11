import type { NextRequest } from 'next/server';
import { MercadoPagoConfig, Payment } from 'mercadopago';
import { sql } from '@vercel/postgres';

const client = new MercadoPagoConfig({ accessToken: "TEST-5234027709903520-061010-315c94f4b8143d62476e38f884bf751b-139194673" });

export async function POST(request: NextRequest) {
    console.log("ESTOY EN PAYMENT (INSERT EN BD)")
  const body = await request.json().then(
    (data) => data as {
         data: { id: string },
         items: { id: string, name: string, price: number, quantity: number }[] 
        });
  const payment = await new Payment(client).get({ id: body.data.id });

  const sale = {
    transaction_mp_id: payment.id,
    person_email: payment.payer?.email,
  };

  try {
    // Iniciar la transacción
    await sql`BEGIN`;

    // Insertar en la tabla sales
    const items = body.items;
    console.log(items);
    for (const item of items) {
    await sql`
        INSERT INTO sales (price, quantity, subtotal, date, transaction_mp_id, person_email)
        VALUES (${item.price}, ${item.quantity}, ${item.price * item.quantity},CURRENT_DATE,${sale.transaction_mp_id}, ${sale.person_email})
        RETURNING s_id;

    `;}

    // Insertar detalles de los productos en la tabla salesDetails
    // const items = body.items;
    // console.log(items);
    // for (const item of items) {
    //     await sql`
    //       INSERT INTO salesDetails (price, quantity, subtotal, sale_id, product_id)
    //       VALUES (${item.price}, ${item.quantity}, ${item.price * item.quantity}, ${saleResult.rows[0].s_id}, ${item.id});
    //     `;
    // }
    

    // Confirmar la transacción
    await sql`COMMIT`;
    return new Response('OK', { status: 200 });
  } catch (error) {
    // Revertir la transacción en caso de error
    await sql`ROLLBACK`;
    console.error('Error inserting into database:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}