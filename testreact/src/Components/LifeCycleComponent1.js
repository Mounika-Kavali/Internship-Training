import React, { Component } from "react";
import { Link } from "react-router-dom";
import LifeCycleComponent2 from "./LifeCycleComponent2";

class LifeCycleComponent1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "mikky",
    };
    console.log("LifeCycle1 Constructor");
  }
  componentDidMount() {
    console.log("LifeCycle1 componentDidMount");
  }

  shouldComponentUpdate() {
    console.log("LifeCycle1 shouldComponentUpdate");
    return true;
  }
  componentDidUpdate() {
    console.log("LifeCycle1 componentDidUpdate");
  }
  static getDerivedStateFromProps(props, state) {
    console.log("LifeCycle1 getDerivedStateFromProps");
    return null;
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("LifeCycle1 getSnapshotBeforeUpdate");
    return null;
  }

  changeState = () => {
    this.setState({
      name: "vikky",
    });
  };
  render() {
    console.log("LifeCycle1 render()");
    return (
      <>
        <div>LIFE CYCLE-1</div>

        {/* <Link to="/lifeCycle2">
          <button>Component2</button>
        </Link> */}
        <button onClick={this.changeState}>change state</button>
        <LifeCycleComponent2 />
      </>
    );
  }
}

export default LifeCycleComponent1;
