import React, { Component } from "react";
import { createPortal } from "react-dom";
import { Portal } from "react-portal";
import CRUDCompo4 from "../components/CRUDCompo4";
import CRUDCompo3 from "../components/CRUDCompo3";

class NavComponent4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectTo: null,
      redirectPath: null,
    };
  }

  handleClick = (comp) => {
    this.setState({
      redirectTo: comp,
      redirectPath: null,
    });
  };

  handleURL = (url) => {
    this.setState({
      redirectPath: url,
    });
  };

  render() {
    if (this.state.redirectPath) {
      return (
        <div>
          <div>
            <button onClick={() => this.handleClick(CRUDCompo4)}>Navigate 1</button>
            <button onClick={() => this.handleClick(CRUDCompo3)}>Navigate 2</button>
            <button onClick={() => this.handleURL("http://localhost:3000")}>
              Url Navigate
            </button>
          </div>
          <iframe src={this.state.redirectPath} title="External Content" width="600px" height="500px"/>
        </div>
      );
    }

    return (
      <div>
        <div>
          <button onClick={() => this.handleClick(CRUDCompo4)}>Navigate 1</button>
          <button onClick={() => this.handleClick(CRUDCompo3)}>Navigate 2</button>
          <button onClick={() => this.handleURL("http://localhost:3000")}>
            Url Navigate
          </button>
        </div>
        {this.state.redirectTo && (
          <Portal node={document.body}>
            <div>{createPortal(<this.state.redirectTo />, document.body)}</div>
          </Portal>
        )}
      </div>
    );
  }
}

export default NavComponent4;
