import React, { Component } from "react";

class CleanupComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: 0,
      windowWidth: window.innerWidth,
    };
    this.timerId = null;
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    console.log("Component Mounted");
    // Example 1: Add event listener
    window.addEventListener("resize", this.handleResize);

    // Example 2: Set up a timer
    this.timerId = setTimeout(this.handleTimeout, 2000);
  }

  handleResize() {
    console.log("Window Resized");
    // Handle the resize event
    this.setState({ windowWidth: window.innerWidth });
  }

  handleTimeout = () => {
    // Handle the timeout
    this.setState((prevState) => ({ time: prevState.time + 1 }));
    console.log(this.state.time, "Now time in handleTimeout()");
  };

  componentWillUnmount() {
    console.log("Component UnMounted");
    // Example 1: Remove event listener
    window.removeEventListener("resize", this.handleResize);
    // Example 2: Clear the timer
    console.log(this.timerId, " TimerID before componentWillUnMount()");
    clearTimeout(this.timerId);
    console.log(this.timerId, " TimerID after componentWillUnMount()");
  }

  render() {
    return (
      <div>
        <h1>Component Cleanup Example</h1>
        <p>Time: {this.state.time}</p>
        <p>Window Width: {this.state.windowWidth}px</p>
      </div>
    );
  }
}

export default CleanupComponent;
