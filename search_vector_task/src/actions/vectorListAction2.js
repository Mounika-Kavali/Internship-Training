import axios from "axios";

export const getData = () => {
  return (dispatch) => {
    dispatch(getDataRequest());

    axios
      .get("https://localhost:7141/api/Payment/GET-RawTableData")
      .then((response) => {
        dispatch(getDataSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getDataFailure(error.message));
      });
  };
};

export const getSearchedData = (searchString) => {
  return (dispatch) => {
    dispatch(getSearchedDataRequest());

    axios
      .get(
        `https://localhost:7141/api/Payment/GET-RawTableSearchedData?searchString=${searchString}`
      )
      .then((response) => {
        dispatch(getSearchedDataSuccess(response.data));
      })
      .catch((error) => {
        dispatch(getSearchedDataFailure(error.message));
      });
  };
};

export const getDataRequest = () => {
  return {
    type: "FETCH_ITEMS_REQUEST",
  };
};

export const getDataSuccess = (data) => {
  return {
    type: "FETCH_ITEMS_SUCCESS",
    payload: data,
  };
};

export const getDataFailure = (error) => {
  return {
    type: "FETCH_ITEMS_FAILURE",
    payload: error,
  };
};

export const getSearchedDataRequest = () => {
  return {
    type: "FETCH_SEARCH_ITEMS_REQUEST",
  };
};

export const getSearchedDataSuccess = (searchData) => {
  return {
    type: "FETCH_SEARCH_ITEMS_SUCCESS",
    payload: searchData,
  };
};

export const getSearchedDataFailure = (error) => {
  return {
    type: "FETCH_SEARCH_ITEMS_FAILURE",
    payload: error,
  };
};
