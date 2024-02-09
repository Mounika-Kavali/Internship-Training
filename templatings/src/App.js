import React, { Component } from 'react'
import { Router, Route, browserHistory } from 'react-router';
import { Provider } from "react-redux";
import store from './store'
// import HandlebarsTemplate2 from './components/HandlebarsTemplate2'
// import Root from 'components/root';
import Home from './twistHandlebars/components/home';
import ShipmentPlanningApp from './twistHandlebars/shipment-planning/index'

export class App extends Component {
  render() {
    return (
      <>
      {/* <HandlebarsTemplate2/> */}
      <Provider store={ store }>
        <Router >
          
              <Route path="/" component={ Home }/>
              { ShipmentPlanningApp }
          
        </Router>      
      </Provider>
      </>
    )
  }
}

export default App