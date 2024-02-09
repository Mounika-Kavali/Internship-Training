import axios from "axios";
import { fetchItems } from "./getItemsActions";
// const api = {
//   deleteItem: (itemId) => {
//     return axios.get(`https://localhost:7141/api/ChildDetails/delete-child-info-byId/${itemId}`);
//   },
// };
// export const deleteItem = (itemId) => {

//     return dispatch => {
//       // Dispatch the delete request action
//       dispatch({ type: 'DELETE_ITEM_REQUEST' });

//       axios.get(`https://localhost:7141/api/ChildDetails/delete-child-info-byId/${itemId}`)
//         .then(() => {
//           // Dispatch the delete success action
//           dispatch({ type: 'DELETE_ITEM_SUCCESS', payload: itemId });
//         })
//         .catch(error => {
//           // Dispatch the delete failure action
//           dispatch({ type: 'DELETE_ITEM_FAILURE', payload: error.message });
//         });
//     };
//   };

// DELETE item action

export const deleteItem = (itemId) => {
  return (dispatch) => {
    //dispatch():used to send actions to the store, which triggers the state update and notifies all connected components of the changes.
    dispatch(deleteItemRequest());
    axios
      .get(
        `https://localhost:7141/api/ChildDetails/delete-child-info-byId/${itemId}`
      )
      .then((response) => {
        dispatch(deleteItemSuccess(itemId));
        
      
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(deleteItemFailure(errorMessage));
      });
      // dispatch(fetchItems()); // Refresh items list
  };
};
//creating action creator function
export const deleteItemRequest = () => {
  return {
    type: "DELETE_ITEM_REQUEST",
  };
};

export const deleteItemSuccess = (itemId) => {
  return {
    type: "DELETE_ITEM_SUCCESS",
    payload: itemId,
    //payload contain any relevant data needed for the reducer to update the state.
  };
};

export const deleteItemFailure = (error) => {
  return {
    type: "DELETE_ITEM_FAILURE",
    payload: error,
  };
};
