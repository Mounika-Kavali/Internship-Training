import React, { Component } from "react";
//use optional chaining to access nested properties of state or props objects.
// that allows you to safely access properties of an object without causing an error if any intermediate property is null or undefined.
export class OptionalChaining extends Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <h1>Student Details</h1>
        <p>Name: {user?.name}</p>
        <p>GENDER: {user.gender}</p>
        {console.log(user.gen)}
        {/*Even the gender prop value is null it doesnt cause error */}
        <p>Contact Ph: {user.contact.ph}</p>
        <p>Address Ph: {user.address.ph}</p>
        <p>Email: {user?.contact?.email}</p>
        <p>
          Address: {user?.address?.city}, {user?.address?.country}
        </p>
      </div>
    );
  }
}

export class NullCoalescing extends Component {
  // nullish coalescing used  to handle default values, optional data, or fallback values.
  constructor(props) {
    super(props);
    this.state = {
      count: this.props.initialCount ?? 0,
    };
  }
  increment = () => {
    this.setState((prevState) => ({ count: prevState.count + 1 }));
  };
  render() {
    const { name, age, city } = this.props;
    const { author, text } = this.props.com;
    const { count } = this.state;
    return (
      <>
        {/* Providing default values for props */}
        <div>
          <h2>User Profile</h2>
          <p>Name: {name ?? "Unknown"}</p>
          <p>Age: {age ?? "Unknown"}</p>
          <p>City: {city ?? "Unknown City"}</p>
        </div>
        {/* Handling optional nested data */}
        <div>
          <h4>{author ?? "Unknown Author"}</h4>
          <h4>{text ?? "No comment text available."}</h4>
        </div>
        {/* Providing fallback values in state */}
        <div>
          <p>Count: {count}</p>
          <button onClick={this.increment}>Increment</button>
        </div>
      </>
    );
  }
}

export class ShortCircuit extends Component {
  //Short-circuit evaluation is powerful technique for conditional rendering, providing default values, and conditional styling.

  render() {
    const isLoggedIn = this.props.isLoggedIn;
    const name = this.props.name || "Anonymous Name";
    const age = this.props.age || "Unknown Age";
    const { isPrimary, onClickProp } = this.props;
    return (
      <>
        <div>
          {/* // short-circuit evaluation && operator is used to conditionally render elements.If the condition on the left side of && is false, the right side is not evaluated or rendered. */}
          {isLoggedIn && <h1>Welcome back, User!</h1>}
          {!isLoggedIn && <h1>Please log in to continue.</h1>}
        </div>
        <div>
          {/* //The short-circuit evaluation || operator returns the first truthy value encountered. If the left side is truthy, the right side is not evaluated or used. */}
          <h2>Name: {name}</h2>
          <h2>Age: {age}</h2>
        </div>
        {/* If isPrimary is true, the primary-button class is included, resulting in conditional styling.
      If isPrimary is false, the right side is not evaluated, and the class is not included. */}
        <button onClick={onClickProp} className={isPrimary && "primary-button"}>
          Click Me
        </button>
      </>
    );
  }
}
