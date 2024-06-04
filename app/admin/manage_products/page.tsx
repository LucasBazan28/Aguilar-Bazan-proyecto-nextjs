//Fetch de todos los productos. A cada uno le agrego botón que dispare la opción de eliminar o editar
import { fetchAllAlbums } from "@/app/lib/data";
import AdminManageProductsButtons from "@/app/ui/AdminManageProductsButtons";
import { Album } from "@/app/lib/definitions";

export default async function Page() {
    const albums: Album[] = await fetchAllAlbums();
    return (
        <div>
            <h1>Manage Products</h1>
            <ul>
                {albums.map((album) => (
                    <li key={album.name}>
                        <span>{album.name}</span>
                        <span> - {album.artist}</span>
                        <span> ${album.price} </span>
                        <AdminManageProductsButtons album={album}/>                     
                    </li>
                ))}
            </ul>
        </div>
    );
}