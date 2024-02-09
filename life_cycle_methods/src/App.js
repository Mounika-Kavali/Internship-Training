import "./App.css";
import React from "react";
import UserList from "./LifeCycleMethods/MountingPhase/UserList ";
import UserDetails from "./LifeCycleMethods/MountingPhase/UserDetails ";
import UserForm from "./LifeCycleMethods/UpdatingPhase/UserForm";
import CleanupComponent from "./LifeCycleMethods/UnMountingPhase/CleanupComponent ";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshUsers: false,
      UserId: 5,
    };
  }
  handleRefreshUsers = () => {
    this.setState({ refreshUsers: true });
    console.log(this.setState.refreshUsers, "handleRefreshUsers() in app.js");
  };
  componentDidMount() {
    // Simulating a change in userId after some time
    setTimeout(() => {
      this.setState({ UserId: 2 });
    }, 3000);
  }
  render() {
    const { refreshUsers, UserId } = this.state;
    return (
      <>
        <div>
          {/* <h1>React API Mounting-getDerivedStateFromProps() Examples</h1>
          <button onClick={this.handleRefreshUsers}>Refresh Users</button>

          <UserList refreshUsers={refreshUsers} />
          <hr /> */}
          {/* <h1>React API Mounting Phase Examples</h1>

          <UserDetails userId={2} /> */}
        </div>
        {/* <div>
          <h1>React API UPDATING PHASE Example</h1>
          <UserForm userId={UserId} />
        </div> */}
        <div>
          <CleanupComponent />
        </div>
      </>
    );
  }
}

export default App;
