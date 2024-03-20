"use client"

import { Provider as ReduxProvider } from 'react-redux';
import {persistor, store} from '../REDUX/store';
import { PersistGate } from 'redux-persist/integration/react'


export const Provider = ({children} : { children : React.ReactNode}) => {
    return (
        <ReduxProvider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </ReduxProvider>
    );
};