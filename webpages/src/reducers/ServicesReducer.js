// Define initial state
const initialState = {
  eventName: "",
  birthdayEvent: false,
  weddingEvent: false,
  engagementEvent:false,
  productCatalogueEvent:false,
};

// Define the reducer function
const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_BIRTHDAY_EVENT":
      // console.log(action.payload,"BirthdayEvent in reducer")
      return {
        ...state,
        eventName: action.payload.eventName,
        birthdayEvent: action.payload.isBirthdayEvent,
      };
    case "SET_WEDDING_EVENT":
      return {
        ...state,
        eventName: action.payload.eventName,
        weddingEvent: action.payload.isWeddingEvent,
      };
      case "SET_ENGAGEMENT_EVENT":
      return {
        ...state,
        eventName: action.payload.eventName,
        engagementEvent: action.payload.isEngagementEvent,
      };
      case "SET_PRODUCT_CATALOGUE_EVENT":
      return {
        ...state,
        eventName: action.payload.eventName,
        productCatalogueEvent: action.payload.isProductCatalogueEvent,
      };
    default:
      return state;
  }
};

export default eventReducer;
