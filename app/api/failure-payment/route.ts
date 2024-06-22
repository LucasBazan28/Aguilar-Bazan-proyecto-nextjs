import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('preference_id');

    try {
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
