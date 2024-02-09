const initialState = {
    activeApp: null
    , subnavOptions: null
};

const systemReducer =(systemState = initialState, action) => {
    switch (action.type) {
        case "SET_ACTIVE_APP":
            return {
                ...systemState,
                 activeApp: action.payload.name
            };
              default:
                return systemState;
    }
};
 
export default systemReducer;
    