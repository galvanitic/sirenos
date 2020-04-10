import React, {createContext, useReducer} from 'react';
import initialState from './state';

const store = createContext(initialState);
const { Provider } = store;

const StateProvider = ({ children }) => {
  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'CH_LANG':
        return { ...state, lang: action.payload };
      default:
        throw new Error();
    };
  }, initialState);
  return <Provider value={{ state, dispatch }}>{children}</Provider>;
}

export {store, StateProvider}