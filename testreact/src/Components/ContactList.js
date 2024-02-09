import React from "react";
import { Link } from "react-router-dom";

class Contacts extends React.Component {
  render() {
    return (
      <>
        <div>
          <h2>CONTACT LIST</h2>
          <Link to="/add">
            <button className="btn-secondary">Add Contact</button>
          </Link>
        </div>
        <div>{this.props.mail}</div>
      </>
    );
  }
}

export default Contacts;
