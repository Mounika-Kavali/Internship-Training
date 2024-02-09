import React from "react";

class TryCatchStatements extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  componentDidMount() {
    try {
      // Code that may cause an error

      throw new Error("Error message..");
    } catch (error) {
      this.setState({ error });
      console.log(this.error);
    }
  }

  render() {
    if (this.state.error) {
      console.log(this.state.error);
      return <div>{this.state.error.message}</div>;
    }
    return <div>No error occurred.</div>;
  }
}

export default TryCatchStatements;
