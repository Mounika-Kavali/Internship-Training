import React, { Component } from "react";

class FormValidations2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      username: "",
      Setpassword: "",
      Confirmpassword: "",
      mobile: "+91 ",
      address: "",
      country: "",
      agreeTerms: false,
      errors: {},
    };
  }

  handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;

    this.setState(
        {
          [name]: inputValue,
        },
        
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
        address: "",
        country: "",
        agreeTerms: false,
        errors: {},
      });
    }
  };

  validateForm = () => {
    let isValid = true;
    const error = {};
   
    if (!this.state.email) {
      isValid = false;
      error.email = "Please enter your email.";
    } else if (!/\b[A-Za-z0-9._%+-]+@gmail\.com\b/.test(this.state.email)) {
      isValid = false;
      error.email = "Please enter a valid Gmail address.";
    }


    if (!this.state.username) {
      isValid = false;
      error.username = "Please enter your username.";
    }
    //else if(!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d_]+$/.test(this.state.username)){}
    else {
      const { username } = this.state;
      const hasUppercase = /^[A-Z]/.test(username);
      const hasLowercase = /[a-z]/.test(username);
      const hasNumeric = /\d/.test(username);
      const hasOnlyUnderscore = /^[a-zA-Z\d_]+$/.test(username);

      if (!hasUppercase) {
        isValid = false;
        error.username = "Username must start with an uppercase letter.";
      } else if (!hasLowercase) {
        isValid = false;
        error.username = "Username must contain some lowercase letters.";
      } else if (!hasNumeric) {
        isValid = false;
        error.username = "Username must contain some numeric characters.";
      } else if (!hasOnlyUnderscore) {
        isValid = false;
        error.username =
          "Username can only contain alphanumeric characters and underscores.";
      }
    }

    if (!this.state.Setpassword) {
      isValid = false;
      error.Setpassword = "Please enter strong password.";
    } else {
      const { Setpassword } = this.state;
      const hasUppercase = /[A-Z]/.test(Setpassword);
      const hasLowercase = /[a-z]/.test(Setpassword);
      const hasNumeric = /\d/.test(Setpassword);
      const hasSpecialChar = /[_@]/.test(Setpassword);
      const hasMinLength = Setpassword.length >= 8;

      if (!hasUppercase) {
        isValid = false;
        error.Setpassword =
          "Password must contain at least one uppercase letter.";
      } else if (!hasLowercase) {
        isValid = false;
        error.Setpassword = "Password must contain some lowercase letters.";
      } else if (!hasNumeric) {
        isValid = false;
        error.Setpassword = "Password must contain some numeric characters.";
      } else if (!hasSpecialChar) {
        isValid = false;
        error.Setpassword =
          "Password must contain special characters like '@' or underscore.";
      } else if (!hasMinLength) {
        isValid = false;
        error.Setpassword = "Password must be at least 8 characters long.";
      }
    }

    // Check if the passwords match
    if (!this.state.Confirmpassword) {
      isValid = false;
      error.Confirmpassword = "Please confirm the password.";
    } else if (this.state.Setpassword !== this.state.Confirmpassword) {
      isValid = false;
      error.Confirmpassword = "Passwords do not match.";
    }

    if (!this.state.mobile) {
      isValid = false;
      error.mobile = "Please enter your mobile number.";
    }else if (!/^\+\d{2} \d{10}$/.test(this.state.mobile)) {
        isValid = false;
        error.mobile = "Mobile number must contain exactly 10 numeric digits(ex: +91 9876543210).";
    }

    if (!this.state.address) {
      isValid = false;
      error.address = "Please enter your address.";
    }

    if (!this.state.country) {
      isValid = false;
      error.country = "Please select a country.";
    }

    if (!this.state.agreeTerms) {
      isValid = false;
      error.agreeTerms = "Please agree to the terms and conditions.";
    }

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
      address,
      country,
      agreeTerms,
      errors,
    } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={this.handleInputChange}
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
          />
          {errors.mobile && <span className="error">{errors.mobile}</span>}
        </div>

        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={this.handleInputChange}
          />
          {errors.address && <span className="error">{errors.address}</span>}
        </div>

        <div>
          <label>Country:</label>
          <select
            name="country"
            value={country}
            onChange={this.handleInputChange}
          >
            <option value="">Select a country</option>
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
            />
            Agree to terms and conditions
          </label>
          {errors.agreeTerms && (
            <span className="error">{errors.agreeTerms}</span>
          )}
        </div>

        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default FormValidations2;
