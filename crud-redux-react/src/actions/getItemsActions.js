import axios from "axios";

export const fetchItems = () => {
  return (dispatch) => {
    dispatch(fetchItemsRequest());
    axios
      .get("https://localhost:7141/api/ChildDetails/Get-Child-Info")
      .then((response) => {
        const items = response.data;
        dispatch(fetchItemsSuccess(items));
      })
      .catch((error) => {
        //console.log(error,"ERROR")
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
