import React, { Component } from 'react'
import { connect } from 'react-redux';
import { setActiveApp} from '../shipment-planning/actions/system';
import AppButtonContainer from './app-button-container';

export class Home extends Component {
  render() {
    return (
      <div>
        <AppButtonContainer mainApps={ true } appButtons={ [
                            { name: "PACKAGING_APP", label: 'Forth' }
                            , { name: "SYNTHESIS_ADMIN_APP", label: 'Synthesis Admin'}
                            , { name: "SUPERVISOR_APP", label: 'Supervisor' }
                            , { name: "SHIPMENT_PLANNING_APP", label: 'Shipment Planning' }
                            , { name: "WORK_RECORD_APP", label: 'Work Record'}
                        ] }/>
      </div>
    )
  }
  componentDidMount() {
    this.props.setActiveApp(null);
    // this.props.setSubnavOptions(null);
}
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = {
    setActiveApp
    // , setSubnavOptions
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
