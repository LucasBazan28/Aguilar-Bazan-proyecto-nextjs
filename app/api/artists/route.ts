import "server-only"
import { type NextRequest, NextResponse } from 'next/server';
import { fetchArtist } from '../../lib/data';

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
    const artist = await fetchArtist(name);
    if (!artist) {
      return NextResponse.json(
        { error: 'Album not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(artist);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}