import React, { createContext, useContext, useReducer } from 'react';

// prepare the StateContainer or DataLayer
export const StateContext = createContext();

// Wrap the application and provide the state container
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

// Pull the informations from the state container
export const useStateValue = () => useContext(StateContext);
