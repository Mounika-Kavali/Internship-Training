import React from 'react';

class FirstComponent extends React.Component {
  constructor(props) {
    super(props);
    this.iframeRef = React.createRef();
  }

  navigateToSecondComponent = () => {
    console.log(this.iframeRef.current,"this.iframeRef")
    // <iframe title="Second Component" width="500" height="300" src="/second-component"></iframe>
    const iframe = this.iframeRef.current;
    iframe.src = '/second-component';
  };

  render() {
    return (
        <>
      <div>
        <h1>First Component</h1>
        <button onClick={this.navigateToSecondComponent}>Go to Second Component</button>
        
      </div>
      <iframe 
         ref={this.iframeRef} 
        title="Second Component" 
        width="600" height="300"></iframe>
      </>
    );
  }
}

export default FirstComponent;
