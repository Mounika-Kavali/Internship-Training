import { GET_CONTAINERS_SUCCESS,SCAN_BARCODE_SUCCESS,SAVE_BARCODE_SUCCESS } from '../actions/action-types'

const initialState = {
    containers: [],
    scannedBarcode:'',//PN_LN
    recordID:'',//54321-678-8742-hui754
   
  };

  const containerReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CONTAINERS_SUCCESS:
          const newContainers = action.payload.containers.map((container) => {
             return {
               ...container
               , status: 'pending'
               , location: 'N/A'
             }
           });
           //console.log(newContainers,"newContainers")
           return {
             ...action.payload,
             containers: newContainers
           };
           case SCAN_BARCODE_SUCCESS:
            
            const Barcode = action.payload.barcode;
            const findContainerIndexFromBarcode = (Barcode) => {
                let returnIndex = -1;
                state.containers.every((container, ind) => {
                    if (container.status !== 'scanned' && container.barcode === Barcode) {
                        returnIndex = ind;
                        return false;
                    } else {
                        return true;
                    }
                })
                return returnIndex;
            };
            const containerIndex=findContainerIndexFromBarcode(Barcode);
            const containers = state.containers;
            if (containerIndex != null && containerIndex > -1) {
                const newContainer = { ...containers[containerIndex], location: action.payload.lot, status: "scanned" };
                const newContainers = containers.slice(0, containerIndex)
                    .concat(newContainer)
                    .concat(containers.slice(containerIndex + 1));
                return {
                     ...state,
                     scannedBarcode: action.payload.inputValue,
                    recordID:action.payload.recordID,
                     containers: newContainers };
            }
              return{
                state
              }
             

          default:
            return state;
        }
    };

export default containerReducer;
  