
import LoginForm from '@/app/ui/login-form';
import Logo from '@/app/ui/logo';
import { auth } from '@/auth';
import {redirect} from "next/navigation";


export default async function LoginPage() {
  const isLoggedIn = await auth() != null;
  if (isLoggedIn)
    redirect("/")
  return (
    <>
    <main className="flex items-center justify-center min-h-screen mt-8">
      <div className="relative border border-white rounded-lg bg-white mx-auto flex lg:w-1/5 md:w-2/3 sm:w-1/2 flex-col sm:-mt-20">
        <div className="relative flex h-20 w-full">
            <Logo />
        </div>
        <LoginForm />
      </div>
    </main>
    </>
  );
} 