import React, { Component } from "react";
import { Navigate } from "react-router-dom";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Email: "",
      Password: "",
      redirectToRegistration: false,
      redirectToForgotPassword: false,
      redirectToHome: false,
      Errors: {},
    };
  }

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state, "Login details");

    // Retrieve stored values from local storage
    const storedEmail = localStorage.getItem("email");
    const storedConfirmPassword = localStorage.getItem("confirmPassword");
    if (
      this.state.Email === storedEmail &&
      this.state.Password === storedConfirmPassword
    ) {
      console.log("Login successful");
      // Reset form fields and error state
      this.setState({
        //     Email: "",
        //     Password: "",
        redirectToRegistration: false,
        redirectToForgotPassword: false,
        redirectToHome: true,
        //     Errors: {},
      });
    } else if (!this.state.Email || !this.state.Password) {
      console.log("Enter Login Details");
      this.setState({
        Errors: {
          login: "Enter Login Details",
        },
      });
    } else {
      console.log("Login failed");
      this.setState({
        Errors: {
          login: "Invalid email or password",
        },
      });
    }
  };
  handleRegistrationPage = () => {
    this.setState({
      redirectToRegistration: true,
    });
  };
  handleForgotPasswordPage = () => {
    if (!this.state.Email) {
      console.log("Enter Email for reset password");
      this.setState({
        Errors: {
          login: "Enter email for reset password",
        },
      });
    } else if (!/\b[A-Za-z0-9._%+-]+@gmail\.com\b/.test(this.state.Email)) {
        console.log("Please enter a valid Gmail address.");
      this.setState({
        Errors: {
          login: "Please enter a valid Gmail address.",
      }
    });
}
    
    
    else
      this.setState({
        redirectToForgotPassword: true,
      });
  };

  render() {
    const { Email, Password, Errors } = this.state;
    return (
      <>
      <div className="loginForm">
        <img src="https://wallpapercave.com/wp/wp7549416.jpg"></img>
        <div className="Form-Wrapper">
        <form
          onSubmit={this.handleSubmit}
          className="LogForm"
          id="loginPage"
          autoComplete="off"
        >
          <div className="HeadingName">
            <h2>LOGIN</h2>
          </div>

          <div className="loginErrorMsg">
            {Errors.login && <span className="error">{Errors.login}</span>}
          </div>

          <div className="LabelInputDiv">
            <input
              className="login-email-input-box"
              type="text"
              name="Email"
              value={Email}
              placeholder="Email"
              onChange={this.handleInputChange}
            />
          </div>
          <div className="LabelInputDiv">
            <input
              className="login-password-input-box"
              type="text"
              name="Password"
              value={Password}
              placeholder="Password"
              onChange={this.handleInputChange}
            />
          </div>
          <p className="forgotPassword">
            Forgot password?
            <u onClick={this.handleForgotPasswordPage}>Click Here</u>
          </p>

          <button type="submit" className="loginButton">
            Login
          </button>
          <hr className="horizontal-line" />
          <button
            type="button"
            onClick={this.handleRegistrationPage}
            className="registerButton"
          >
            Register
          </button>
        </form>
        {this.state.redirectToRegistration && (
          <Navigate to="/Registration" replace={true} />
        )}
        {this.state.redirectToForgotPassword && (
          <Navigate
            to={`/login/forgot-password?email=${encodeURIComponent(
              this.state.Email
            )}`}
            replace={true}
          />
        )}
        {this.state.redirectToHome && <Navigate to="/home" replace={true} />}
        </div>
        </div>
      </>
    );
  }
}

export default Login;
 