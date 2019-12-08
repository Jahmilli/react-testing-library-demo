
import React, { createContext, useReducer, useContext } from "react";
import { reducer, initialState } from "./reducers";

const StoreContext = createContext(initialState);

const Store = ({
  children,
  stateProp = initialState
}) => {
  // Set up reducer with useReducer and our defined reducer, initialState from reducers.js
  const [state, dispatch] = useReducer(reducer, stateProp);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStoreContext = () => {
  return useContext(StoreContext);
};

export { Store };