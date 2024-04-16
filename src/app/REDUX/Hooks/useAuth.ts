import { useSelector } from 'react-redux';
import { State } from '../../REDUX/store';
 
import {
  selectUser,
  selectIsLoggedIn,
  selectIsRefreshing,
} from '../Auth/selector';

export const useAuth = () => {
  const isLoggedIn = useSelector((state: State) => selectIsLoggedIn(state)); 
  const isRefreshing = useSelector((state: State) => selectIsRefreshing(state)); 
  const user = useSelector((state: State) => selectUser(state)); 

  return {
    isLoggedIn,
    isRefreshing,
    user,
  };
};