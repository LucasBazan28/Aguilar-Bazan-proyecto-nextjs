// pages/sales.tsx
import { Sale } from '@/app/lib/definitions';
import { fetchAllSales } from '@/app/lib/data';
import { logOut } from '@/app/lib/actions';

export default async function SalesPage() {
 
    const sales: Sale[] = await fetchAllSales();
    

    return (
        <div className="flex flex-col items-center min-h-screen bg-black text-white p-4">
          <div className="overflow-x-auto w-full mt-8">
            <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg">
              <thead className="bg-gray-900">
                <tr>
                  <th className="py-2 px-4 border-b border-gray-700">ID</th>
                  <th className="py-2 px-4 border-b border-gray-700">Price</th>
                  <th className="py-2 px-4 border-b border-gray-700">Quantity</th>
                  <th className="py-2 px-4 border-b border-gray-700">Subtotal</th>
                  <th className="py-2 px-4 border-b border-gray-700">Transaction Date</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-gray-700">
                    <td className="py-2 px-4 border-b border-gray-700">{sale.id}</td>
                    <td className="py-2 px-4 border-b border-gray-700">${sale.price}</td>
                    <td className="py-2 px-4 border-b border-gray-700">{sale.quantity}</td>
                    <td className="py-2 px-4 border-b border-gray-700">${sale.subtotal}</td>
                    <td className="py-2 px-4 border-b border-gray-700">{new Date(sale.transaction_date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <form action={logOut}>
                  <button className="mt-4 mr-8 ml-4 flex h-[60px] w-full items-center justify-center gap-2 rounded-md bg-black p-4 text-lg font-medium text-white hover:bg-gray-200 hover:text-black md:w-auto md:justify-start">
                    <div className="block">Sign Out</div>
                  </button>
            </form>
        </div>
      );
};

