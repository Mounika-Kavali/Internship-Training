import React, { Component } from "react";
import nunjucks from "nunjucks";

class Nunjucks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeData: null,
    };

    // Example data objects
    this.data = {
      data1: {
        name: "Dustin",
        url: "http://localhost:3000",
        age: 25,
      },
      data2: {
        name: "Milly",
        url: "http://localhost:3001",
        age: 30,
      },
      data3: {
        name: "Locus",
        url: "http://localhost:3002",
        age: 60,
      },
    };

    // Example Nunjucks template
    this.template = `
      <div >
        <h2>{{ name }}</h2>
        <p>Age: {{ age }}</p>
        <iframe src="{{ url }}"  title="Nunjucks Component" width="100%" height="800px" />
      </div>
    `;
  }

  handleClick = (dataKey) => {
    const activeData = this.data[dataKey];
    this.setState({ activeData });
  };

  renderActiveData() {
    const { activeData } = this.state;

    if (activeData) {
      nunjucks.configure({ autoescape: true });//used to configure the environment for template rendering.
      // The autoescape  is one of the configuration options.Escaping is the process of converting special chars.
      const template = nunjucks.renderString(this.template, activeData);

      return <div dangerouslySetInnerHTML={{ __html: template }} />;
    }

    return null;
  }

  render() {
    return (
      <div>
        <h1>Nunjucks Page</h1>
        <button onClick={() => this.handleClick("data1")}>App 1</button>
        <button onClick={() => this.handleClick("data2")}>App 2</button>
        <button onClick={() => this.handleClick("data3")}>App 3</button>
        {this.renderActiveData()}
      </div>
    );
  }
}

export default Nunjucks;
