import React, { Component } from "react";

// export class UserList extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       users: [],
//       isLoading: true,
//       error: null,
//     };
//   }

//   async componentDidMount() {
//     try {
//       const response = await fetch(
//         "https://jsonplaceholder.typicode.com/users"
//       );
//       console.log(this.props.userId);
//       if (!response.ok) {
//         throw new Error("Failed to fetch user data");
//       }
//       const users = await response.json();
//       this.setState({ users, isLoading: false });
//     } catch (error) {
//       this.setState({ error, isLoading: false });
//     }
//   }

//   render() {
//     const { users, isLoading, error } = this.state;

//     if (isLoading) {
//       return <div>Loading...</div>;
//     }

//     if (error) {
//       return <div>Error: {error.message}</div>;
//     }

//     return (
//       <div>
//         <h1>Users List</h1>
//         <ul>
//           {users.map((user) => (
//             <li key={user.id}>
//               <h4>{user.name}</h4>
//               <p>{user.username}</p>
//             </li>
//           ))}
//         </ul>
//       </div>
//     );
//   }
// }

class UserList extends Component {
  // "https://jsonplaceholder.typicode.com/users"
  constructor(props) {
    console.log("this is Mounting Constructor()");
    super(props);
    this.state = {
      users: [],
      isLoading: true,
      error: null,
    };
  }

  static async getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.refreshUsers !== prevState.refreshUsers) {
      //false !==undefined
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        console.log(response, "response of getDerivedStateFromProps()"); //response.ok=true-no error
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const users = await response.json();
        console.log(
          nextProps.refreshUsers,
          "refreshUsers in getDerivedStateFromProps()"
        );
        return {
          users,
          isLoading: false,
          error: null,
          refreshUsers: nextProps.refreshUsers, // updated to false
        };
      } catch (error) {
        return {
          error,
          isLoading: false,
          users: [],
          refreshUsers: nextProps.refreshUsers,
        };
      }
    }
    return null;
  }

  async componentDidMount() {
    await this.fetchUsers();
  }

  async fetchUsers() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      console.log(response, "response of componentDidMount()");
      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }
      const users = await response.json();
      console.log(users, "ALL USERS in componentDidMount()");
      this.setState({ users, isLoading: false });
    } catch (error) {
      this.setState({ error, isLoading: false });
    }
  }

  render() {
    console.log("this is render()");
    const { users, isLoading, error } = this.state;

    if (isLoading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error: {error.message}</div>;
    }

    return (
      <div>
        <h1>Users List</h1>
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <h4>{user.name}</h4>
              <span>{user.username}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default UserList;
