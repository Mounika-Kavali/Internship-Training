import React from "react";

// JSON data array containing user credentials
const usersData = [
  { email: "user1@example.com", password: "password1" },
  { email: "user2@example.com", password: "password2" },
  // Add more user data as needed
];

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      error: "",
      isLoggedIn: false,
      newPassword: "",
      isPasswordReset: false,
    };
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password, newPassword, isPasswordReset } = this.state;
    const user = usersData.find((user) => user.email === email);

    if (isPasswordReset) {
      // Reset password logic
      if (user) {
        // User found, update the password in the data array
        user.password = newPassword;
        this.setState({ isPasswordReset: false, error: "" });
      } else {
        // User not found
        this.setState({ error: "User not found" });
      }
    } else {
      // Login logic
      if (user) {
        // User found, check if the entered password matches
        if (user.password === password) {
          // Successful login
          this.setState({ isLoggedIn: true, error: "" });
        } else {
          // Incorrect password
          this.setState({ error: "Incorrect password", isLoggedIn: false });
        }
      } else {
        // User not found
        this.setState({ error: "User not found", isLoggedIn: false });
      }
    }
    console.log(this.state,"LOGIN DETAILS")
  };

  handleForgotPassword = () => {
    this.setState({ isPasswordReset: true, error: "", password: "" });
  };

  render() {
    const { email, password, error, isLoggedIn, newPassword, isPasswordReset } =
      this.state;

    // Render login form if not logged in
    if (!isLoggedIn) {
      return (
        <div>
          <h2>Login</h2>
          {error && <p>{error}</p>}
          <form onSubmit={this.handleSubmit}>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.handleInputChange}
              required
            />
            {!isPasswordReset && (
              <>
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={this.handleInputChange}
                  required
                />
              </>
            )}
            {isPasswordReset && (
              <>
                <label>New Password:</label>
                <input
                  type="password"
                  name="newPassword"
                  value={newPassword}
                  onChange={this.handleInputChange}
                  required
                />
              </>
            )}
            {!isPasswordReset && <button type="submit">Login</button>}
            {isPasswordReset && <button type="submit">Reset Password</button>}
          </form>
          {!isPasswordReset && (
            <button onClick={this.handleForgotPassword}>Forgot Password</button>
          )}
        </div>
      );
    }

    // Render welcome message if logged in
    return (
      <div>
        <h2>Welcome, {email}!</h2>
        <p>You are logged in.</p>
      </div>
    );
  }
}

export default Login;
