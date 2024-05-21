//import React from 'react'

//const UsersPage = async () => {
  //  interface User {
    //    id: number
      //  name: string
    //}
    //const response = await fetch('https://jsonplaceholder.typicode.com/users', {cache: "no-store"})
    //const users: User[] = await response.json()


    //return (
      //  <>
        //<div>Log In</div>
        //{/*Formulario Login*/}
        //</>
    //)
//}

//export default UsersPage
import LoginForm from '@/app/ui/login-form';
 
export default function LoginPage() {
  return (
    <main className="flex items-center justify-center md:h-screen">
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32">
        <div className="flex h-20 w-full items-end rounded-lg bg-blue-500 p-3 md:h-36">
          <div className="w-32 text-white md:w-36">
            <AcmeLogo />
          </div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}