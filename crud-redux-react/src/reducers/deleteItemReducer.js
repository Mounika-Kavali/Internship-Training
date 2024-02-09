const initialState = {
  delItems: [],
  loading: false,
  error: null,
};

const deleteItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case "DELETE_ITEM_REQUEST":
      return {
        ...state,
        loading: true,
        error: null,
      };
    case "DELETE_ITEM_SUCCESS":
      const updatedItems = state.delItems.filter(
        (item) => item.id !== action.payload
      );
      console.log(action.payload, "!==", this.id, "updatedddd in reducer");
      return {
        ...state,
        loading: false,
        delItems: updatedItems,
      };
    case "DELETE_ITEM_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    // Other cases
    default:
      return state;
  }
};

export default deleteItemReducer;
