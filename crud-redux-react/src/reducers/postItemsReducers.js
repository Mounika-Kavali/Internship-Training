const initialState = {
  loading: false,
  data: [],
  error: "",
  item: null // New state property to store the newly added item
};

const postItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    // ...
    case "ADD_ITEM_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "ADD_ITEM_SUCCESS":
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload],
        error: "",
        item: action.payload // the payload data can be accessed in the corresponding reducer function through the" action.payload" property. 
        //The reducer then uses this data to determine how the state should be updated.
      };
    case "ADD_ITEM_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default postItemsReducer;
