import React, { Component } from "react";
import CRUDCompo4 from "../components/CRUDCompo4";

class NavComponent1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeData: null,
    };

    // without using iframes/handle bars templates -just rendering the child component in parent component
    this.data = {
      data1: {
        name: "Dustin",
        component: <Component1 />,
      },
      data2: {
        name: "Milly",
        component: <Component2 />,
      },
      data3: {
        name: "Locus",
        component: <CRUDCompo4/>,
      },
    };
  }

  handleClick = (dataKey) => {
    const activeData = this.data[dataKey];
    this.setState({ activeData });
  };

  renderActiveData() {
    const { activeData } = this.state;

    if (activeData) {
      return <div>{activeData.component}</div>;
    }

    return null;
  }

  render() {
    return (
      <div>
        <h1>Main Page</h1>
        <button onClick={() => this.handleClick("data1")}>App 1</button>
        <button onClick={() => this.handleClick("data2")}>App 2</button>
        <button onClick={() => this.handleClick("data3")}>App 3</button>
        {this.renderActiveData()}
      </div>
    );
  }
}

// Example components
const Component1 = () => (
  <div style={{ background: "red", width: "100%", height: "100%" }}>
    Component 1
  </div>
);

const Component2 = () => (
  <div style={{ background: "green", width: "100%", height: "100%" }}>
    Component 2
    <CRUDCompo4/>
  </div>
);


export default NavComponent1;
