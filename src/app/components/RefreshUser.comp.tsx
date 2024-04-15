// Hаташа дивись тут 
import React, { useEffect, useState } from 'react'
import { refreshUser } from '../REDUX/Auth/operations';
import { Dispatch } from '../REDUX/store';
import { useDispatch } from 'react-redux';
import { ProtectedRoute } from './Protected';


export const RefreshUser = ({children}) => {

    const dispatch: Dispatch = useDispatch();
    const [refreshing, setRefreshing] = useState(true);

    useEffect(() => {
      const fetchData = async () => {
        await dispatch(refreshUser());
        setRefreshing(false);
      };
      fetchData();
    }, [dispatch]);
  
    if (refreshing) {
      return null; 
    }

    return (
      <ProtectedRoute>
        {children}
      </ProtectedRoute>
    );


  }