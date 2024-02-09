// Initial state
const initialState = {
    formData: {},
  };
  
  // Reducer function
  const formReducer = (state = initialState, action) => {
    switch (action.type) {
      case "SET_FORM_DATA":
        console.log(action.payload,"formData in reducer ")
        return {
          ...state,
          formData: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default formReducer;
  