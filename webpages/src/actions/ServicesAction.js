// Action creator to set the birthday event
export const setBirthdayEvent = (isBirthdayEvent) => ({
  type: "SET_BIRTHDAY_EVENT",
  payload: {
    isBirthdayEvent: isBirthdayEvent,
    eventName: "Birthday",
  },
});

// Action creator to set the wedding event
export const setWeddingEvent = (isWeddingEvent) => ({
  type: "SET_WEDDING_EVENT",
  payload: {
    isWeddingEvent: isWeddingEvent,
    eventName: "Wedding",
  },
});

export const setEngagementEvent = (isEngagementEvent) => ({
  type: "SET_ENGAGEMENT_EVENT",
  payload: {
    isEngagementEvent: isEngagementEvent,
    eventName: "Engagement",
  },
});

export const setProductCatalogue = (isProductCatalogueEvent) => ({
  type: "SET_PRODUCT_CATALOGUE_EVENT",
  payload: {
    isProductCatalogueEvent: isProductCatalogueEvent,
    eventName: "Product Catalogue",
  },
});
