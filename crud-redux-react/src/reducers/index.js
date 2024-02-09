import { combineReducers } from "redux";
import getItemsReducer from "./getItemsReducer";
import postItemsReducer from './postItemsReducers'
import deleteItemReducer from "./deleteItemReducer";
import editItemReducer from './editItemReducer'
import reducer from "./TaskReducer";
import studentsReducer from "./CRUDwithJSON-Reducers";

const rootReducer = combineReducers({
  items: getItemsReducer,
  item:postItemsReducer,
  itemId: deleteItemReducer,
  itemz:editItemReducer,
  editItem:reducer,
  studentsReducer
});

export default rootReducer;
