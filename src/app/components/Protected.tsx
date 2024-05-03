"use client"

import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '../REDUX/Hooks/useAuth';


export const ProtectedRoute = ({children}) => {

    const router = useRouter();
    const { isLoggedIn, isRefreshing } = useAuth();
    const shouldRedirect = !isLoggedIn && !isRefreshing;
    const pathname = usePathname()
    const match = pathname?.match(/\/[a-z]+\/(.+)/);

    if(match?.includes('main') || match?.includes('profile') || match?.includes('profile-edit') || match?.includes('notification') || match?.includes('rate'))
      {
      if (shouldRedirect ) {
        console.log("GoodBye")
        router.push('/')
      } else {
        console.log("Hello Friend")
      }}

  return children;
}

