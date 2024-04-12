// Hаташа дивись тут 
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../REDUX/Hooks/useAuth';
import { useAppSelector } from '../REDUX/Hooks/hooks';
import { selectIsLoading } from '../REDUX/Auth/selector';


export const PrivateRoute = WrappedComponent => {
  const Private = props => {
    const router = useRouter();
    const { isLoggedIn, isRefreshing } = useAuth();
    const isLoading = useAppSelector(selectIsLoading);
    const shouldRedirect = !isLoggedIn && !isRefreshing;
    

    console.log("isLoggedIn", isLoggedIn);
    console.log("isRefreshing", isRefreshing);
    console.log("isLoading", isLoading);
    console.log("shouldRedirect", shouldRedirect);
  
    
    useEffect(() => {
      if (shouldRedirect && !isLoading ) {
        console.log("Hello")
        router.push('/')
      }
    }, [isLoading, router, shouldRedirect])

   

    if (!isLoggedIn || isLoading)  {
      // router.push('/'); //якщо додати це то роут спрацьовує, але є помилка
    return null;
    }

    return  <WrappedComponent {...props} /> ;
  };

  return Private;
};

