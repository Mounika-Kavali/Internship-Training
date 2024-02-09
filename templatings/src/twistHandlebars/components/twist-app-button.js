import React, { Component } from 'react'
import { connect } from 'react-redux';
import { setActiveApp } from '../../twistHandlebars/shipment-planning/actions/system';

export class TwistAppButton extends Component {
    constructor(props) {
        super(props);
    }

  render() {
    let selectApp = this.props.onClick || ((event) => {
        this.props.setActiveApp(this.props.name);
    });
    return (
        <div onClick={ selectApp }>
            <a>{ this.props.label }</a>
        </div>
    )
  }
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
    setActiveApp
};

export default connect(mapStateToProps, mapDispatchToProps)(TwistAppButton);
