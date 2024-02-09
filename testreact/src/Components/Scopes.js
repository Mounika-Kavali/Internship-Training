import React, { Component } from "react";

//main types of scopes:
// 1.Class Scope:
// 2.Method Scope:
// 3.Event Handler Scope:
// 4.Render Method Scope:
// 5.Props Scope:
class Scopes extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  state = {
    count: 0,
  };
  handleClick() {
    // Access the count state within the class scope
    this.setState({ count: this.state.count + 1 });
    // message Variables declared within the method scope
    const message = "Button clicked!";
    alert(message);
    // Access class properties within event handler scope
    console.log(this.props);
  }
  render() {
    //Access props within the render method by destructing props
    const { name } = this.props;
    const message = "Hello, Am in render()!";

    return (
      <div>
        <div>
          <p>Hello, {name}!</p>
          {/* //render() method scope */}
          <p>{message}</p>
        </div>
        {/* //PROP SCOPE--Access the count state within the render method */}
        <p>Count: {this.state.count}</p>
        <button onClick={this.handleClick}>Increment</button>
      </div>
    );
  }
}

export default Scopes;
