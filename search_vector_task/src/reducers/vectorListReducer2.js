const initialState = {
    loading: false,
    data: [],
    searchData: [],
    error: "",
  };
  
  const vectorListReducer2 = (state = initialState, action) => {
    switch (action.type) {
      case "FETCH_ITEMS_REQUEST":
        return {
          ...state,
          loading: true,
        };
      case "FETCH_ITEMS_SUCCESS":
        return {
          ...state,
          loading: false,
          data: action.payload,
          error: "",
        };
      case "FETCH_ITEMS_FAILURE":
        return {
          ...state,
          loading: false,
          data: [],
          error: action.payload,
        };
      case "FETCH_SEARCH_ITEMS_REQUEST":
        return {
          ...state,
          loading: true,
        };
      case "FETCH_SEARCH_ITEMS_SUCCESS":
        return {
          ...state,
          loading: false,
          searchData: action.payload,
          error: "",
        };
      case "FETCH_SEARCH_ITEMS_FAILURE":
        return {
          ...state,
          loading: false,
          searchData: [],
          error: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default vectorListReducer2;
  