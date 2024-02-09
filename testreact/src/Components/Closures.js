import React, { Component } from "react";

class Closures extends Component {
  constructor() {
    super();
    const privateData =
      "Closures mainly used for data privacy, encapsulation, and maintaining state between function calls.";

    this.logPrivateData = () => {
      console.log(privateData);
    };
  }
  //other way
  outerFunction = () => {
    const outerVariable = "I am from the outer function";
    this.innerFunction = () => {
      console.log(outerVariable);
    };

    return this.innerFunction;
  };
  closure = this.outerFunction();

  render() {
    this.closure();
    return (
      <div>
        <button onClick={this.logPrivateData}>Log Private Data</button>
      </div>
    );
  }
}
export default Closures;
