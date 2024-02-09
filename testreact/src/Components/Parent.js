import React, { Component } from "react";
import Child from "./Child";

class Parent extends Component {
  state = {
    data: "Hello from Parent",
    receivedData: ""
  };

  obj = {
    name: "John",
    country: "USA",
  };

  handleCallback = (name) => {
    this.setState({ name });
  };
  handleChildData = (data) => {
    // Do something with the received data in the parent component
    console.log("Received data from child:", data);
    this.setState({ receivedData: data });
  };
  render() {
  const arrList = [1, 2, 3];
    return (
      <>
        <h2>Parent Component data passing into the child</h2>


        <Child data={this.state.data} {...this.obj} arr={arrList}  onDataReceived={this.handleChildData}/>
        <div>
          <h3>Below is the Retrieved data from Child Component</h3>
          
        </div>
        <div>
          <p>---{this.state.receivedData}</p>
        </div>
      </>
    );
  }
}

export default Parent;
