import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <>
        <Navbar bg="primary" variant="dark">
          <Container>
            <Link to="/">
              <h4 style={{ color: "red" }}>Contacts Task</h4>
            </Link>
            <Link to="/Parent">
              <h4 style={{ color: "red" }}>Parent Task</h4>
            </Link>
            <Link to="/formatChangerPage">
              <h4 style={{ color: "red" }}>Format Changer</h4>
            </Link>
            <Link to="/lifeCycle1">
              <h4 style={{ color: "red" }}>Life Cycle Phases</h4>
            </Link>
          </Container>
        </Navbar>
      </>
    );
  }
}

export default Header;
