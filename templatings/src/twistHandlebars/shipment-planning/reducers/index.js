import { combineReducers } from "redux";
import systemReducer from './system'

const rootReducer = combineReducers({
    bars:systemReducer,
});

export default rootReducer;