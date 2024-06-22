"use client";
import { deleteLastFMAlbum } from "../lib/actions"
import { Album } from "../lib/definitions"
import Link from 'next/link';

type ManageProductInCartProps = {
    album: Album;
  };

function confirmDelete({album}: ManageProductInCartProps) {
    const isConfirmed = window.confirm(
        `Are you sure that you want to delete ${album.name} - ${album.artist}?`);
    if (isConfirmed) {
        deleteLastFMAlbum(album);
    }
}

export default function AdminManageProductsButtons({album}: ManageProductInCartProps){
    return (
        <>
        <Link 
            href={{
            pathname: 'admin/edit',
            query: {
                name: album.name,
                artist: album.artist,
                genre: album.genre,
                price: album.price 
                }
            }}
            >
            <button
                className="bg-gray-500 text-white px-3 py-1 rounded"
            >
                Edit
            </button>
        </Link>

        <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={() => confirmDelete({album})}
        >
            Delete
        </button>
        </>
    )
}