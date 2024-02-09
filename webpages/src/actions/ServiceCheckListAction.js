export const setCheckedItemList = (selectedCheckboxes,textboxValue) => ({
    type: "NO_OF_CHECKED_ITEMS",
    payload: {
        selectedCheckboxes: selectedCheckboxes,
        textboxValue: textboxValue,
    },
  });

export const CheckedItemDetails=(checkedItems)=>({
    type: "CHECKED_ITEM_DETAILS",
    payload: checkedItems,
  })
  
  