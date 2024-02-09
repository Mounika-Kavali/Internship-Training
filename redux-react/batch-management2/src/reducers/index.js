import { combineReducers } from "redux";
import containerReducer from "./container";

const rootReducer = combineReducers({
  items: containerReducer,
});

export default rootReducer;
