// import { createStore, applyMiddleware } from 'redux';
// import { createLogger } from 'redux-logger'; // Import createLogger from redux-logger
// import rootReducer from './reducers/index';

// // Create the logger middleware instance
// const loggerMiddleware = createLogger();

// const store = createStore(rootReducer, applyMiddleware(loggerMiddleware));
// // Now, the logger middleware will be used instead of thunk.

// export default store;

import { legacy_createStore as createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const store = createStore(rootReducer, applyMiddleware(thunk));
// Middleware allows you to intercept dispatched actions and perform additional logic before they reach the reducers.
export default store;
