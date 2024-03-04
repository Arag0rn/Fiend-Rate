
import React, { createContext, useContext, useReducer } from 'react';


const AppContext = createContext();


const initialState = {
  formData: {},
};

const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FORM_DATA':
      return { ...state, formData: action.payload };
    default:
      return state;
  }
};


const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const setFormData = (formData) => {
    dispatch({ type: 'SET_FORM_DATA', payload: formData });
  };

  return (
    <AppContext.Provider value={{ state, setFormData }}>
      {children}
    </AppContext.Provider>
  );
};


const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export { AppProvider, useAppContext };