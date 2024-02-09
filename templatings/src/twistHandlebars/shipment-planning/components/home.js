import React, { Component } from 'react'
import { connect } from 'react-redux';

import AppButtonContainer from '../../components/app-button-container';
import { setActiveApp } from '../actions/system';


class ShipmentPlanningHome extends Component {

    componentDidMount() {
        this.props.setActiveApp("SHIPMENT_PLANNING");
        
    }

    render() {
        return (
            <div className="twst-shipment-planning-home-container">
                <main className="twst-shipment-planning-home-main-container">
                    <div className="twst-shipment-planning-home-main-container-inner">
                        <div className="twst-shipment-planning-home-section">
                            <div className="twst-shipment-planning-home-title">Genes</div>
                            <AppButtonContainer noTitle appButtons={[
                                { name: `${"SHIPMENT_PLANNING"}/miniprep`, label: 'Miniprep Genes' }
                                , { name: `${"SHIPMENT_PLANNING"}/maxiprep`, label: 'Maxiprep Genes' }
                               
                            ]} />
                        </div>
                       
                    </div>
                </main>
            </div>
        );
    }
}


const mapStateToProps = (state) => ({
    app: state.system.activeApp
});

const mapDispatchToProps = {
    setActiveApp
};

export default connect(mapStateToProps, mapDispatchToProps)(ShipmentPlanningHome);
