import React, { Component } from "react";

export class Child extends Component {
  constructor(props) {
    super(props);
  }
  sendDataToParent = () => {
    const data = "Hello from child";

    // Call the callback function passed from the parent and pass the data
    this.props.onDataReceived(data);
  };
  render() {
    
    return (
      <>
        <div>{this.props.data}</div>
        <div>
          {/* Uncomment the following code to use map() to render array elements */}
          {/* {this.props.arr.map((item, index) => (
            <div key={index}>{item}</div>
          ))} */}
        </div>

        <div>
          {this.props.name}, {this.props.country}
        </div>
        <button onClick={this.sendDataToParent}>Send Data to Parent</button>
     
      </>
    );
  }
}

export default Child;
