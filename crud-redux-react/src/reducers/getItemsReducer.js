const initialState = {
  loading: false,
  data: [],
  error: "",
};

const getItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ITEMS_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "FETCH_ITEMS_SUCCESS":
      return {
        loading: false,
        data: action.payload,
        error: "",
      };
    case "FETCH_ITEMS_FAILURE":
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default getItemsReducer;
