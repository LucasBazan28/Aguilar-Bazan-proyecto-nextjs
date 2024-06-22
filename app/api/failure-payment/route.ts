import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
    console.log('Success webhook received:', request.nextUrl.searchParams);
    revalidatePath(`/`);
    redirect(`/`);
}
