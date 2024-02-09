const initialState = {
  loading: false,
  data: [],
  error: "",
  items: [],
  formData: {}, // Add formData property
  
};

const reducer = (state = initialState, action) => {
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
        items: action.payload, // Update the 'items' property with the fetched data
      };
    case "FETCH_ITEMS_FAILURE":
      return {
        loading: false,
        data: [],
        error: action.payload,
      };
    case "EDIT_FORM_DATA":
      return {
        ...state,
        formData: {
          ...state.formData,
          [action.payload.name]: action.payload.value,
        },
      };
    case "UPDATE_DATA":
      return {
        ...state,
        data: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
