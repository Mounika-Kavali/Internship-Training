import React, { Component } from "react";
import Embed from "react-embed";
import CRUDCompo4 from "../components/CRUDCompo4";
//For a local URL, you may encounter a cross-origin issue when embedding it in the Embed component
class NavComponent3 extends Component {
    constructor(props) {
      super(props);
      this.state = {
        embedUrl: "https://storage-mes.twistbioscience-qa.com/",
        showVideo: false,
        redirectTo: null,
      };
      this.handleOpenVideo=this.handleOpenVideo.bind(this);
      this.handleNavigate=this.handleNavigate.bind(this);
    }
  
    handleOpenVideo () {
      this.setState({
        showVideo: true,
        redirectTo: null,
      });
    };
  
    handleNavigate (){
      this.setState({
        showVideo: false,
        redirectTo: CRUDCompo4,
      });
    };
  
    render() {
      if (this.state.redirectTo) {
        const ComponentToRender = this.state.redirectTo;
        return <ComponentToRender />;
      }
  
      return (
        <div>
          <button onClick={this.handleOpenVideo}>Open Video</button>
          <button onClick={this.handleNavigate}>Navigate</button>
          {this.state.showVideo ? <Embed url={this.state.embedUrl}  /> : <p>hi</p>}
        </div>
      );
    }
  }
  

export default NavComponent3;
