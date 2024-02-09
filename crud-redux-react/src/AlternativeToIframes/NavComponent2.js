import React, { Component } from "react";
import Iframe from "react-iframe";
import CRUDCompo4 from "../components/CRUDCompo4";

class NavComponent2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOtherComponentVisible: false,
    };
  }

  handleNavigate = () => {
    this.setState({
      isOtherComponentVisible: true,
    });
  };

  render() {
    if (this.state.isOtherComponentVisible) {
      return <CRUDCompo4 />;
    }

    return (
      <div>
        <button onClick={this.handleNavigate}>Navigate to Other Component</button>
        <Iframe
          url="http://localhost:3000/home" // Replace with the URL of the component you want to embed
          width="100%"
          height="900px"
        />
      </div>
    );
  }
}

export default NavComponent2;
