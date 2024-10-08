import { Sale } from '@/app/lib/definitions';
import { fetchAllSales } from '@/app/lib/data';

export default async function SalesPage() {

    const sales: Sale[] = await fetchAllSales();

    return (
      <div>
        <div className="flex flex-col items-center min-h-screen text-white p-4 mr-4 ml-4">
          <div className="overflow-x-auto w-full mt-8">
            <table className="min-w-full bg-gray-800 border border-gray-700 rounded-lg">
              <thead className="bg-gray-900">
                <tr>
                  <th className="py-2 px-4 border-b border-gray-700 text-left sm:text-sm">ID</th>
                  <th className="py-2 px-4 border-b border-gray-700 text-left sm:text-sm">Price</th>
                  <th className="py-2 px-4 border-b border-gray-700 text-left sm:text-sm">Quantity</th>
                  <th className="py-2 px-4 border-b border-gray-700 text-left sm:text-sm">Subtotal</th>
                  <th className="py-2 px-4 border-b border-gray-700 text-left sm:text-sm">Transaction Date</th>
                </tr>
              </thead>
              <tbody>
                {sales.map((sale) => (
                  <tr key={sale.id} className="hover:bg-gray-700">
                    <td className="py-2 px-4 border-b border-gray-700 text-left sm:text-sm">{sale.id}</td>
                    <td className="py-2 px-4 border-b border-gray-700 text-left sm:text-sm">${sale.price}</td>
                    <td className="py-2 px-4 border-b border-gray-700 text-left sm:text-sm">{sale.quantity}</td>
                    <td className="py-2 px-4 border-b border-gray-700 text-left sm:text-sm">${sale.subtotal}</td>
                    <td className="py-2 px-4 border-b border-gray-700 text-left sm:text-sm">{new Date(sale.transaction_date).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
};