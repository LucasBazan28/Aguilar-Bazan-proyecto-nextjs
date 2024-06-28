'use client'
import Link from "next/link"
import { useCart } from '@/app/hooks/useCart';
import { useEffect } from "react";

export default function SucessPage() {
    const { clearCart } = useCart();
    useEffect(() => {
        clearCart();    //cuando se entra a esta pagina se borra el carrito
    }, []);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-white">
            <div className="flex flex-col items-center justify-center space-y-4">
                <h1 className="text-2xl font-bold">Tu compra fue exitosa</h1>
                <Link href="/">
                    <button className="text-lg font-bold hover:text-gray bg-blue-600 rounded-lg py-2 px-4">
                        Volver al inicio
                    </button>
                </Link>
            </div>
        </div>
    )
}
