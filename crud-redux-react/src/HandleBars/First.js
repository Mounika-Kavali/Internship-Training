import React, { Component } from "react";
import Handlebars from "handlebars";

// Example handlebars templates for different windows
const window1Template = `
  <h2>Window 1</h2>
  <p>Content for Window 1</p>
`;

const window2Template = `
  <h2>Window 2</h2>
  <p>Content for Window 2</p>
`;

class First extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeWindow: null,
    };
  }

  handleClick = (template) => {
    this.setState({ activeWindow: template });
  };

  renderActiveWindow() {
    const { activeWindow } = this.state;

    if (activeWindow) {
      const compiledTemplate = Handlebars.compile(activeWindow);
      const html = compiledTemplate();
      return <div dangerouslySetInnerHTML={{ __html: html }} />;
    }

    return null;
  }

  render() {
    return (
      <div>
        <h1>Main Page</h1>
        <button onClick={() => this.handleClick(window1Template)}>
          Open Window 1
        </button>
        <button onClick={() => this.handleClick(window2Template)}>
          Open Window 2
        </button>
        {this.renderActiveWindow()}
      </div>
    );
  }
}

export default First;
