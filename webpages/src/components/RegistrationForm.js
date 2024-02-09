import React, { Component } from "react";
import { Navigate } from "react-router-dom";

export class RegistrationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      email: "",
      mobile: "+91",
      gender: "",
      setPassword: "",
      confirmPassword: "",
      errors: {},
      redirect: false,
    };
  }

  componentDidMount() {
    // Retrieve stored values from local storage
    const storedUsername = localStorage.getItem("username");
    const storedEmail = localStorage.getItem("email");
    const storedMobile = localStorage.getItem("mobile");
    const storedGender = localStorage.getItem("gender");
    const storedSetPassword = localStorage.getItem("setPassword");
    const storedConfirmPassword = localStorage.getItem("confirmPassword");

    // Set the retrieved values to the component state
    this.setState({
      username: storedUsername,
      email: storedEmail,
      mobile: storedMobile,
      gender: storedGender,
      setPassword: storedSetPassword,
      confirmPassword: storedConfirmPassword,
    });
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleInputBlur = (e) => {
    const { name } = e.target;
    if (name === "username") {
      this.validateUsername();
    } else if (name === "email") {
      this.validateEmail();
    } else if (name === "mobile") {
      this.validateMobile();
    } else if (name === "gender") {
      this.validateGender();
    } else if (name === "setPassword") {
      this.validateSetPassword();
    } else if (name === "confirmPassword") {
      this.validateConfirmPassword();
    }
  };

  validateUsername = () => {
    let errorMessage = "";
    if (!this.state.username) {
      errorMessage = "Please enter your username.";
    } else if (!/^[a-zA-Z\s.]+$/.test(this.state.username)) {
      errorMessage = "Please enter a valid username.";
    }

    this.setState((prevState) => ({
      errors: {
        ...prevState.errors,
        username: errorMessage,
      },
    }));
  };
  validateEmail = () => {
    let errorMessage = "";

    if (!this.state.email) {
      errorMessage = "Please enter your email.";
    } else if (!/\b[A-Za-z0-9._%+-]+@gmail\.com\b/.test(this.state.email)) {
      errorMessage = "Please enter a valid Gmail address.";
    }
    this.setState((prevState) => ({
      errors: {
        ...prevState.errors,
        email: errorMessage,
      },
    }));
  };
  validateMobile = () => {
    let errorMessage = "";
    if (!this.state.mobile) {
      errorMessage = "Please enter your mobile number.";
    } else if (/[A-Za-z]/.test(this.state.mobile)) {
      errorMessage = "Mobile number should be numeric digits.";
    } else if (!/^\+\d{2}\d{10}$/.test(this.state.mobile)) {
      errorMessage = "Mobile number must contain exactly 10 numeric digits.";
    }
    this.setState((prevState) => ({
      errors: {
        ...prevState.errors,
        mobile: errorMessage,
      },
    }));
  };
  validateGender = () => {
    let errorMessage = "";
    if (!this.state.gender) {
      errorMessage = "Please choose gender.";
    }
    this.setState((prevState) => ({
      errors: {
        ...prevState.errors,
        gender: errorMessage,
      },
    }));
  };
  validateSetPassword = () => {
    let errorMessage = "";
    if (!this.state.setPassword) {
      errorMessage = "Please enter strong password.";
    } else {
      const { setPassword } = this.state;
      const hasUppercase = /[A-Z]/.test(setPassword);
      const hasLowercase = /[a-z]/.test(setPassword);
      const hasNumeric = /\d/.test(setPassword);
      const hasSpecialChar = /[_@]/.test(setPassword);
      const hasMinLength = setPassword.length >= 8;

      if (!hasUppercase) {
        errorMessage = "Password must contain at least one uppercase letter.";
      } else if (!hasLowercase) {
        errorMessage = "Password must contain some lowercase letters.";
      } else if (!hasNumeric) {
        errorMessage = "Password must contain some numeric characters.";
      } else if (!hasSpecialChar) {
        errorMessage =
          "Password must contain special characters like '@' or underscore.";
      } else if (!hasMinLength) {
        errorMessage = "Password must be at least 8 characters long.";
      }
    }
    this.setState((prevState) => ({
      errors: {
        ...prevState.errors,
        setPassword: errorMessage,
      },
    }));
  };
  validateConfirmPassword = () => {
    let errorMessage = "";
    if (!this.state.confirmPassword) {
      errorMessage = "Please confirm the password.";
    } else if (this.state.setPassword !== this.state.confirmPassword) {
      errorMessage = "Passwords do not match.";
    }
    this.setState((prevState) => ({
      errors: {
        ...prevState.errors,
        confirmPassword: errorMessage,
      },
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state, "Registration details");
    // Update local storage when submited the form
    localStorage.setItem("username", this.state.username);
    localStorage.setItem("email", this.state.email);
    localStorage.setItem("gender", this.state.gender);
    localStorage.setItem("mobile", this.state.mobile);
    localStorage.setItem("setPassword", this.state.setPassword);
    localStorage.setItem("confirmPassword", this.state.confirmPassword);
    // Reset form fields and error state
    this.setState({
      email: "",
      username: "",
      setPassword: "",
      confirmPassword: "",
      mobile: "+91",
      gender: "",
      errors: {},
      redirect: true,
    });
  };
  render() {
    const {
      username,
      email,
      mobile,
      gender,
      setPassword,
      confirmPassword,
      errors,
    } = this.state;
    const isFormValid =
      errors.email === "" &&
      errors.username === "" &&
      errors.gender === "" &&
      errors.setPassword === "" &&
      errors.confirmPassword === "" &&
      errors.mobile === "" &&
      Object.values(errors).every((err) => err === "");
    return (
      <>
        <form
          onSubmit={this.handleSubmit}
          className="RegForm"
          id="RegForm-id"
          autoComplete="off"
        >
          <div className="HeadingName">
            <h2>REGISTRATION FORM</h2>
          </div>
          <div className="LabelInputDiv">
            <label className="regLabel">User Name:</label>

            <input
              className="input-box"
              type="text"
              name="username"
              value={username}
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
            />
          </div>
          <div className="errorMsg">
            {errors.username && (
              <span className="error">{errors.username}</span>
            )}
          </div>

          <div className="LabelInputDiv">
            <label className="regLabel">Email:</label>
            <input
              className="input-box"
              type="text"
              name="email"
              value={email}
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
            />
          </div>
          <div className="errorMsg">
            {errors.email && <span className="error">{errors.email}</span>}
          </div>

          <div className="LabelInputDiv">
            <label className="regLabel">Mobile No:</label>
            <input
              className="input-box"
              type="text"
              name="mobile"
              value={mobile}
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
            />
          </div>
          <div className="errorMsg">
            {errors.mobile && <span className="error">{errors.mobile}</span>}
          </div>

          <div className="LabelInputDiv">
            <label className="regLabel">Gender:</label>
            <div className="GenderInputs">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={gender === "male"}
                onChange={this.handleInputChange}
                onBlur={this.handleInputBlur}
              />
              Male
              <input
                type="radio"
                name="gender"
                value="female"
                checked={gender === "female"}
                onChange={this.handleInputChange}
                onBlur={this.handleInputBlur}
              />
              Female
            </div>
          </div>
          <div className="errorMsg">
            {errors.gender && <span className="error">{errors.gender}</span>}
          </div>

          <div className="LabelInputDiv">
            <label className="regLabel">Set&nbsp;Password:</label>
            <input
              className="input-box"
              type="password"
              name="setPassword"
              value={setPassword}
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
            />
          </div>
          <div className="errorMsg">
            {errors.setPassword && (
              <span className="error">{errors.setPassword}</span>
            )}
          </div>

          <div className="LabelInputDiv">
            <label className="regLabel">Confirm&nbsp;Password:</label>
            <input
              className="input-box"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
            />
          </div>
          <div className="errorMsg">
            {errors.confirmPassword && (
              <span className="error">{errors.confirmPassword}</span>
            )}
          </div>
          <button type="submit" disabled={!isFormValid} className="signUpButton">
            sign up
          </button>
        </form>
        {this.state.redirect && <Navigate to="/" replace={true} />}
      </>
    );
  }
}

export default RegistrationForm;
