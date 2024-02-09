import axios from "axios";
import jsonData from '../Data/shipments-catagory.json'
import { HTTP_GET, HTTP_POST, HTTP_PATCH } from './http-consts';
import {GET_CONTAINERS_REQUEST,GET_CONTAINERS_SUCCESS,GET_CONTAINERS_FAILURE,
  SCAN_BARCODE_SUCCESS,SAVE_BARCODE_SUCCESS} from './action-types'

export const getContainers = () => {
    return (dispatch) => {
      dispatch(getContainersRequest());
      axios
        .get("http://localhost:8001/catalog")
        .then((response) => {
          const items = response.data;
          dispatch(getContainersSuccess(items));
        })
        .catch((error) => {
          const errorMessage = error.message;
          dispatch(getContainersFailure(errorMessage));
        });
    };
};
export const scanBarcode = (inp) => {
  return (dispatch,getState) => {
    const partNumber = inp.split("_")[0];
    const lotNumber = inp.split("_")[1];
    //const containers = getState().containers;
    const containers=jsonData.catalog.containers;
    const PN_Container = containers.find((item) => item.statistics.part_number === partNumber);
    const record_id=PN_Container.id;
    // console.log(PN_Container,"con")
    // console.log(record_id,"record_id")
    dispatch(scanBarcodeSuccess(inp,partNumber,lotNumber,record_id));
    //dispatch(saveBarcode(inp,record_id))
    
  };
};
export const saveBarcode = (fullBarcode,ID) => {
  return (dispatch) => {
    
    const lotNumber = fullBarcode.split("_")[1];
    const containers=jsonData.catalog.containers;
    //const ID_container=containers.find((item) => item.id ===ID ).id;
    const partNumber=fullBarcode.split("_")[0];//same for barcode
    const record_id = containers.find((item) => item.statistics.part_number === partNumber).id;
    //dispatch(saveBarcodeSuccess(lotNumber,partNumber,containers));
    dispatch(scanBarcodeSuccess(fullBarcode,partNumber,lotNumber,record_id))
  };
};


  //GET
export const getContainersRequest = () => {
    return {
      type: GET_CONTAINERS_REQUEST,
    };
};
export const getContainersSuccess = (catagory) => {
   return {
   type: GET_CONTAINERS_SUCCESS,
   payload: catagory,
 };
};
export const getContainersFailure = (error) => {
    return {
      type: GET_CONTAINERS_FAILURE,
      payload: error,
    };
};

//SCAN Barcode
export const scanBarcodeSuccess=(inp,partNumber,lotNumber,record_id)=>{
  return{
    type: SCAN_BARCODE_SUCCESS,
    payload: {
      inputValue:inp,
      barcode:partNumber,
      lot:lotNumber,
      recordID:record_id,     
    }
  }
}
//SAVE Barcode
export const saveBarcodeSuccess=(lotNumber,partNumber,containers)=>{
  return{
    type: SAVE_BARCODE_SUCCESS,
    payload: {
      lotNum:lotNumber,
      partNum:partNumber,
      containers:containers
    }
  }
}
