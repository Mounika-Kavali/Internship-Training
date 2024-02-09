import axios from "axios";
import { fetchItems } from "./getItemsActions";

// Add item action
export const addItem = (newItem) => {
  return (dispatch) => {
    //dispatch():used to send actions to the store, which triggers the state update and notifies all connected components of the changes.
    dispatch(addItemRequest());
    axios
      .post("https://localhost:7141/api/ChildDetails/Add-Child-Info", newItem)
      .then((response) => {
        const item = response.data;
        console.log(item,"response data")
        dispatch(addItemSuccess(item));
        dispatch(fetchItems()); // Refresh items list
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(addItemFailure(errorMessage));
      });
  };
};
//creating action creator function
export const addItemRequest = () => {
  return {
    type: "ADD_ITEM_REQUEST",
  };
};

export const addItemSuccess = (item) => {
  return {
    type: "ADD_ITEM_SUCCESS",
    payload: item,
    //payload contain any relevant data needed for the reducer to update the state.
  };
};

export const addItemFailure = (error) => {
  return {
    type: "ADD_ITEM_FAILURE",
    payload: error,
  };
};
