import React, { Component } from "react";
import { connect } from "react-redux";
import PopupForm from "./PopupForm";
import {setCheckedItemList,CheckedItemDetails} from '../../actions/ServiceCheckListAction'
class ServiceDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPopup: false,
      selectedCheckboxes: [], // Stores the selected checkboxes
      showTextbox: false,
      textboxValue: "",
    };
  }
  handleOthersCheckboxChange = (event) => {
    this.setState({
      showTextbox: event.target.checked,
    });
  };

  handleTextboxChange = (event) => {
    this.setState({
      textboxValue: event.target.value,
    });
  };
  handleContinueClick = () => {
    this.setState({ showPopup: true });
  };
  handleCheckboxChange = (event) => {
    const checkboxValue = event.target.value;
    const isChecked = event.target.checked;

    // Update the selected checkboxes state
    this.setState((prevState) => {
      if (isChecked) {
        return {
          selectedCheckboxes: [...prevState.selectedCheckboxes, checkboxValue],
        };
      } else {
        return {
          selectedCheckboxes: prevState.selectedCheckboxes.filter(
            (checkbox) => checkbox !== checkboxValue
          ),
        };
      }
    });
   
  };

  // handleCheckListClick = (event) => {
  //   // console.log(event)
  //   // Find the checkbox element within the clicked div
  //   const checkbox = event.currentTarget.querySelector(".serviceCheckBox");
  //   // Programmatically trigger a click event on the checkbox
  //   if (checkbox) {
  //     checkbox.click();
  //   }
  // };

  calculateEstimatedAmount = () => {
    // Calculate the estimated amount based on the selected checkboxes
    const selectedCheckboxes = this.state.selectedCheckboxes;
    const checkboxAmounts = {
      Candid: 100,
      Portrait: 150,
      Traditional: 200,
      Portfolios: 300,
      ClothingProduct: 250,
      FurnitureHomeInterior: 350,
      FoodProducts: 100,
      ElectronicProducts: 200,
      EquipmentMachinery: 400,
      JewelleryAccessories: 550,
      MakeupProducts: 350,
      Automobiles: 600,
      NotSure:3500,
    };
    const totalAmount = selectedCheckboxes.reduce(
      (amount, checkbox) => amount + checkboxAmounts[checkbox],
      0
    );
    const checkedItems = this.state.selectedCheckboxes.map(checkbox => {
      const amount = checkboxAmounts[checkbox];
     
      return {
        name: checkbox,
        amount: amount
      };
    });
    
     console.log("Checked Items with amt:", checkedItems);
     this.props.CheckedItemDetails(checkedItems);

    // for (const checkbox of this.state.selectedCheckboxes) {
    //   console.log("Name:", checkbox);
    //   console.log("Amount:", checkboxAmounts[checkbox]);
    // this.props.CheckedItemDetails(checkbox, checkboxAmounts[checkbox]);//here while calling the props individual item is displayed for each time.like: candid 100
     
    // }
    

    return totalAmount;
  };
  birthdayCheckList = (imgURL) => {
    const estimatedAmount = this.calculateEstimatedAmount();
    return (
      <>
        <div className="bg">
          <img src={imgURL} alt="bday img" />
          <div className="serviceDetailsDiv">
            <h1 className="serviceHeadingName">{this.props.eventName} service details</h1>
            <div className="eachCheckList" onClick={this.handleCheckListClick}>
              <input
                type="checkbox"
                className="serviceCheckBox"
                value="Candid"
                onChange={this.handleCheckboxChange}
              />
              <label className="serviceLabel">Candid</label>
            </div>
            <div className="eachCheckList" onClick={this.handleCheckListClick}>
              <input
                type="checkbox"
                className="serviceCheckBox"
                value="Portrait"
                onChange={this.handleCheckboxChange}
              />
              <label className="serviceLabel">Portrait</label>
            </div>
            <div className="eachCheckList" onClick={this.handleCheckListClick}>
              <input
                type="checkbox"
                className="serviceCheckBox"
                value="Traditional"
                onChange={this.handleCheckboxChange}
              />
              <label className="serviceLabel">Traditional</label>
            </div>
            <div className="eachCheckList" onClick={this.handleCheckListClick}>
              <input
                type="checkbox"
                className="serviceCheckBox"
                value="Portfolios"
                onChange={this.handleCheckboxChange}
              />
              <label className="serviceLabel">Portfolios</label>
            </div>


            <div className="othersCheckList" onClick={this.handleCheckListClick}>
              <input
                type="checkbox"
                className="serviceCheckBox"
                value="Others"
                onChange={this.handleOthersCheckboxChange}
              />
              <label className="serviceLabel">Others</label>
              {this.state.showTextbox && (
            <input
              type="text"
              className="textbox"
              value={this.state.textboxValue}
              onChange={this.handleTextboxChange}
            />
          )}
            </div>

            <div className="eachCheckList" onClick={this.handleCheckListClick}>
              <input
                type="checkbox"
                className="serviceCheckBox"
                value="NotSure"
                onChange={this.handleCheckboxChange}
              />
              <label className="serviceLabel">Am not sure</label>
            </div>
            <div className="eachCheckList">
              <h3 style={{ color: "white" }}>
                ESTIMATED AMOUNT:<span id="amt">$ {estimatedAmount}</span>
              </h3>
            </div>
            <div className="continueButtonDiv">
              <button
                type="button"
                className="continueButton"
                onClick={this.handleContinueClick}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  productCatalogueCheckList = (imgURL) => {
    const estimatedAmount = this.calculateEstimatedAmount();
    return (
      <>
        <div className="bg">
          <img src={imgURL} alt="bday img" />
          <div className="serviceDetailsDiv">
          <h1 className="serviceHeadingName">{this.props.eventName} service details</h1>
          <div className="eachCheckList" onClick={this.handleCheckListClick}>
            <input
              type="checkbox"
              className="serviceCheckBox"
              value="ClothingProduct"
              onChange={this.handleCheckboxChange}
            />
            <label className="serviceLabel">Clothing and Product</label>
          </div>
          <div className="eachCheckList" onClick={this.handleCheckListClick}>
            <input
              type="checkbox"
              className="serviceCheckBox"
              value="FurnitureHomeInterior"
              onChange={this.handleCheckboxChange}
            />
            <label className="serviceLabel">Furniture and Home Interior</label>
          </div>
          <div className="eachCheckList" onClick={this.handleCheckListClick}>
            <input
              type="checkbox"
              className="serviceCheckBox"
              value="FoodProducts"
              onChange={this.handleCheckboxChange}
            />
            <label className="serviceLabel">FoodProducts</label>
          </div>
          <div className="eachCheckList" onClick={this.handleCheckListClick}>
            <input
              type="checkbox"
              className="serviceCheckBox"
              value="ElectronicProducts"
              onChange={this.handleCheckboxChange}
            />
            <label className="serviceLabel">ElectronicProducts</label>
          </div>
          <div className="eachCheckList" onClick={this.handleCheckListClick}>
            <input
              type="checkbox"
              className="serviceCheckBox"
              value="EquipmentMachinery"
              onChange={this.handleCheckboxChange}
            />
            <label className="serviceLabel">Equipment/Machinery</label>
          </div>
          <div className="eachCheckList" onClick={this.handleCheckListClick}>
            <input
              type="checkbox"
              className="serviceCheckBox"
              value="JewelleryAccessories"
              onChange={this.handleCheckboxChange}
            />
            <label className="serviceLabel">Jewellery and Accessories</label>
          </div>
          <div className="eachCheckList" onClick={this.handleCheckListClick}>
            <input
              type="checkbox"
              className="serviceCheckBox"
              value="MakeupProducts"
              onChange={this.handleCheckboxChange}
            />
            <label className="serviceLabel">MakeupProducts</label>
          </div>
          <div className="eachCheckList" onClick={this.handleCheckListClick}>
            <input
              type="checkbox"
              className="serviceCheckBox"
              value="Automobiles"
              onChange={this.handleCheckboxChange}
            />
            <label className="serviceLabel">Automobiles</label>
          </div>
          <div className="othersCheckList" onClick={this.handleCheckListClick}>
              <input
                type="checkbox"
                className="serviceCheckBox"
                value="Others"
                onChange={this.handleOthersCheckboxChange}
              />
              <label className="serviceLabel">Others</label>
              {this.state.showTextbox && (
            <input
              type="text"
              className="textbox"
              value={this.state.textboxValue}
              onChange={this.handleTextboxChange}
            />
          )}
            </div>

            <div className="eachCheckList" onClick={this.handleCheckListClick}>
              <input
                type="checkbox"
                className="serviceCheckBox"
                value="NotSure"
                onChange={this.handleCheckboxChange}
              />
              <label className="serviceLabel">Am not sure</label>
            </div>
            
          <div className="eachCheckList">
            <h3 style={{ color: "white" }}>
              ESTIMATED AMOUNT:<span id="amt">$ {estimatedAmount}</span>
            </h3>
          </div>
          <div  className="continueButtonDiv">
            <button
              type="button"
              className="continueButton"
              onClick={this.handleContinueClick}
            >
              Continue
            </button>
          </div>
        </div>
        </div>
      </>
    );
  };

  render() {
    // console.log(this.state.selectedCheckboxes,"selectedCheckboxes")
    // console.log(this.state.textboxValue,"textboxValue")
    console.log(this.calculateEstimatedAmount(),"TOTALAMOUNT")

    this.props.setCheckedItemList(this.state.selectedCheckboxes,this.state.textboxValue)
    const birthdayIMG =
      "https://images.unsplash.com/photo-1589218909732-f304d13fbf2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80";
    
    const weddingIMG="https://images.unsplash.com/photo-1587271339318-2e78fdf79586?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDJ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
    const engagementIMG="https://images.unsplash.com/photo-1554047310-ab6170fc7b10?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDF8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
    const productCatalogueIMG="https://images.unsplash.com/photo-1621600411688-4be93cd68504?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjR8fHBob3RvZ3JhcGh5fGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60"
    
      return (
      <>
        {/* <h1>{this.props.eventName} service details</h1> */}
        {this.props.birthdayEvent && this.birthdayCheckList(birthdayIMG)}
        {this.props.weddingEvent && this.birthdayCheckList(weddingIMG)}
        {this.props.engagementEvent && this.birthdayCheckList(engagementIMG)}
        {this.props.productCatalogueEvent && this.productCatalogueCheckList(productCatalogueIMG)}

        {this.state.showPopup && (
          <PopupForm
            onClose={() => this.setState({ showPopup: false })}
            estimatedAmount={this.calculateEstimatedAmount()}
          />
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  eventName: state.events.eventName,
  birthdayEvent: state.events.birthdayEvent,
  weddingEvent: state.events.weddingEvent,
  engagementEvent: state.events.engagementEvent,
  productCatalogueEvent: state.events.productCatalogueEvent,
});
const mapDispatchToProps = {
  setCheckedItemList,
  CheckedItemDetails,
};

export default connect(mapStateToProps,mapDispatchToProps)(ServiceDetails);
