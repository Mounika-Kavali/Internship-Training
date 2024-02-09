import axios from "axios";

export const fetchItems = () => {
  return (dispatch) => {
    dispatch(fetchItemsRequest());
    axios
      .get("http://localhost:8000/document_data_model")
      .then((response) => {
        const items = response.data;
        dispatch(fetchItemsSuccess(items));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(fetchItemsFailure(errorMessage));
      });
  };
};

export const fetchItemsRequest = () => {
  return {
    type: "FETCH_ITEMS_REQUEST",
  };
};

export const fetchItemsSuccess = (items) => {
  return {
    type: "FETCH_ITEMS_SUCCESS",
    payload: items,
  };
};

export const fetchItemsFailure = (error) => {
  return {
    type: "FETCH_ITEMS_FAILURE",
    payload: error,
  };
};

// Action Creator
export const editFormData = (name, value) => {
  return {
    type: "EDIT_FORM_DATA",
    payload: {
        name,
        value,
      },
  };
};
export const updateData = (items) => {
 
    return {
      type: "UPDATE_DATA",
      payload: items,
    };
  };
