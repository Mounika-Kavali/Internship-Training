import { combineReducers } from "redux";
import bucketsReducer from './workflow-reducer'

const rootReducer = combineReducers({
    item:bucketsReducer

});

export default rootReducer;