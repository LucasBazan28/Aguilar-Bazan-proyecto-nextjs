// pages/index.js
"use client";
import { createLastFMAlbum, logOut } from '@/app/lib/actions';
import { ArrowRightIcon } from '@heroicons/react/20/solid';
import { Button } from '@/app/ui/button';
import { useFormState, useFormStatus } from 'react-dom';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';

export default function AdminPage() {
  const [errorMessage, dispatch] = useFormState(createLastFMAlbum, undefined);
  const { pending } = useFormStatus();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="md:w-1/3 p-8 bg-white rounded-lg shadow-md mx-14">
        <h1 className="text-2xl font-bold text-black mb-6">Buscar Información del Álbum en Last.fm</h1>
        <form action={dispatch} className="space-y-4">
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="artist"
            >
              Artist
            </label>
            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              id="artist"
              type="artist"
              name="artist"
              placeholder="Enter the artist"
              required
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="albumName"
            >
              Album name
            </label>
            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              id="albumName"
              type="albumName"
              name="albumName"
              placeholder="Enter the album name"
              required
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="genre"
            >
              Genre
            </label>
            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              id="genre"
              type="genre"
              name="genre"
              placeholder="Enter genre"
              required
            />
          </div>

          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="price"
            >
              Price
            </label>
            <input
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              id="price"
              type="number"
              name="price"
              inputMode="decimal"
              placeholder="Enter price"
              required
              step="any"
            />
          </div>

          <Button
            className="mt-4 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition-colors duration-300"
            aria-disabled={pending}
          >
            Search <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
          </Button>

          <div
            className="flex items-center space-x-1"
            aria-live="polite"
            aria-atomic="true"
          >
            {errorMessage && errorMessage !== "El álbum ya se encuentra disponible" && (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{errorMessage + ". Por favor ingrese el album en forma manual"}</p>
              </>
            )}
            {errorMessage === "El álbum ya se encuentra disponible" && (
              <>
                <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                <p className="text-sm text-red-500">{errorMessage + "."}</p>
              </>
            )}
          </div>
        </form>
      </div>
      <form action={logOut}>
                  <button className="mt-4 mr-8 ml-4 flex h-[60px] w-full items-center justify-center gap-2 rounded-md bg-black p-4 text-lg font-medium text-white hover:bg-gray-200 hover:text-black md:w-auto md:justify-start">
                    <div className="block">Sign Out</div>
                  </button>
        </form>
    </div>
  );
}