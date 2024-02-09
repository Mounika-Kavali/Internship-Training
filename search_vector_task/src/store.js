import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from "redux";
import vectorListReducer from "./reducers/vectorListReducer";
import vectorListReducer2 from './reducers/vectorListReducer2';

const rootReducer = combineReducers({
  items: vectorListReducer,
  vec:vectorListReducer2,
});

const store = configureStore({
  reducer: rootReducer,
  // Other store configurations if needed
});

export default store;
