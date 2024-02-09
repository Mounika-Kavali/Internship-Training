import React, { Component } from "react";
import FormValidations2 from "./FormValidations2";
import FormValidations3 from "./FormValidations3";

class FormValidations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {},
    };
  }

  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.validateForm()) {
      // Form is valid, perform form submission logic here
      console.log("Form submitted with", this.state.email, this.state.password);

      // Reset form fields
      this.setState({
        email: "",
        password: "",
        errors: {},
      });
    }
  };

  validateForm = () => {
    let isValid = true;

    if (!this.state.email) {
      isValid = false;
      this.setState(
        (prevState) => ({
          errors: {
            ...prevState.errors,
            email: "Please enter your email.",
          },
        }),
        this.logErrors // Call logErrors() instead of setState callback function after state is updated
      );
    } else {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          email: "",
        },
      }));
    }

    if (!this.state.password) {
      isValid = false;
      this.setState(
        (prevState) => ({
          errors: {
            ...prevState.errors,
            password: "Please enter your password.",
          },
        }),
        this.logErrors
      );
    } else {
      this.setState((prevState) => ({
        errors: {
          ...prevState.errors,
          password: "",
        },
      }));
    }

    return isValid;
  };

  logErrors = () => {
    console.log("Form Field ERRORS:", this.state.errors);
  };

  render() {
    const { email, password, errors } = this.state;

    return (
        <>
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={this.handleInputChange}
          />
          <span className="mail-error">{errors["email"]}</span>
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={this.handleInputChange}
          />
          <span className="pswd-error">{errors.password}</span>
        </div>

        <button type="submit">Submit</button>
      </form>
      <hr/>
      <FormValidations3/>
      </>
    );
  }
}

export default FormValidations;
