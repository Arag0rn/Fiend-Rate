"use client"

import { useRouter } from 'next/navigation';
import { useAuth } from '../REDUX/Hooks/useAuth';


export const ProtectedRoute = ({children}) => {

    const router = useRouter();
    const { isLoggedIn, isRefreshing } = useAuth();
    const shouldRedirect = !isLoggedIn && !isRefreshing;


      if (shouldRedirect ) {
        console.log("GoodBye")
        router.push('/')
      } else {
        console.log("Hello Friend")
      }

  return children;
}


