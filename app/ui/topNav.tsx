import './header.css';
import Link from 'next/link';
import Logo from './logo';
import { CartIcon } from './cartIcons';
import { isLoggedIn } from '../lib/actions';

export default async function Header() {
  const userLoggedIn = await isLoggedIn(); // Verificar si el usuario está logueado

  return (
    <header className="header">
      <div className="container mx-auto py-2">
        <Logo />
        <div className="flex space-x-4">
          {userLoggedIn && (<Link href="/admin">
            <button>Admin</button>
          </Link>)}
          {!userLoggedIn && (<Link href="/login">
            <button>Login</button>
          </Link>)}
          <Link href="/cart">
            <button><CartIcon /></button>
          </Link>
        </div>
      </div>
    </header>
  );
};
