import React, { Component } from "react";

class FormValidations4 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      username: "",
      Setpassword: "",
      Confirmpassword: "",
      mobile: "+91 ",
      CurrentAddress: "",
      PermanentAddress: "",
      AgreeAddress: false,
      country: "",
      agreeTerms: false,
      errors: {},
    };
  }

  handleInputChange = (e) => {
    const name = e.target.name;
    let inputValue =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;

    if (name === "AgreeAddress" && inputValue) {
      inputValue = this.state.CurrentAddress; // Assign CurrentAddress value to PermanentAddress when checkbox is checked
    }
    this.setState({
      [name]: inputValue,
    });
  };

  handleInputFocus = (e) => {
    //console.log(e, "am focused");
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    this.setState(
      {
        [name]: inputValue,
      },
      () => {
        // Perform field-specific validation
        if (name === "email") {
        } else if (name === "username") {
          this.validateEmail();
        } else if (name === "Setpassword") {
          this.validateUsername();
        } else if (name === "Confirmpassword") {
          this.validateSetPassword();
        } else if (name === "mobile") {
          this.validateConfirmPassword();
        } else if (name === "CurrentAddress") {
          this.validateMobile();
        }
      }
    );
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.validateForm()) {
      // Form is valid, perform form submission logic here
      console.log("Form submitted with", this.state);

      // Reset form fields and error state
      this.setState({
        email: "",
        username: "",
        Setpassword: "",
        Confirmpassword: "",
        mobile: "+91 ",
        CurrentAddress: "",
        PermanentAddress: "",
        AgreeAddress: false,
        country: "",
        agreeTerms: false,
        errors: {},
      });
    }
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
  validateUsername = () => {
    let errorMessage = "";
    if (!this.state.username) {
      errorMessage = "Please enter your username.";
    }
    //else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d_]+$/.test(this.state.username)){}
    else {
      const { username } = this.state;
      const hasUppercase = /^[A-Z]/.test(username);
      const hasLowercase = /[a-z]/.test(username);
      const hasNumeric = /\d/.test(username);
      const hasOnlyUnderscore = /^[a-zA-Z\d_]+$/.test(username);

      if (!hasUppercase) {
        errorMessage = "Username must start with an uppercase letter.";
      } else if (!hasLowercase) {
        errorMessage = "Username must contain some lowercase letters.";
      } else if (!hasNumeric) {
        errorMessage = "Username must contain some numeric characters.";
      } else if (!hasOnlyUnderscore) {
        errorMessage =
          "Username can only contain alphanumeric characters and underscores.";
      }
    }
    this.setState((prevState) => ({
      errors: {
        ...prevState.errors,
        username: errorMessage,
      },
    }));
  };
  validateSetPassword = () => {
    let errorMessage = "";
    if (!this.state.Setpassword) {
      errorMessage = "Please enter strong password.";
    } else {
      const { Setpassword } = this.state;
      const hasUppercase = /[A-Z]/.test(Setpassword);
      const hasLowercase = /[a-z]/.test(Setpassword);
      const hasNumeric = /\d/.test(Setpassword);
      const hasSpecialChar = /[_@]/.test(Setpassword);
      const hasMinLength = Setpassword.length >= 8;

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
        Setpassword: errorMessage,
      },
    }));
  };
  validateConfirmPassword = () => {
    // Check if the passwords match
    let errorMessage = "";
    if (!this.state.Confirmpassword) {
      errorMessage = "Please confirm the password.";
    } else if (this.state.Setpassword !== this.state.Confirmpassword) {
      errorMessage = "Passwords do not match.";
    }
    this.setState((prevState) => ({
      errors: {
        ...prevState.errors,
        Confirmpassword: errorMessage,
      },
    }));
  };
  validateMobile = () => {
    let errorMessage = "";
    if (!this.state.mobile) {
      errorMessage = "Please enter your mobile number.";
    } else if (/[A-Za-z]/.test(this.state.mobile)) {
      errorMessage = "Mobile number should be numeric digits.";
    } else if (!/^\+\d{2} \d{10}$/.test(this.state.mobile)) {
      errorMessage =
        "Mobile number must contain exactly 10 numeric digits(ex: +91 9876543210).";
    }
    this.setState((prevState) => ({
      errors: {
        ...prevState.errors,
        mobile: errorMessage,
      },
    }));
  };
  validateCurrentAddress = () => {
    let errorMessage = "";
    if (!this.state.CurrentAddress) {
      errorMessage = "Please enter your Current Address.";
    }
    this.setState((prevState) => ({
      errors: {
        ...prevState.errors,
        CurrentAddress: errorMessage,
      },
    }));
  };
  validateCountry = () => {
    let errorMessage = "";
    if (!this.state.country) {
      errorMessage = "Please select a country.";
    }
    this.setState((prevState) => ({
      errors: {
        ...prevState.errors,
        country: errorMessage,
      },
    }));
  };
  validateTermsConditions = () => {
    let errorMessage = "";
    if (!this.state.agreeTerms) {
      errorMessage = "Please agree to the terms and conditions.";
    }
    this.setState((prevState) => ({
      errors: {
        ...prevState.errors,
        agreeTerms: errorMessage,
      },
    }));
  };
  validateForm = () => {
    let isValid = true;
    const error = {};

    this.setState({ errors: error });

    return isValid;
  };

  render() {
    const {
      email,
      username,
      Setpassword,
      Confirmpassword,
      mobile,
      CurrentAddress,
      PermanentAddress,
      AgreeAddress,
      country,
      agreeTerms,
      errors,
    } = this.state;


    const isFormValid =
    email &&
    username &&
    Setpassword &&
    Confirmpassword &&
    mobile &&
    CurrentAddress &&
    PermanentAddress &&
    country &&
    agreeTerms &&
    Object.keys(errors).length === 0;

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>

        <div>
          <label>Set Password:</label>
          <input
            type="password"
            name="Setpassword"
            value={Setpassword}
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          {errors.Setpassword && (
            <span className="error">{errors.Setpassword}</span>
          )}
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="Confirmpassword"
            value={Confirmpassword}
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          {errors.Confirmpassword && (
            <span className="error">{errors.Confirmpassword}</span>
          )}
        </div>

        <div>
          <label>Mobile Number:</label>

          <input
            type="text"
            name="mobile"
            value={mobile}
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          {errors.mobile && <span className="error">{errors.mobile}</span>}
        </div>

        <div>
          <label>Current Address:</label>
          <input
            type="textarea"
            name="CurrentAddress"
            value={CurrentAddress}
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          {errors.CurrentAddress && (
            <span className="error">{errors.CurrentAddress}</span>
          )}
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="AgreeAddress"
              checked={AgreeAddress}
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
            Both are Same
          </label>
          {errors.AgreeAddress && (
            <span className="error">{errors.AgreeAddress}</span>
          )}
        </div>

        <div>
          <label>Permanent Address:</label>
          <input
            type="textarea"
            name="PermanentAddress"
            value={
              this.state.AgreeAddress
                ? this.state.CurrentAddress
                : this.state.PermanentAddress
            }
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          />
          {errors.PermanentAddress && (
            <span className="error">{errors.PermanentAddress}</span>
          )}
        </div>

        <div>
          <label>Country:</label>
          <select
            name="country"
            value={country}
            onChange={this.handleInputChange}
            onFocus={this.handleInputFocus}
          >
            <option value="" disabled>
              Select a country
            </option>
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
            <option value="UK">UK</option>
            <option value="Australia">Australia</option>
          </select>
          {errors.country && <span className="error">{errors.country}</span>}
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              name="agreeTerms"
              checked={agreeTerms}
              onChange={this.handleInputChange}
              onFocus={this.handleInputFocus}
            />
            Agree to terms and conditions
          </label>
          {errors.agreeTerms && (
            <span className="error">{errors.agreeTerms}</span>
          )}
        </div>

        <button type="submit" disabled={!isFormValid}>Submit</button>
      </form>
    );
  }
}

export default FormValidations4;
