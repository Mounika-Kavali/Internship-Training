import React, { Component } from "react";

class Async_Await extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())

      .then((data) => {
        this.setState({ users: data });
        console.log(this.state.users);
      })

      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <div>
        <h1>Users</h1>

        <ul>
          {this.state.users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Async_Await;

// import React, { Component } from "react";
// import { getData } from "./API";

// export class Async_Await extends Component {
//
//   componentDidMount() {
//     this.fetchData();

//
//   }
//this.fetchData = async () => {
//       try {
//         const responseData = await getData();
//
//         console.log(responseData);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//   render() {
//
//     return (
//       <>
//         <div>Async_Await</div>
//
//               </div>
//             );
//           })}
//       </>
//     );
//   }
// }

// // export class PromiseExample extends Component {
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       data: [],
// //     };
// //   }
// //   componentDidMount() {
// //     this.fetchData()
// //       .then((data) => {

// //         console.log(data, "DATA");
// //       })
// //       .catch((error) => {
// //         console.error(error);
// //       });
// //   }

// //   async fetchData() {
// //     const response = await fetch("https://api.thedogapi.com/v1/breeds");
// //     return await response.json();
// //   }

// //   render() {
// //     return (
// //       <>
// //         <h1>Promise Example</h1>
// //         {items=data.}
// //       </>
// //     );
// //   }
// // }
