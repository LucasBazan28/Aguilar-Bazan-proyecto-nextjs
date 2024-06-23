import "server-only"
import { type NextRequest, NextResponse } from 'next/server';
import { fetchAlbumByName } from '../../lib/data';
export const revalidate = 0       //cada vez que la ruta es llamada es relavidada, por lo que la información de la api se mantiene actualizada

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const name = searchParams.get('name');

  if (!name) {
    return NextResponse.json(
      { error: 'Missing name parameter' },
      { status: 400 }
    );
  }

  try {
    const album = await fetchAlbumByName(name);
    if (!album) {
      return NextResponse.json(
        { error: 'Album not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(album);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}