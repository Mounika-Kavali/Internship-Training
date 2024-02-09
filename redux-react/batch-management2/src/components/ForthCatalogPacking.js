import React, { Component } from 'react'
import { connect } from 'react-redux';
import {FaThumbsDown,FaThumbsUp} from "react-icons/fa";
import BarCodeReader from './BarCodeReader'
import {getContainers,scanBarcode,saveBarcode} from '../actions/catalog'

export class ForthCatalogPacking extends Component {
     componentDidMount(){
         this.props.getContainers();
    }
    // componentWillReceiveProps(nextProps){
    //     console.log(this.props.scannedBarcode,"componentWillReceiveProps")
    //     if(this.props.scannedBarcode){
    //         console.log(this.props.scannedBarcode,this.props.recordID,"uu")
    //         this.props.saveBarcode(this.props.scannedBarcode,this.props.recordID);
    //     }
    // }

  render() {
    return (
      <>
        <div className="collect-containers-title">
            <h1>
                <span>Collect Containers </span>   
            </h1>
        </div>
        <div className="barcode-reader-component">
            <BarCodeReader
             onScan={ this.props.scanBarcode }/>
        </div>

        <table className="collect-containers-table" >
            <thead>
                <tr>
                    <th>Part Number</th>
                    <th>Lot Number</th>
                    <th>Shippable Type</th>
                    <th>Shipping Conditions</th>
                    <th>Status</th>
                    {/* <th>Actions</th> */}
                </tr>
            </thead>
            <tbody>
            {this.props.containers ? (
                  this.props.containers.map((container) => {
                    // Get the shipping_condition based on the order_item_id
                    const orderItemId = container.statistics.samples[0].order_item_id;
                    const shippingCondition = container.statistics.shippable_contract[orderItemId]?.shippable_catalog?.shipping_condition || 'N/A';

                    return (
                      <tr key={container.id}>
                        <td>{container.statistics.part_number}</td>
                        <td>{container.location}</td>
                        <td>{container.statistics.attempt_type}</td>
                        <td>{shippingCondition}</td>
                        <td>
                          {container.status === "pending" ? (
                            <div>
                              {container.status} <FaThumbsDown id="thumbsDownIcon" />
                            </div>
                          ) : (
                            <div>
                              {container.status} <FaThumbsUp id="thumbsUpIcon" />
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                    
                  <tr>
                    
                    <td colSpan="5">No plates found!</td>
                  </tr>
                )}
            </tbody>

        </table>
      
      </>
    )
  }
}
const mapStateToProps = (state) => ({
    containers: state.items.containers,
    scannedBarcode:state.items.scannedBarcode,
    recordID:state.items.recordID,
  });
  
  const mapDispatchToProps = (dispatch) => {
    return {
      getContainers: () => dispatch(getContainers()),
      scanBarcode: (inp) => dispatch(scanBarcode(inp)),
      saveBarcode:(nxt)=>dispatch(saveBarcode(nxt)),
     
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(ForthCatalogPacking);
