import React, { Component } from "react";

class UserDetails extends Component {
  constructor(props) {
    console.log("am constructor()");
    super(props);
    this.state = {
      user: null,
      isLoading: true,
      error: null,
    };
  }

  async componentDidMount() {
    console.log("am componentDidMount()");
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${this.props.userId}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const user = await response.json();
      this.setState({ user, isLoading: false });
    } catch (error) {
      this.setState({ error, isLoading: false });
    }
  }

  render() {
    const { user, isLoading, error } = this.state;
    console.log("am render()");
    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    if (!user) {
      return <div>User not found.</div>;
    }

    return (
      <div>
        <h1>User Details</h1>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Username: {user.username}</p>
      </div>
    );
  }
}

export default UserDetails;
