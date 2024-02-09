import React, { Component } from "react";
import "./FormValidations5.css";

class FormValidations5 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      username: "",
      Setpassword: "",
      Confirmpassword: "",
      mobile: "+91",
      CurrentAddress: "",
      PermanentAddress: "",
      AgreeAddress: false,
      country: "",
      agreeTerms: false,
      errors: {},
    };
  }

  handleInputChange = (e) => {
    //console.log(e.target.value, "handleInputChange()");
    const name = e.target.name;
    let inputValue =
      e.target.type === "checkbox" ? e.target.checked : e.target.value; //e.target.checked:true/false,
    // e.target.value:on for checkbox/state values for inputfields

    if (name === "AgreeAddress" && inputValue) {
      inputValue = this.state.CurrentAddress; // Assign CurrentAddress value to PermanentAddress when checkbox is checked
    }
    this.setState({
      [name]: inputValue,
    });
  };

  handleInputBlur = (e) => {
    const { name } = e.target;

    // Perform field-specific validation
    if (name === "email") {
      this.validateEmail();
    } else if (name === "username") {
      this.validateUsername();
    } else if (name === "Setpassword") {
      this.validateSetPassword();
    } else if (name === "Confirmpassword") {
      this.validateConfirmPassword();
    } else if (name === "mobile") {
      this.validateMobile();
    } else if (name === "CurrentAddress") {
      this.validateCurrentAddress();
    } else if (name === "PermanentAddress") {
      this.validatePermanentAddress();
    } else if (name === "country") {
      this.validateCountry();
    } else if (name === "agreeTerms") {
      this.validateTermsConditions();
    }
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // Fetch the 10-digit value without spaces
    const mobileNumber = this.state.mobile.replace(/\s/g, "").slice(3);
    // Form is valid, perform form submission logic here

    console.log("Form submitted with", {
      ...this.state,
      mobile: mobileNumber,
    });
    // Reset form fields and error state
    // this.setState({
    //   email: "",
    //   username: "",
    //   Setpassword: "",
    //   Confirmpassword: "",
    //   mobile: "+91",
    //   CurrentAddress: "",
    //   PermanentAddress: "",
    //   AgreeAddress: false,
    //   country: "",
    //   agreeTerms: false,
    //   errors: {},
    // });
  };

  validateEmail = () => {
    let errorMessage = null;

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
    let errorMessage = null;
    if (!this.state.username) {
      errorMessage = "Please enter your username.";
    }
    else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d_]+$/.test(this.state.username)){}
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
    // else if(!/^\bWOR_[A-Za-z0-9]{24}\b$/.test(this.state.username)){
    //   errorMessage = "Please enter a valid ID";
    // }
    this.setState((prevState) => ({
      errors: {
        ...prevState.errors,
        username: errorMessage,
      },
    }));
  };
  validateSetPassword = () => {
    let errorMessage = null;
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
    let errorMessage = null;
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
    let errorMessage = null;
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
  validateCurrentAddress = () => {
    let errorMessage = null;
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
  validatePermanentAddress = () => {
    let errorMessage = null;
    if (!this.state.PermanentAddress) {
      errorMessage = "Please enter your Permanent Address.";
    }
    this.setState((prevState) => ({
      errors: {
        ...prevState.errors,
        PermanentAddress: errorMessage,
      },
    }));
  };
  validateCountry = () => {
    let errorMessage = null;
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
    let errorMessage = null;
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
      errors.email === null &&
      errors.username === null &&
      errors.Setpassword === null &&
      errors.Confirmpassword === null &&
      errors.mobile === null &&
      errors.CurrentAddress === null &&
      errors.PermanentAddress === null &&
      errors.country === null &&
      errors.agreeTerms === null &&
      Object.values(errors).every((err) => err === null);
    console.log(
      errors.mobile === null,
      errors.CurrentAddress === null,
      errors.PermanentAddress === null,
      errors.country === null,
      errors.agreeTerms === null,
      Object.values(errors).every((err) => err === null),
      " errors.mobile"
    );
    

    return (
      <form  onSubmit={this.handleSubmit} className="formValidation"  autoComplete="off">
        <div className="labelInputs">
          <label>Email:</label>
          <input
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

        <div className="labelInputs">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={this.handleInputChange}
            onBlur={this.handleInputBlur}
          />
        </div>
        <div className="errorMsg">
          {errors.username && <span className="error">{errors.username}</span>}
        </div>

        <div className="labelInputs">
          <label>Set Password:</label>
          <input
            type="password"
            name="Setpassword"
            value={Setpassword}
            onChange={this.handleInputChange}
            onBlur={this.handleInputBlur}
          />
        </div>
        <div className="errorMsg">
          {errors.Setpassword && (
            <span className="error">{errors.Setpassword}</span>
          )}
        </div>

        <div className="labelInputs">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="Confirmpassword"
            value={Confirmpassword}
            onChange={this.handleInputChange}
            onBlur={this.handleInputBlur}
          />
        </div>
        <div className="errorMsg">
          {errors.Confirmpassword && (
            <span className="error">{errors.Confirmpassword}</span>
          )}
        </div>

        <div className="labelInputs">
          <label>Mobile Number:</label>

          <input
            type="text"
            name="mobile"
            value={mobile}
            onChange={this.handleInputChange}
            onBlur={this.handleInputBlur}
          />
        </div>
        <div className="errorMsg">
          {" "}
          {errors.mobile && <span className="error">{errors.mobile}</span>}
        </div>

        <div className="labelInputs">
          <label>Current Address:</label>
          <input
            type="text"
            name="CurrentAddress"
            value={CurrentAddress}
            onChange={this.handleInputChange}
            onBlur={this.handleInputBlur}
          />
        </div>
        <div className="errorMsg">
          {errors.CurrentAddress && (
            <span className="error">{errors.CurrentAddress}</span>
          )}
        </div>

        <div className="labelInputs">
          <label>
            <input
              type="checkbox"
              name="AgreeAddress"
              checked={AgreeAddress}
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
            />
            Both are Same
          </label>
          {errors.AgreeAddress && (
            <span className="error">{errors.AgreeAddress}</span>
          )}
        </div>

        <div className="labelInputs">
          <label>Permanent Address:</label>
          <input
            type="text"
            name="PermanentAddress"
            value={
              this.state.AgreeAddress
                ? this.state.CurrentAddress
                : this.state.PermanentAddress
            }
            onChange={this.handleInputChange}
            onBlur={this.handleInputBlur}
          />
          {errors.PermanentAddress && (
            <span className="error">{errors.PermanentAddress}</span>
          )}
        </div>

        <div className="labelInputs">
          <label>Country:</label>
          <select
            name="country"
            value={country}
            onChange={this.handleInputChange}
            onBlur={this.handleInputBlur}
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

        <div className="labelInputs">
          <label>
            <input
              type="checkbox"
              name="agreeTerms"
              checked={agreeTerms}
              onChange={this.handleInputChange}
              onBlur={this.handleInputBlur}
            />
            Agree to terms and conditions
          </label>
          {errors.agreeTerms && (
            <span className="error">{errors.agreeTerms}</span>
          )}
        </div>

        <button type="submit" 
       // disabled={!isFormValid}
        >Submit</button>
      </form>
    );
  }
}

export default FormValidations5;
