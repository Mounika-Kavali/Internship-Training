import React, { Component } from "react";

class FormatChanger extends Component {
  constructor(props) {
    super(props);
    this.state = {
      format: false,
      inputInfo: "",
      changedInfo: "",
    };
  }

  // handleChange = (event) => {
  //   this.setState({
  //     inputInfo: event.target.value,
  //   });
  // };

  // handleFormatChange = () => {
  //   for (let i = 0; i < this.state.inputInfo.length; i++) {
  //     console.log(this.state.inputInfo[i], this.state.inputInfo.length);

  //     // this.state.changedInfo = this.state.inputInfo.replace(/_/g, "@");
  //     // this.state.changedInfo = this.state.inputInfo.replace(/-/g, "$");
  //     // this.state.changedInfo = this.state.inputInfo.replace("/abc", "gmail");
  //     // this.state.changedInfo = this.state.inputInfo.replace(" ", "");

  //     console.log(this.state.changedInfo, "After change");
  //   }
  // };
  FormatChange = () => {
    this.setState({
      format: !this.state.format,
    });
  };
  handleFormatChange = (e) => {
    this.setState({
      inputInfo: e.target.value,
      changedInfo: e.target.value
        .replace(/-/g, "$")
        .replace(/_/g, "")
        .replace(/ /g, "")
        .replace(/\/abc/g, "gmail.com"),
    });
    console.log(this.state.changedInfo);
  };
  render() {
    var input = this.state.format ? (
      <b style={{ backgroundColor: "skyblue" }}> {this.state.changedInfo} </b>
    ) : null;

    return (
      <>
        <div className="iputField" style={{ margin: "10% 10%" }}>
          <label>Give Input:</label>

          <input
            type="text"
            name="inputInfo"
            placeholder="Enter String"
            value={this.state.inputInfo}
            onChange={this.handleFormatChange}
          />
          <div>{input}</div>
          <button type="button" onClick={this.FormatChange}>
            Submit
          </button>
        </div>
      </>
    );
  }
}

export default FormatChanger;
