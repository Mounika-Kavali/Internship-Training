const initialState = {
    bucketNodes: [],
    bucketEdges:[],
};


const bucketsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_GRAPH_DETAILS_SUCCESS':
        //   console.log(action.payload.bucketGroups,"buc")
        //   console.log(action.payload.transitions,"trans")
           return {
            bucketNodes:action.payload.bucketGroups,
            bucketEdges:action.payload.transitions,
           };
        default:
            return state;
        }
    };

export default bucketsReducer;