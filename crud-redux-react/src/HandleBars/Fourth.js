import React, { Component } from 'react';
import Second from './Second';
import First from './First';
import Handlebars from 'handlebars';

const templates = {
  planning: 'plan',
  hitpicking: 'hit',
};

class Fourth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTemplate: null,
    };
  }

  handleNavigation = (route) => {
    const template = Handlebars.compile(templates[route]);
    const renderedTemplate = template();
    this.setState({ currentTemplate: renderedTemplate });
  };

  renderComponent = () => {
    const { currentTemplate } = this.state;
    switch (currentTemplate) {
      case 'plan':
        return <Second />;
      case 'hit':
        return <First />;
      default:
        return null;
    }
  };

  render() {
    return (
      <div>
        <button onClick={() => this.handleNavigation('planning')}>Go to Planning</button>
        <button onClick={() => this.handleNavigation('hitpicking')}>Go to Hitpicking</button>
        <div>{this.renderComponent()}</div>
      </div>
    );
  }
}

export default Fourth;
