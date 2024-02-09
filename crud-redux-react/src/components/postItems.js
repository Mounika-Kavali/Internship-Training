import React, { Component } from "react";
import { connect } from "react-redux";
import { addItem } from "./../actions/postItemsActions";

class postItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "chi",
      lastName: "kki",
      age: 32,
      guardianName: "gghh",
      contactNo: "",
      address: "xxyyzz",
      remarks: "--",
      doj: "",
      type_of_child: "having parent",
      dob: "",
      gender: "female",
      standard: "V",
      sponser: "ABC",
      recordStatus: "Deleted",
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    // console.log(name, value, "onChange() called");
    // const { name, value } = e.target;
    // this.setState((prevState) => ({
    //   ...prevState,
    //   [name]: value,
    // }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const {
      firstName,
      lastName,
      age,
      guardianName,
      contactNo,
      address,
      remarks,
      doj,
      type_of_child,
      dob,
      gender,
      standard,
      sponser,
      recordStatus,
    } = this.state;
    const newItem = {
      firstName,
      lastName,
      age,
      guardianName,
      contactNo,
      address,
      remarks,
      doj,
      type_of_child,
      dob,
      gender,
      standard,
      sponser,
      recordStatus,
    };
    this.props.addItem(newItem);
    console.log(newItem, "POST DATAAAA");
    //  Route to another component
    window.location.href = "/get-items";
    //RESET FORM
    this.setState({
      firstName: "",
      lastName: "",
      age: 0,
      guardianName: "",
      contactNo: "",
      address: "",
      remarks: "",
      doj: "",
      type_of_child: "",
      dob: "",
      gender: "",
      standard: "",
      sponser: "",
      recordStatus: "Done",
    });
  };

  render() {
    const { loading, error, item } = this.props;
    const {
      firstName,
      lastName,
      age,
      guardianName,
      contactNo,
      address,
      remarks,
      doj,
      type_of_child,
      dob,
      gender,
      standard,
      sponser,
      recordStatus,
    } = this.state;

    return (
      <div>
        <h1>Post Items:</h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            firstName:
            <input
              type="text"
              placeholder="Enter item name"
              name="firstName"
              value={firstName}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            lastName:
            <input
              type="text"
              placeholder="Enter item name"
              name="lastName"
              value={lastName}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            Age:
            <input
              type="number"
              placeholder="Enter item name"
              name="age"
              value={age}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            guardianName:
            <input
              type="text"
              placeholder="Enter item name"
              name="guardianName"
              value={guardianName}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            contactNo:
            <input
              type="text"
              placeholder="Enter item name"
              name="contactNo"
              value={contactNo}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            Address:
            <textarea
              type="text"
              placeholder="Enter item name"
              name="address"
              value={address}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            Remarks:
            <textarea
              type="text"
              placeholder="Enter item name"
              name="remarks"
              value={remarks}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            DOJ:
            <input
              type="date"
              placeholder="Enter item name"
              name="doj"
              value={doj}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            type_of_child:
            <select
              name="type_of_child"
              value={type_of_child}
              onChange={this.handleInputChange}
            >
              <option value="">Select Category</option>
              <option value="having parents">having parents</option>
              <option value="having no parents">having no parents</option>
            </select>
          </div>
          <div>
            DOB:
            <input
              type="date"
              placeholder="Enter item name"
              name="dob"
              value={dob}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={gender === "male"}
              onChange={this.handleInputChange}
            />
            <label>Male</label>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={gender === "female"}
              onChange={this.handleInputChange}
            />
            <label>Female</label>
            <input
              type="radio"
              name="gender"
              value="Others"
              checked={gender === "Others"}
              onChange={this.handleInputChange}
            />
            <label>Others</label>
          </div>
          <div>
            standard:
            <input
              type="text"
              placeholder="Enter item name"
              name="standard"
              value={standard}
              onChange={this.handleInputChange}
            />
          </div>
          <div>
            sponser:
            <input
              type="text"
              placeholder="Enter item name"
              name="sponser"
              value={sponser}
              onChange={this.handleInputChange}
            />
          </div>
          Record Status:
          <input
            type="text"
            placeholder="Enter item name"
            name="recordStatus"
            value={recordStatus}
            onChange={this.handleInputChange}
          />
          <button type="submit">Add Item</button>
        </form>

        {/* {this.props.loading ? (
          <div>Loading...</div>
        ) : this.props.error ? (
          <div>Error: {this.props.error}</div>
        ) : this.props.item ? (
          <div>
            <h2>New Item Added is:</h2>
            <p>firstName: {this.props.item.firstName}</p>
            <p>lastName: {this.props.item.lastName}</p>
            <p>type of child: {this.props.item.type_of_child}</p>
            <p>gender: {this.props.item.gender}</p>
          </div>
        ) : null} */}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.item.loading,
    item: state.item.data,
    error: state.item.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addItem: (newItem) => dispatch(addItem(newItem)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(postItems);
