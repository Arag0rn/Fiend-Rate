import React, { useEffect } from 'react'
import { refreshUser } from '../REDUX/Auth/operations';
import { Dispatch } from '../REDUX/store';
import { useDispatch } from 'react-redux';

export const RefreshUser = () => {

    const dispatch: Dispatch = useDispatch();

    useEffect(() => {
      dispatch(refreshUser());
    }, [dispatch]);
  return (
    <></>
  )
}
