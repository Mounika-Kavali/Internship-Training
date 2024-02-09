import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

export class Payment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "total",
      selectedPayment: null,
    };
  }
  calculateTotalAmount = () => {
    const { checkedItems } = this.props;
    const totalAmount = checkedItems.reduce(
      (sum, item) => sum + item.amount,
      0
    );
    return totalAmount;
  };

  calculateAdvanceAmount = () => {
    const totalAmount = this.calculateTotalAmount();
    const advanceAmount = totalAmount * 0.2; // Calculate 20% of the total amount
    return advanceAmount;
  };
  handleOptionChange = (event) => {
    this.setState({
      selectedOption: event.target.value,
    });
  };
  handlePaymentClick = (option) => {
    this.setState({
      selectedOption: option,
     
    });
  };
  handlePaymentOptionClick=(payment)=>{
    this.setState((prevState) => ({
      selectedPayment: prevState.selectedPayment === payment ? null : payment,
    }));
  }

  handleAppClick = (app) => {
    if (app === "GPay") {
      window.location.href = "https://pay.google.com";
    } else if (app === "PhPay") {
      window.location.href = "https://www.phpay.com";
    } else if (app === "Paytm") {
      window.location.href = "https://www.paytm.com";
    }
  };

  render() {
    const { formData } = this.props;
    const { selectedOption, selectedPayment } = this.state;

    return (
      <>
        <div className="infoDiv">
          <div className="allServiceInfo" id="allServiceInfo1">
            <h3 className="infoName">SERVICE DETAILS</h3>
            <p className="nameValue">Service Name:{this.props.eventName}</p>

            <ul className="unorderListItems">
              {this.props.checkedItems.map((item, index) => (
                <li key={index} className="nameValue">
                  {item.name} : Rs.{item.amount}
                </li>
              ))}
              {this.props.othersCheckboxValue !== "" && (
                <li className="nameValue">
                  <p>Others value: {this.props.othersCheckboxValue}</p>
                </li>
              )}
            </ul>
            <div className="totalAmount">
              <div>Total Amount:</div>
              <div>
                <span>Rs.{this.calculateTotalAmount()}</span>
              </div>
            </div>
          </div>

          <div className="allServiceInfo" id="allServiceInfo2">
            <h3 className="infoName">YOUR ENTERED DETAILS</h3>
            <p className="nameValue">Name: {formData.fullName}</p>
            <p className="nameValue">Event Date: {formData.eventDate}</p>
            <p className="nameValue">Mobile: {formData.mobile}</p>
            <p className="nameValue">Address: {formData.address}</p>
            <p className="nameValue">Pincode: {formData.pincode}</p>
          </div>
        </div>

        <div className="paymentsDiv">
          <div
            className={`paymentChosen ${
              selectedOption === "total" ? "active" : ""
            }`}
            onClick={() => this.handlePaymentClick("total")}
          >
            PAY TOTAL
          </div>
          <div
            className={`paymentChosen ${
              selectedOption === "advance" ? "active" : ""
            }`}
            onClick={() => this.handlePaymentClick("advance")}
          >
            PAY ADVANCE
          </div>
        </div>




        {selectedOption === "total" && (
          <div className="paymentMethods">
            <div>
              <h2>
                <u>Payment Method</u>
              </h2>
              <div className="payment-accordion">
                <div
                  className={`payment-option ${
                    selectedPayment === "UPI" ? "active" : ""
                  }`}
                  onClick={() => this.handlePaymentOptionClick("UPI")}
                >
                  UPI Payment
                </div>
                {selectedPayment === "UPI" && (
                  <div className="sub-options">
                    <div
                      className="sub-option"
                      onClick={() => this.handleAppClick("GPay")}
                    >
                      GPay
                    </div>
                    <div
                      className="sub-option"
                      onClick={() => this.handleAppClick("PhPay")}
                    >
                      PhonePay
                    </div>
                    <div
                      className="sub-option"
                      onClick={() => this.handleAppClick("Paytm")}
                    >
                      Paytm
                    </div>
                  </div>
                )}

                <div
                  className={`payment-option ${
                    selectedPayment === "Card" ? "active" : ""
                  }`}
                  onClick={() => this.handlePaymentOptionClick("Card")}
                >
                  Card Payment
                </div>

                <div
                  className={`payment-option ${
                    selectedPayment === "Netbanking" ? "active" : ""
                  }`}
                  onClick={() => this.handlePaymentOptionClick("Netbanking")}
                >
                  Netbanking
                </div>

                <div
                  className={`payment-option ${
                    selectedPayment === "Cash" ? "active" : ""
                  }`}
                  onClick={() => this.handlePaymentOptionClick("Cash")}
                >
                  Cash
                </div>
              </div>
            </div>
            <div className="payButtonDiv">
            <button type="button" className="payButton">PAY Rs.{this.calculateTotalAmount()}</button>
            </div>
          </div>
        )}

        {selectedOption === "advance" && (
          <div className="paymentMethods">
            <div>
              <h2>
                <u>Payment Method</u>
              </h2>
              <div className="payment-accordion">
                <div
                  className={`payment-option ${
                    selectedPayment === "UPI" ? "active" : ""
                  }`}
                  onClick={() => this.handlePaymentOptionClick("UPI")}
                >
                  UPI Payment
                </div>
                {selectedPayment === "UPI" && (
                  <div className="sub-options">
                    <div
                      className="sub-option"
                      onClick={() => this.handleAppClick("GPay")}
                    >
                      GPay
                    </div>
                    <div
                      className="sub-option"
                      onClick={() => this.handleAppClick("PhPay")}
                    >
                      PhonePay
                    </div>
                    <div
                      className="sub-option"
                      onClick={() => this.handleAppClick("Paytm")}
                    >
                      Paytm
                    </div>
                  </div>
                )}

                <div
                  className={`payment-option ${
                    selectedPayment === "Card" ? "active" : ""
                  }`}
                  onClick={() => this.handlePaymentOptionClick("Card")}
                >
                  Card Payment
                </div>

                <div
                  className={`payment-option ${
                    selectedPayment === "Netbanking" ? "active" : ""
                  }`}
                  onClick={() => this.handlePaymentOptionClick("Netbanking")}
                >
                  Netbanking
                </div>

                <div
                  className={`payment-option ${
                    selectedPayment === "Cash" ? "active" : ""
                  }`}
                  onClick={() => this.handlePaymentOptionClick("Cash")}
                >
                  Cash
                </div>
              </div>
            </div>
            <div className="payButtonDiv">
            <button type="button" className="payButton">PAY Rs.{this.calculateAdvanceAmount()}</button>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  eventName: state.events.eventName,
  formData: state.fields.formData,
  //checkListItems: state.checks.selectedCheckboxes,
  othersCheckboxValue: state.checks.textboxValue,
  checkedItems: state.checks.checkedItems,
});

export default connect(mapStateToProps)(Payment);
