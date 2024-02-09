import React, { Component } from "react";

class Jinja extends Component {
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

    // Example template
    this.template = `
      <div>
        <h2>{name}</h2>
        <p>Age: {age}</p>
        <iframe src="{url}" allowFullScreen title="Jinja Component" width="400px" height="500px" />
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
      const template = this.template.replace(/{([^}]+)}/g, (match, key) => activeData[key.trim()] || '');
      // replace the placeholders in the template with the corresponding values from the activeData object
      return <div dangerouslySetInnerHTML={{ __html: template }} />;
    }

    return null;
  }

  render() {
    return (
      <div>
        <h1>Jinja Page</h1>
        <button onClick={() => this.handleClick("data1")}>
          App 1
        </button>
        <button onClick={() => this.handleClick("data2")}>
          App 2
        </button>
        <button onClick={() => this.handleClick("data3")}>
          App 3
        </button>
        {this.renderActiveData()}
      </div>
    );
  }
}

export default Jinja;
