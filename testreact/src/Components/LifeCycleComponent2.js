import React, { Component } from "react";

class LifeCycleComponent2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "mikky",
    };
    console.log("lifeCycle2 Constructor");
  }
  componentDidMount() {
    console.log("lifeCycle2 compoentDidMount");
  }
  shouldComponentUpdate() {
    console.log("LifeCycle2 shouldComponentUpdate");
    return true;
  }
  componentDidUpdate() {
    console.log("LifeCycle2 componentDidUpdate");
  }
  static getDerivedStateFromProps(props, state) {
    console.log("lifeCycle2 getDerivedStateFromProps");
    return null;
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("LifeCycle2 getSnapshotBeforeUpdate");
    return null;
  }
  render() {
    return (
      <>
        <div>LIFE CYCLE-2</div>
        {console.log("lifeCycle2 render()")}
      </>
    );
  }
}

export default LifeCycleComponent2;
