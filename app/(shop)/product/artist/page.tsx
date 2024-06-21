"use client"
import { Artist } from '@/app/lib/definitions';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ArtistPage() {
  const searchParams = useSearchParams();
  const name  = searchParams.get("name"); // Obtener el nombre del artista desde los parámetros de la URL
  const [artist, setArtist] = useState<Artist | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchArtistDetails = async () => {
      setLoading(true); // Activar el estado de carga al iniciar la solicitud
      try {
        const response = await fetch(`/api/artists?name=${name as string}`);
        if (response.ok) {
          const artistData = await response.json();
          setArtist(artistData);
          const artistSummary = artistData.summary.replace(/<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1[^>]*>.*?<\/a>/gi, '');
          setSummary(artistSummary);
        } else {
          throw new Error('Failed to fetch artist details');
        }
      } catch (error) {
        console.error('Error fetching artist details:', error);
      }finally {
        setLoading(false); // Desactivar el estado de carga al finalizar la solicitud
      }
    };

    if (name) {
      fetchArtistDetails();
    }
  }, [name]);

  return (
    <div className="flex flex-col min-h-screen min-w-screen bg-gray-600 text-white p-8">
      <div className="mt-custom"></div>
      {loading ? (
        <p className="text-center text-xl">Cargando...</p>
      ) : (
        <div className="flex flex-col items-center">
          {artist ? (
            <div className="sm:text-left md:text-center">
              <h1 className="text-4xl font-bold">{artist.name}</h1>
              {summary && (
                <div className="text-lg mt-4 prose">
                  {summary}
                </div>
              )}
              {/* Aquí puedes agregar más detalles del artista si los tienes */}
            </div>
          ) : (
            <p className="text-lg">No se encontró información del artista</p>
          )}
        </div>
      )}
    </div>
  );
};