import axios from "axios";


export const getGraphDetails = () => {
    return (dispatch) => {
      dispatch(getGraphDetailsRequest());
      axios
        .get("http://localhost:8000/bucket_groups")
        .then((response) => {
          const buckets = response.data;
          axios
            .get("http://localhost:8000/transitions")
            .then((res)=>{
                const transitions = res.data;
                dispatch(getGraphDetailsSuccess(buckets,transitions));
            })
            
        })
        .catch((error) => {
          const errorMessage = error.message;
          dispatch(getGraphDetailsFailure(errorMessage));
        });
    };
};

//GET
export const getGraphDetailsRequest = () => {
    return {
      type: 'GET_GRAPH_DETAILS_REQUEST',
    };
};
export const getGraphDetailsSuccess = (bucketGroups,transitions) => {
   return {
   type: 'GET_GRAPH_DETAILS_SUCCESS',
   payload: {
    bucketGroups,
    transitions
   }
 };
};
export const getGraphDetailsFailure = (error) => {
    return {
      type: 'GET_GRAPH_DETAILS_FAILURE',
      payload: error,
    };
};