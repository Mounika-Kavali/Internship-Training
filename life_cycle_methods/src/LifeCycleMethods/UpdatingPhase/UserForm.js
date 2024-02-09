import React, { Component } from "react";

class UserForm extends Component {
  constructor(props) {
    console.log("updating phase constructor");
    super(props);
    this.state = {
      Name: "",
      email: "",
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.userId !== prevState.userId) {
      console.log(
        nextProps.userId,
        "!==",
        prevState.userId,
        "in getDerivedStateFromProps()"
      );
      return {
        userId: nextProps.userId, //here the state is updated based on change in props
      };
    }
    return null;
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log(nextProps, nextState, "--shouldComponentUpdate()");
    if (
      nextProps.userId !== this.props.userId ||
      nextState.name !== this.state.Name ||
      nextState.email !== this.state.email
    ) {
      return true;
    }
    return false;
  }

  async componentDidMount() {
    const { userId } = this.props;
    if (userId) {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        console.log(response, "from componentDidMount()");
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const user = await response.json();
        this.setState({
          Name: user.name,
          email: user.email,
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("--getSnapshotBeforeUpdate()");
    if (
      prevState.name !== this.state.Name ||
      prevState.email !== this.state.email
    ) {
      return "Data is being updated...(snapshot value)";
    }
    return null;
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("--componentDidUpdate()");
    if (this.props.userId !== prevProps.userId) {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${this.props.userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const user = await response.json();
        this.setState({
          Name: user.name,
          email: user.email,
          userId: this.props.userId,
        });
      } catch (error) {
        console.error(error);
      }
    }
    if (snapshot !== null) {
      console.log(`Previous Name: ${snapshot}`);
    }
  }
  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const { userId } = this.props;
    const { Name, email } = this.state;
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Name, email }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update user data");
      }
      console.log("User data updated successfully");
      console.log(Name, email, "after update");
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    const { Name, email } = this.state;
    console.log("this is render()");
    return (
      <div>
        <h1>User Form</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="Name"
              value={Name}
              onChange={this.handleInputChange}
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={email}
              onChange={this.handleInputChange}
            />
          </label>
          <button type="submit">Update</button>
        </form>
      </div>
    );
  }
}

export default UserForm;
