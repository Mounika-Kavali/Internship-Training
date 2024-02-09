import React, { Component } from 'react';
import Handlebars from 'handlebars';

export class Second extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeData: null,
    };

    // Example data objects
    this.data = {
      data1: {
        url: "https://storage-mes.twistbioscience-qa.com/",
      },
      // Add more data objects if needed
    };

    // Example Handlebars template
    this.template = `
      <div className="container">
     
        <iframe src="{{url}}" title="Handlebar-Component" width="100%" height="630vh" frameBorder="0" />
      
      </div>
    `;
  }

  componentDidMount() {
    // Assuming you want to set 'data1' as the activeData initially
    const initialDataKey = 'data1';
    const activeData = this.data[initialDataKey];
    this.setState({ activeData });
  }

  renderActiveData() {
    const { activeData } = this.state;

    if (activeData) {
      const template = Handlebars.compile(this.template);
      const html = template(activeData);

      return <div dangerouslySetInnerHTML={{ __html: html }} />;
    }

    return null;
  }

  render() {
    return (
      <div>
        {this.renderActiveData()} {/* Render the active data */}
      </div>
    );
  }
}

export default Second;
