// pages/index.js
"use client";
import { createLastFMAlbum } from '@/app/lib/actions';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import {useFormState, useFormStatus } from 'react-dom';
import {
    ExclamationCircleIcon
  } from '@heroicons/react/24/outline';

export default function AdminPage() {
  const [errorMessage, dispatch] = useFormState(createLastFMAlbum, undefined);
  const { pending } = useFormStatus();

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Buscar Información del Álbum en Last.fm</h1>
      <form action={dispatch}>
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="artist"
            >
              Artist
            </label>
              
            <input
                className="text-black peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="artist"
                type="artist"
                name="artist"
                placeholder="Enter the artist"
                required
              />

            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="albumName"
            >
              Password
            </label>
            <input
                className="text-black peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="albumName"
                type="albumName"
                name="albumName"
                placeholder="Enter albumName"
                required
            />
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="genre"
            >
              Genre
            </label>
            <input
                className="text-black peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="genre"
                type="genre"
                name="genre"
                placeholder="Enter genre"
                required
            />
            <label
              className="mb-3 mt-5 block text-xs font-medium text-gray-900"
              htmlFor="price"
            >
              Price
            </label>
            <input
                className="text-black peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
                id="price"
                type="number" // Cambiar el tipo de "price" a "number"
                name="price"
                inputMode="numeric" // Asegura que en dispositivos móviles se muestre el teclado numérico
                placeholder="Enter price"
                required
            />
        <Button className="mt-4 w-full" aria-disabled={pending}>
            Search <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
        </Button>
        <div
          className="flex h-8 items-end space-x-1"
          aria-live="polite"
          aria-atomic="true"
        >
          {errorMessage && (
            <>
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
              <p className="text-sm text-red-500">{errorMessage+"."}</p>
              <p className="text-sm text-red-500">Por favor ingrese el álbum de forma manual</p>
            </>
          )}
        </div>
      </form>
    </div>
  );
};

