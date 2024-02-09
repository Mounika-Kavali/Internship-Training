export const setActiveApp = (app = null) => ({
    type: "SET_ACTIVE_APP"
    , payload: {
        name: app
    }
});