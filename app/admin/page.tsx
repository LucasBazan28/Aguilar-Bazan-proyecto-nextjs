//Fetch de todos los productos. A cada uno le agrego botón que dispare la opción de eliminar o editar
import { fetchAllAlbums } from "@/app/lib/data";
import AdminManageProductsButtons from "@/app/ui/AdminManageProductsButtons";
import { Album } from "@/app/lib/definitions";
import { logOut } from "../lib/actions";

export default async function Page() {
    const albums: Album[] = await fetchAllAlbums();
    return (
        <div className="bg-gradient-to-r from-gray-200 to-gray-400 p-8">
            
                <div className="flex flex-row items-center sm:m-3 md:m-6">
                    <table className="w-full bg-white rounded-lg shadow-lg">
                        <thead className="bg-gray-800 text-white">
                            <tr>
                                <th className="py-2 px-3 sm:py-3 sm:px-4 text-sm sm:text-base text-left">Album Name</th>
                                <th className="py-2 px-3 sm:py-3 sm:px-4 text-sm sm:text-base text-left">Artist</th>
                                <th className="py-2 px-3 sm:py-3 sm:px-4 text-sm sm:text-base text-left">Price</th>
                                <th className="py-2 px-3 sm:py-3 sm:px-4 text-sm sm:text-base text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {albums.map((album) => (
                                <tr key={album.name} className="border-b border-gray-200 hover:bg-gray-100 text-black">
                                    <td className="py-2 px-3 sm:py-3 sm:px-4 text-sm sm:text-base text-left">{album.name}</td>
                                    <td className="py-2 px-3 sm:py-3 sm:px-4 text-sm sm:text-base text-left">{album.artist}</td>
                                    <td className="py-2 px-3 sm:py-3 sm:px-4 text-sm sm:text-base text-left">${album.price}</td>
                                    <td className="py-2 px-3 sm:py-3 sm:px-4 text-sm sm:text-base text-left">
                                        <AdminManageProductsButtons album={album} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <form action={logOut}>
                  <button className="mt-4 mr-8 ml-4 flex h-[60px] items-center justify-center gap-2 rounded-md bg-black p-4 text-lg font-medium text-white hover:bg-gray-200 hover:text-black md:w-auto md:justify-start">
                    <div className="block">Sign Out</div>
                  </button>
                </form>
            
        </div>
    );
}