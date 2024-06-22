
import Link from 'next/link';
import Logo from '@/app/ui/logo';

export default function AdminHeader() {
  return (
    <header className="bg-yellow-100 py-4 border-b border-gray-600 w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Logo />
        <div className="flex-1 flex justify-center space-x-2 md:space-x-4 mt-4 md:mt-0">
          <Link href="/admin">
            <button className="bg-yellow-600 text-white px-4 py-2 md:px-6 md:py-3 rounded hover:bg-yellow-700">
              Manage Products
            </button>
          </Link>
          <Link href="/admin/insert_product">
            <button className="bg-yellow-600 text-white px-4 py-2 md:px-6 md:py-3 rounded hover:bg-yellow-700">
              Insert Product
            </button>
          </Link>
        </div>
        <div className="hidden md:flex">
          <Logo />
        </div>
      </div>
    </header>
  );
};

