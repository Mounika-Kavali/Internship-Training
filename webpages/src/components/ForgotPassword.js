import React, { Component } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

class ForgotPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: this.props.email,
      otp: "",
      newPassword: "",
      confirmPassword: "",
      successMsg: false,
      msgs: {},
    };
  }
  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  componentDidMount() {
    const searchParams = new URLSearchParams(window.location.search);
    const email = searchParams.get("email");
    this.setState({ email: email });
  }
  generateOTP = () => {
    // Generate a random 4-digit OTP
    const otp = Math.floor(1000 + Math.random() * 9000);
    this.setState({ otp });
  };

  handleInputBlur = (e) => {
    const { name } = e.target;

    if (name === "newPassword") {
      this.validateNewPassword();
    } else if (name === "confirmPassword") {
      this.validateConfirmPassword();
    }
  };
  validateNewPassword = () => {
    let errorMessage = "";
    if (!this.state.newPassword) {
      errorMessage = "Please enter strong password.";
    } else {
      const { newPassword } = this.state;
      const hasUppercase = /[A-Z]/.test(newPassword);
      const hasLowercase = /[a-z]/.test(newPassword);
      const hasNumeric = /\d/.test(newPassword);
      const hasSpecialChar = /[_@]/.test(newPassword);
      const hasMinLength = newPassword.length >= 8;

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
      msgs: {
        ...prevState.msgs,
        newPassword: errorMessage,
      },
    }));
  };
  validateConfirmPassword = () => {
    let errorMessage = "";
    if (!this.state.confirmPassword) {
      errorMessage = "Please confirm the password.";
    } else if (this.state.newPassword !== this.state.confirmPassword) {
      errorMessage = "Passwords do not match.";
    }
    this.setState((prevState) => ({
      msgs: {
        ...prevState.msgs,
        confirmPassword: errorMessage,
      },
    }));
  };
  handlePasswordChange = (e) => {
    e.preventDefault();
    console.log(this.state, "FORGOT PASSWROD DETAILS");
    // Update the confirmPassword in the local storage
    localStorage.setItem("confirmPassword", this.state.confirmPassword);
    this.setState({ successMsg: true });
  };

  render() {
    const { otp, newPassword, confirmPassword, msgs } = this.state;
    const isPasswordValid =
      msgs.newPassword === "" &&
      msgs.confirmPassword === "" &&
      Object.values(msgs).every((err) => err === "");

    return (
      <>
        <div className="fp-page">
          <div className="leftArrowIcon"> 
          <Link to="/" >
          <FaArrowLeft />
          </Link>
          </div>
        
          <form
            onSubmit={this.handlePasswordChange}
            className="fpForm"
            autoComplete="off"
          >
            <div className="HeadingName">
              <h2>Forgot Password?</h2>
            </div>

            <div className="fpDiv">
              <span className="fpEmail">Email: {this.state.email}</span>
            </div>
            <button onClick={this.generateOTP} className="otpButton">
              Generate OTP
            </button>
            <div className="otp-fpDiv">
              <input
                className="fp-input-box"
                type="text"
                name="otp"
                value={otp}
                placeholder="Enter OTP"
                onChange={this.handleInputChange}
              />
            </div>
            <div className="fpDiv">
              <input
                className="fp-input-box"
                type="password"
                name="newPassword"
                value={newPassword}
                placeholder="Enter New Password"
                onChange={this.handleInputChange}
                onBlur={this.handleInputBlur}
              />
            </div>
            <div className="fp-msgs">
              {msgs.newPassword && (
                <span className="error-msg">{msgs.newPassword}</span>
              )}
            </div>
            <div className="fpDiv">
              <input
                className="fp-input-box"
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Confirm New Password"
                onChange={this.handleInputChange}
                onBlur={this.handleInputBlur}
              />
            </div>
            <div className="fp-msgs">
              {msgs.confirmPassword && (
                <span className="error-msg">{msgs.confirmPassword}</span>
              )}
            </div>
            <div className="fp-msgs">
              {this.state.successMsg &&
                msgs.newPassword === "" &&
                msgs.confirmPassword === "" && (
                  <span className="success-msg">
                    Successfully changed the password
                  </span>
                )}
            </div>
            <button
              type="submit"
              disabled={!isPasswordValid}
              className="resetButton"
            >
              Reset
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default ForgotPassword;
