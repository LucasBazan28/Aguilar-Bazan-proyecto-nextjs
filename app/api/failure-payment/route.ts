import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('preference_id');

    try {
        // Obtener los ítems con el preference_id especificado
        const items = await sql`
            SELECT name, quantity
            FROM sales
            WHERE preference_id = ${id}
        `;

        // Iterar sobre los ítems y actualizar la cantidad vendida en la tabla albums
        for (const item of items.rows) {
            await sql`
                UPDATE albums
                SET cantidadcomprada = cantidadcomprada - ${item.quantity}
                WHERE name = ${item.name}
            `;
        }

        // Eliminar los ítems de la tabla sales
        await sql`
            DELETE FROM sales
            WHERE preference_id = ${id}
        `;
        console.log(`All sales with preference_id ${id} have been deleted.`);
    } catch (error) {
        console.error(`Error deleting sales with preference_id ${id}:`, error);
    }
    
    revalidatePath(`/`);
    redirect(`/`);
}
