import React, { Component } from 'react'
import { connect } from 'react-redux';
import { setActiveApp } from '../actions/system';


export class Root extends Component {
    componentWillMount() {
        this.props.setActiveApp("SHIPMENT_PLANNING");
    }
  render() {
    return (
        <div className="twst-app-main">
        <div className="twst-shipment-planning-app-main">
            <p>root component of shipment planning</p>
            { this.props.children }
        </div>
    </div>
    )
  }
}

const mapStateToProps = (state) => ({
    app: state.system.activeApp
   
});

export default connect(mapStateToProps, { setActiveApp })(Root);