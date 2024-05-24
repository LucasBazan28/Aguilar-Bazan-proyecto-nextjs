
import LoginForm from '@/app/ui/login-form';
import Logo from '@/app/ui/logo';
 
export default function LoginPage() {
  return (
    <>
    <main className="flex items-center justify-center min-h-screen">
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