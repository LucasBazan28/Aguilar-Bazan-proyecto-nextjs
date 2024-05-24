/*import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        //return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;   */
//EL CODIGO DE ARRIBA ES EL DEL TUTORIAL, SE PUEDE USAR MÁS ADELANTE PERO POR AHORA PARA TESTEAR USUARIOS USAMOS ESTE

import type { NextAuthConfig } from 'next-auth';
import {redirect} from "next/navigation";

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnLogin = nextUrl.pathname.startsWith('/login');
      if (isOnLogin) {
        if (isLoggedIn) {
          return Response.redirect("http://localhost:3000");
        }
        return true; // Allow access to the login page
      } else if (!isLoggedIn) {
        return false;
      }
    
      return true;
  
    },
    async redirect({ url, baseUrl }) {
      const params = new URL(url).searchParams
      const callbackUrl = params.get('callbackUrl')
      if(callbackUrl){
        url = callbackUrl
      }

      // base behaviour:
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    }
  },
  providers: [], // Agrega los proveedores aquí
} satisfies NextAuthConfig;

/*

const isLoggedIn = !!auth?.user;
      const isOnLogin = nextUrl.pathname.startsWith('/login');
      console.log(isOnLogin);
      console.log(isLoggedIn);
      if (isOnLogin) {
        if (isLoggedIn) {
          return Response.redirect("http://localhost:3000");
        }
        return true; // Allow access to the login page
      } else if (!isLoggedIn) {
        return false;
      }
    
      return true; */