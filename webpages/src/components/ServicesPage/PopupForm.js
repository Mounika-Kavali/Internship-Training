import React, { Component } from "react";
import {setFormData} from './../../actions/PopupFormAction'
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

class PopupForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      eventDate: "",
      mobile: "",
      address: "",
      pincode: "",
      redirectToPayment:false,
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    
    event.preventDefault();
    const formData = {
      fullName: this.state.fullName,
      eventDate: this.state.eventDate,
      mobile: this.state.mobile,
      address: this.state.address,
      pincode: this.state.pincode,
    };
     console.log(formData,"formData onSubmit")
    // Dispatch an action to store the form data in Redux
    this.props.setFormData(formData);
    // Reset form fields and close the popup
    this.setState({
      fullName: "",
      eventDate: "",
      mobile: "",
      address: "",
      pincode: "",
      redirectToPayment:true,
    },() => {
      // Callback function called after the state is updated
      //console.log(this.state.redirectToPayment, "payment boolean");// Here only the updated setState value is retrived
      this.props.onClose();
    }
  
  );};

  handleOverlayClick = (event) => {
    // Check if the click event occurred outside of the popup content
    if (event.target.classList.contains("popup-overlay")) {
      this.props.onClose();
    }
  };

  render() {
    const { onClose, estimatedAmount } = this.props;
    const { fullName, eventDate, mobile, address, pincode } = this.state;
    
    return (
      <>
        <div className="popup-overlay" onClick={this.handleOverlayClick}>
          <div className="popup-content">
            <div className="closeButtonDiv">
              <button type="button" className="closeButton" onClick={onClose}>
                &times;
              </button>
            </div>
            <h2 className="popupHeading">Enter Your Details</h2>
            <form onSubmit={this.handleSubmit}>
              <div className="inputLabel">
                <label>Full Name:</label>
                <input
                  type="text"
                  name="fullName"
                  value={fullName}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="inputLabel">
                <label>Event&nbsp;Date:</label>
                <input
                  type="date"
                  name="eventDate"
                  value={eventDate}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="inputLabel">
                <label>Mobile:</label>
                <input
                  type="text"
                  name="mobile"
                  value={mobile}
                  onChange={this.handleInputChange}
                />
              </div>
              <div className="inputLabel">
                <label>Address:</label>
                <textarea
                  name="address"
                  value={address}
                  onChange={this.handleInputChange}
                ></textarea>
              </div>
              <div className="inputLabel">
                <label>Pincode:</label>
                <input
                  type="text"
                  name="pincode"
                  value={pincode}
                  onChange={this.handleInputChange}
                />
              </div>
              {/* <div>
                <h3>
                  Total Price: <span id="amount">${estimatedAmount}</span>
                </h3>
              </div> */}
              <div className="nextButtonDiv">
                
                <button type="submit" className="nextButton">
                  Next
                </button>
               
              </div>
            </form>
           
            {this.state.redirectToPayment && (
            <Navigate to="/home/services/service-detailz/payment" replace={true} />
          )}
          </div>
        </div>
        
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  setFormData: (formData) => dispatch(setFormData(formData)),
});

export default connect(null, mapDispatchToProps)(PopupForm);
