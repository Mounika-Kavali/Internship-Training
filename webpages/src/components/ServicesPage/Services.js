import React, { Component } from "react";
import {
  setBirthdayEvent,
  setWeddingEvent,
  setEngagementEvent,
  setProductCatalogue
} from "../../actions/ServicesAction";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

class Services extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToServiceDetails: false,
    };
  }
  handleClickBirthday = () => {
    this.props.setBirthdayEvent(true);
    this.setState({
      redirectToServiceDetails: true,
    });
  };

  handleClickWedding = () => {
    this.props.setWeddingEvent(true);
    this.setState({
      redirectToServiceDetails: true,
    });
  };
  handleClickEngagement = () => {
    this.props.setEngagementEvent(true);
    this.setState({
      redirectToServiceDetails: true,
    });
  };
  handleClickProductCatalogue = () => {
    this.props.setProductCatalogue(true);
    this.setState({
      redirectToServiceDetails: true,
    });
  };

  render() {
    return (
      <>
        <div>
          <h1 className="serviceHeading">What type of services do you want?</h1>
        </div>

        <div className="grid-container">
          <div className="grid-item" id="div1" onClick={this.handleClickBirthday}>
          <p>BIRTHDAY</p>

          </div>

          <div className="grid-item" id="div2" onClick={this.handleClickWedding}>
            <p>WEDDING</p>
          </div>
          <div className="grid-item" id="div3"  onClick={this.handleClickEngagement}>
            <p>ENGAGEMENT</p>
          </div>
          <div className="grid-item" id="div4" onClick={this.handleClickProductCatalogue}>
            <p>PRODUCT CATALOGUE</p>
          </div>
          <div className="grid-item">
            <p>POST-WEDDING SHOOT</p>
          </div>
          <div className="grid-item">
            <p>MATERNITY</p>
          </div>
          <div className="grid-item">
            <p>FASHION PORTFOLIO</p>
          </div>
          <div className="grid-item">
            <p>PERSONAL PARTIES</p>
          </div>
          <div className="grid-item">
            <p>COUPLE PORTRAIT</p>
          </div>
          <div className="grid-item">
            <p>CORPORATE EVENTS</p>
          </div>
          <div className="grid-item">
            <p>SPECIAL OCCASION</p>
          </div>
          <div className="grid-item">
            <p>BABY SHOOT</p>
          </div>
          <div className="grid-item">
            <p>VEDIOGRAPHERS</p>
          </div>
          <div className="grid-item">
            <p>CINEMATOGRAPHERS</p>
          </div>
          {this.state.redirectToServiceDetails && (
            <Navigate to="/home/services/service-detailz" replace={true} />
          )}
        </div>
      </>
    );
  }
}
const mapDispatchToProps = {
  setBirthdayEvent,
  setWeddingEvent,
  setEngagementEvent,
  setProductCatalogue
};
export default connect(null, mapDispatchToProps)(Services);
