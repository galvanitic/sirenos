import { combineReducers } from "redux";

// language should only store an index
const language = (state = null, action) => {
  switch (action.type) {
    case 'CH_LANG':
      return action.value
    default:
      return state;
  }
}

const loader = (state = false, action) => {
  switch (action.type) {
    case 'LOADER_ON':
      return true;
    case 'LOADER_OFF':
      return false;
    default:
      return state;
  }
}

const sirens  = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_SIRENS':
      return action.value
    case 'FETCH_SIREN':
      return action.value
    case 'ADD_SIREN':
      return [...state, action.value]
    case 'RM_SIREN':
      const sirens = [...state];
      sirens.splice(action.value, 1);
      return sirens;
    default:
      return state;
  }
}


export default(combineReducers({language, loader, sirens}));