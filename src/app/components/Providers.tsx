"use client"

import { AppProvider } from "./context";
import { Provider as ReduxProvider } from 'react-redux';
import {store} from '../REDUX/store';

export const Provider = ({children} : { children : React.ReactNode}) => {
    return (
        <ReduxProvider store={store}>
            <AppProvider>
                {children}
            </AppProvider>
        </ReduxProvider>
    );
};