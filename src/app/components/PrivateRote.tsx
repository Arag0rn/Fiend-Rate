// Hаташа дивись тут 
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../REDUX/Hooks/useAuth';


export const PrivatRote = WrappedComponent => {
  const Private = props => {
    const router = useRouter();
    const { isLoggedIn, isRefreshing } = useAuth();
    const shouldRedirect = !isLoggedIn && !isRefreshing;
    

    console.log(isLoggedIn);
    console.log(isRefreshing);
  
    
    useEffect(() => {
      if (shouldRedirect) {
        router.push('/')
      }
    }, [])


    return isLoggedIn ? <WrappedComponent {...props} /> : null;
  };

  return Private;
};