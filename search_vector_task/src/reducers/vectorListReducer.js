const initialState = {
  loading: false,
  data: [],
  searchData: [],
  totalDataLength: 0,
  totalSearchLength:0,
  error: "",
};

const vectorListReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ITEMS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_ITEMS_SUCCESS":
      return {
        loading: false,
        data: action.payload.data,
        totalDataLength: action.payload.totalDataLength,
        error: "",
      };
    case "FETCH_ITEMS_FAILURE":
      return {
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
      //console.log(action.payload.searchData, "search data in reducer.js");
      return {
        loading: false,
        searchData: action.payload.searchData,
        totalSearchLength: action.payload.totalSearchLength,
        error: "",
      };
    case "FETCH_SEARCH_ITEMS_FAILURE":
      return {
        loading: false,
        searchData: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default vectorListReducer;
