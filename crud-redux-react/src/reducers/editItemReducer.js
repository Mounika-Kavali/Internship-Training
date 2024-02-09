import { EDIT_FORM_DATA } from './../actions/editItemAction';

const initialState = {
  formData: [],
};

const editItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_FORM_DATA:
      return {
        ...state,
        formData: action.payload,
      };
    default:
      return state;
  }
};

export default editItemReducer;
