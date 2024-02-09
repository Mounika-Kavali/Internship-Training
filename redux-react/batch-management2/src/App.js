import React, { Component } from "react";
import "./App.css";
import ForthCatalogPacking from "./components/ForthCatalogPacking";
import ChatComponent from "./components/chatGPT/ChatComponent";

export class App extends Component {
  render() {
    return (
      <>
        <ForthCatalogPacking />
      </>
    );
  }
}

export default App;
