import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(rootReducer, applyMiddleware(thunk));
// Middleware allows you to intercept dispatched actions and perform additional logic before they reach the reducers.
export default store;

