import axios from 'axios';

// Action Types
export const EDIT_FORM_DATA = 'EDIT_FORM_DATA';

// Action Creators
export const updateItem = (id, formData) => {
  return (dispatch) => {
    axios
      .put(`https://localhost:7141/api/ChildDetails/update-child-info-byId/${id}`, formData)
      .then((response) => {
        dispatch({
          type: EDIT_FORM_DATA,
          payload: response.data,
        });
      })
      .catch((error) => {
        // Handle error
        console.log(error);
      });
  };
};
