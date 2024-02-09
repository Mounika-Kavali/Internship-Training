import React, { Component } from "react";
import { connect } from "react-redux";
import jsonData from "../Data/shipments-catagory.json";
import { PromptModal, ConfirmModal } from "./Modal";
import { cleanBarcodeNotFound } from "../actions/catalog";

const LotNotFoundPrompt = PromptModal;
const InvalidBarcodePrompt = PromptModal;
const BarcodeNotFoundPrompt = PromptModal;
const LotConfirmModal = ConfirmModal;

const WARNING_SIGN_ICON = "⚠️";

export class BarCodeReader extends Component {
  constructor() {
    super();
    this.dispatchManualBarcode = this.dispatchManualBarcode.bind(this);
    this.inputChangeHandler = this.inputChangeHandler.bind(this);

    this.state = {
      // inputValue:'',
      inValidLot_Popup: false,
      notAvailableLot: "",
      inValidBarcode_Popup: false,
      showLotNumberConfirmation_Popup: false,
    };
  }

  componentWillMount() {
    this.setState({ inputValue: "" });
  }

  componentWillUnmount() {
    this.setState({ inputValue: "" });
  }

  inputChangeHandler(event) {
    const inputValue = event.target.value;
    if (inputValue.length > 17) {
      if (/^\d{6}_\d{10}$/.test(inputValue)) {
        this.setState({ inValidBarcode_Popup: false });
      } else {
        this.setState({ inValidBarcode_Popup: true });
      }
    } else {
      this.setState({ inValidBarcode_Popup: false });
    }

    this.setState({ inputValue });
  }
  barcodeNotFoundPrompt = () => {
    console.log("barcodeNotFoundPrompt");
    this.props.cleanBarcodeNotFound();
  };

  composeLotNumberConfirmationMessage() {
    let partNumber = this.state.inputValue.split("_")[0];
    return (
      <div>
        <h5>
          This is not the recommended Lot Number for Part Number&nbsp;
          {partNumber}&nbsp;but you may still proceed.
        </h5>
        <h5>Do you wish to continue?</h5>

        <p>Click 'Continue' to proceed with packing this order.</p>
      </div>
    );
  }
  confirmNonRecommendedBarcodeHandler() {
    let [part, lot] = this.state.inputValue.split("_");
    const lotList = jsonData.catalog.total_lots.part_lot_map[part];
    if (lotList && lotList.includes(lot)) {
      this.setState({ showLotNumberConfirmation_Popup: false });
      this.props.onScan(this.state.inputValue);
    } else {
      this.setState({
        showLotNumberConfirmation_Popup: false,
        inValidLot_Popup: true,
        notAvailableLot: lot,
      });
    }
    this.setState({ inputValue: "" });
  }
  cancelNonRecommendedBarcodeHandler() {
    this.setState({ showLotNumberConfirmation_Popup: false });
  }
  dispatchManualBarcode() {
    let [part, lot] = this.state.inputValue.split("_");
    let containerIndex = jsonData.catalog.containers.findIndex(
      (x) => x.statistics.part_number === part
    );

    if (!/^\d*_\d{10}$/.test(this.state.inputValue)) {
      console.log("inValidLot_Popup");
      this.setState({ inValidLot_Popup: true, notAvailableLot: lot });
    } else if (
      jsonData.catalog.containers[containerIndex].lot_number === null
    ) {
      let matchingIndex =
        jsonData.catalog.total_lots.recommended_lot_list.findIndex(
          (recommendedLot) =>
            recommendedLot.partnumber === part && recommendedLot.lot === lot
        );

      if (matchingIndex === -1) {
        this.setState({ showLotNumberConfirmation_Popup: true });
      } else {
        this.props.onScan(this.state.inputValue);
        this.setState({ inputValue: "" });
      }
    } else if (
      jsonData.catalog.containers[containerIndex].lot_number === "OI"
    ) {
      if (
        jsonData.catalog.total_lots.recommended_lot_list.findIndex(
          (recommendedLot) =>
            recommendedLot.partnumber === part &&
            recommendedLot.lot === "custom"
        ) > -1
      ) {
        this.props.onScan(this.state.inputValue);
        this.setState({ inputValue: "" });
      }
    }
  }

  render() {
    const {
      inValidLot_Popup,
      notAvailableLot,
      inValidBarcode_Popup,
      inputValue,
      showLotNumberConfirmation_Popup,
    } = this.state;
    return (
      <>
        <div className="manual-barcode-reader">
          <span>Enter barcode text then click Apply:</span> <br />
          <input
            type="text"
            onChange={this.inputChangeHandler}
            placeholder="Manual Barcode"
            name="inputValue"
            value={this.state.inputValue}
          />
          <button color="link" onClick={this.dispatchManualBarcode}>
            Apply
          </button>
        </div>
        <LotNotFoundPrompt
          show={inValidLot_Popup}
          title="Lot not available"
          message={`We could not find the Lot: ${notAvailableLot} in the shipping plan`}
          buttonText="Close"
          okHandler={() => {
            this.setState({ inValidLot_Popup: false, inputValue: "" });
          }}
        />

        <InvalidBarcodePrompt
          show={inValidBarcode_Popup}
          title="Invalid Barcode"
          message={`We could not have the barcode: ${inputValue} more than 17 characters`}
          buttonText="Retry"
          okHandler={() => {
            this.setState({ inValidBarcode_Popup: false });
          }}
        />
        <BarcodeNotFoundPrompt
          show={this.props.BarcodeNotFound}
          title="Barcode Not Found"
          message={`We could not find part number in the shipping plan`}
          buttonText="Close"
          okHandler={this.barcodeNotFoundPrompt}
        />

        <LotConfirmModal
          show={showLotNumberConfirmation_Popup}
          title={WARNING_SIGN_ICON + " Lot Number Not Matching"}
          message={this.composeLotNumberConfirmationMessage()}
          okButtonText="Continue"
          okHandler={() => {
            this.confirmNonRecommendedBarcodeHandler();
          }}
          cancelHandler={() => {
            this.cancelNonRecommendedBarcodeHandler();
          }}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  BarcodeNotFound: state.items.BarcodeNotFound,
});

const mapDispatchToProps = (dispatch) => {
  return {
    cleanBarcodeNotFound: () => dispatch(cleanBarcodeNotFound()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BarCodeReader);
