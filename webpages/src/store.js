import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from "redux";
import eventReducer from './reducers/ServicesReducer'
import formReducer from './reducers/PopupFormReducer'
import checkListReducer from './reducers/ServiceChecklistReducer';

const rootReducer = combineReducers({
  events: eventReducer,
  fields:formReducer,
  checks:checkListReducer,
});

const store = configureStore({
  reducer: rootReducer,
  // Other store configurations if needed
});

export default store;
