import React from "react";
import ContactList from "./ContactList";
import "./AddContacts.css";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

class AddContacts extends React.Component {
  constructor() {
    super();
    this.state = {
      fullName: "",
      mail: "",
      mobile: "",
      selectedState: "",
      selectedDist: "",
      isAccepted: true,
    };
  }
  distOptions = [
    { ID: 1, text: "HYD" },
    { ID: 2, text: "Medak" },
    { ID: 3, text: "Ranga Reddy" },
    { ID: 4, text: "Karimnagar" },
    { ID: 5, text: "Warangal" },
  ];
  // FOR SINGLE DATA BINDING
  // <input onChange={(e)=>{this.handleChange(e)}}/>
  //   handleChange = (e) => {
  //   this.setState({ fullName: e.target.value });
  // };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleCheck = (e) => {
    this.setState({ isAccepted: this.state.isAccepted === false });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
    // Call the parent callback function
    this.props.parentCallback(this.state.fullName);
    //TO REFRESH the values
    this.setState({
      fullName: "",
      mail: "",
      mobile: "",
      selectedState: "",
      selectedDist: "",
      isAccepted: false,
    });

    //console.log("NAME is:", this.state.fullName);
    // console.log("EMAIL is:", this.state.mail);
    // console.log("PHONE NO:", this.state.mobile);
    // console.log("IS ACCEPTED :", this.state.isAccepted);
  };

  render() {
    return (
      <>
        <div>
          <h2>ADD CONTACTS</h2>
          <Link to="/" style={{ color: "black", paddingLeft: "2%" }}>
            <FaArrowLeft />
          </Link>
          <form className="addContactForm" onSubmit={this.handleSubmit}>
            <div className="labelInput">
              <label>Name:</label>

              <input
                type="text"
                name="fullName"
                placeholder="Enter Name"
                value={this.state.fullName}
                onChange={this.handleChange}
              />
              {
                /* OTHER WAY WITHOUT CALLING handleChange() is */
                // <input ...... name="fullName" onChange={(e)=>{this.setState({[e.target.name]:e.target.value})}}></input>
                //or <input ...... name="fullName" onChange={(e)=>{this.setState({ fullName:e.target.value})/>
              }
            </div>
            <div className="dataBinding">
              <p>{this.state.fullName}</p>
            </div>
            <div className="labelInput">
              <label>Email:</label>
              <input
                type="text"
                name="mail"
                placeholder="Enter MailID"
                value={this.state.mail}
                onChange={this.handleChange}
              />
            </div>
            <div className="dataBinding">
              <p>{this.state.mail}</p>
            </div>
            <div className="labelInput">
              <label>Phone No:</label>
              <input
                type="number"
                name="mobile"
                placeholder="Enter Phone"
                value={this.state.mobile}
                onChange={this.handleChange}
              />
            </div>
            <div className="dataBinding">
              <p>{this.state.mobile}</p>
            </div>

            <div className="labelInput">
              <label htmlFor="selectedState">Choose state:</label>
              <select
                id="selectedState"
                name="selectedState"
                value={this.state.selectedState}
                onChange={this.handleChange}
              >
                <option value="tn">TN</option>
                <option value="ap">AP</option>
                <option value="ts">TS</option>
                <option value="mp">MP</option>
              </select>
            </div>
            {/* PASSING ARRAY OF OPTIONS INTO THE SELECT  */}
            <div className="labelInput">
              <label>Choose District:</label>
              <select
                value={this.distOptions.text}
                name="selectedDist"
                defaultValue="Warangal"
                multiple={false}
                onChange={this.handleChange}
              >
                {this.distOptions.map((item) => {
                  return (
                    <option key={item.ID} value={item.text}>
                      {item.text}
                    </option>
                  );
                })}
              </select>
            </div>

            <div>
              <span>Accept all T&C</span>
              <input
                type="checkbox"
                checked={this.state.isAccepted}
                onChange={(e) => this.handleCheck(e)}
              />
            </div>

            <br />

            <button type="submit" className="btn-primary">
              Done
            </button>
          </form>
        </div>
        <div>
          <ContactList {...this.state} />
        </div>
      </>
    );
  }
}

export default AddContacts;
