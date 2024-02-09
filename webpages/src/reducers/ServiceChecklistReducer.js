// Initial state
const initialState = {
    selectedCheckboxes: [],
    textboxValue:"",
    checkedItems: [],
  };
  
  // Reducer function
  const checkListReducer = (state = initialState, action) => {
    switch (action.type) {
      case "NO_OF_CHECKED_ITEMS":
        //console.log(action.payload,"formData in reducer ")
        return {
          ...state,
          selectedCheckboxes: action.payload.selectedCheckboxes,
          textboxValue: action.payload.textboxValue,
        };
        
        case "CHECKED_ITEM_DETAILS":
         console.log(action.payload,"checkbox info in reducer ")
        
        return {
          ...state,
          checkedItems: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default checkListReducer;
  