import axios from "axios";

export const getData = (startIndex, itemsPerPage) => {
  return (dispatch) => {
    dispatch(GetDataRequest());
    console.log(startIndex, itemsPerPage, "startIndex, itemsPerPage-action.js");
    fetch(
      `https://localhost:7141/api/Payment/GET-RawTableData-pagination?start=${startIndex}&itemsPerPage=${itemsPerPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data, "paginated data");
        const totalDataLength = data.totalCount; // Get the total data length from the response
        dispatch(GetDataSuccess(data.data, totalDataLength)); // Pass the data and totalDataLength to the success action
      })
      .catch((error) => {
        dispatch(GetDataFailure(error.message));
      });
  };
};
// export const getData = (startIndex, itemsPerPage, searchVector) => {
//   return (dispatch) => {
//     dispatch(GetDataRequest());
//     // API call to retrieve data based on startIndex and itemsPerPage
//     let apiUrl = `https://localhost:7141/api/Payment/GET-RawTableData-pagination?start=${startIndex}&itemsPerPage=${itemsPerPage}`;
//     if (searchVector && searchVector.trim() !== "") {
//       apiUrl += `&searchString=${encodeURIComponent(searchVector)}`;
//     }

//       fetch(apiUrl)
//       .then((response) => response.json())
//             .then((data) => {
//               console.log(data.data,"paginated data")
//               const totalDataLength = data.totalCount; // Get the total data length from the response
//               dispatch(GetDataSuccess(data.data, totalDataLength)); // Pass the data and totalDataLength to the success action
//             })
//             .catch((error) => {
//               dispatch(GetDataFailure(error.message));
//             });
//   };
// };

export const getSearchedData = (searchVector, start, itemsPerPage) => {
  return (dispatch) => {
    dispatch(GetSearchDataRequest());
    console.log(
      searchVector,
      start,
      itemsPerPage,
      "searchVector, start, itemsPerPage"
    );
    // Make the API call with the updated parameters

    fetch(
      `https://localhost:7141/api/Payment/GET-RawTableSearchedData?searchString=${searchVector}&startIndex=${start}&itemsPerPage=${itemsPerPage}`
    )
      .then((response) => response.json())
      .then((data) => {
        const searchedData = data.searchData;
        const totalSearchLength = data.totalSearchCount;
        console.log(
          searchedData,
          totalSearchLength,
          "searchData+length Action.js"
        );
        dispatch(GetSearchDataSuccess(searchedData, totalSearchLength));
      })
      .catch((error) => {
        dispatch(GetSearchDataFailure(error.message));
      });
  };
};

export const GetDataRequest = () => {
  return {
    type: "FETCH_ITEMS_REQUEST",
  };
};

export const GetDataSuccess = (data, totalDataLength) => {
  return {
    type: "FETCH_ITEMS_SUCCESS",
    payload: {
      data,
      totalDataLength,
    },
  };
};

export const GetDataFailure = (error) => {
  return {
    type: "FETCH_ITEMS_FAILURE",
    payload: error,
  };
};
export const GetSearchDataRequest = () => {
  return {
    type: "FETCH_SEARCH_ITEMS_REQUEST",
  };
};

export const GetSearchDataSuccess = (searchData, totalSearchLength) => {
  return {
    type: "FETCH_SEARCH_ITEMS_SUCCESS",
    payload: {
      searchData,
      totalSearchLength,
    },
  };
};

export const GetSearchDataFailure = (error) => {
  return {
    type: "FETCH_SEARCH_ITEMS_FAILURE",
    payload: error,
  };
};
