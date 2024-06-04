"use client";
import { deleteLastFMAlbum } from "../lib/actions"
import { Album } from "../lib/definitions"

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
/*function EditProduct({album}: ManageProductInCartProps) {
    // Implementar la edición de un producto
    console.log("Editando producto", album);
}*/
export default function AdminManageProductsButtons({album}: ManageProductInCartProps){
    return (
        <>
        <button
            className="bg-gray-500 text-white px-3 py-1 rounded"
            onClick={() => EditProduct({album})}
        >
            Edit    
        </button>
        <button
            className="bg-red-500 text-white px-3 py-1 rounded"
            onClick={() => confirmDelete({album})}
        >
            Delete
        </button>
        </>
    )
}