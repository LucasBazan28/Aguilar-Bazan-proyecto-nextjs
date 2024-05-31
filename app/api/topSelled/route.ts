import "server-only"
import { NextRequest, NextResponse } from 'next/server';
import { fetchTopSelled } from "@/app/lib/data";

// Manejar la solicitud GET para obtener los 5 álbumes más escuchados
export async function GET() {
  try {
    // Consulta SQL para obtener los 5 álbumes más escuchados
    const data = await fetchTopSelled();
    // Devolver los resultados como respuesta de la API
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error al obtener los 5 álbumes más escuchados:', error);
    return NextResponse.json({ error: 'Error interno del servidor' }, {status: 500});
  }
}