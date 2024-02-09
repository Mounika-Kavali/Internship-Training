import React, { Component } from 'react';

class MyComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      iframeSrc: "https://storage-mes.twistbioscience-qa.com/"
    };
  }
 componentDidMount(){
  window.addEventListener('message', this.handleIframeNavigation);
 }
 componentWillUnmount(){
  window.removeEventListener('message', this.handleIframeNavigation);
 }
 handleIframeNavigation=e=>{
  console.log(e,"event")
  if(e.origin!=="https://storage-mes.twistbioscience-qa.com/"){
    return;
  }
  const {pathname}=new URL(e.data);
  window.history.pushState({},'',pathname);
 };


  // handleIframeLoad = (event) => {
  //   const iframeSrc = event.target.src;
  //   this.setState({ iframeSrc });
  // };

  render() {
    return (
      <div>
        {/* <p>URL Path of the iframe: {this.state.iframeSrc}</p> */}
        <iframe
          src={this.state.iframeSrc}
          title="Example iframe"
          width="100%" height="630vh" 
          // onLoad={this.handleIframeLoad}
        />
       
      </div>
    );
  }
}

export default MyComponent;
