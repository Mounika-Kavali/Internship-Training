import React, { Component } from "react";

import { Objs } from "./../App";

class RestSpreadOperators extends Component {
  person = {
    NAME: "John Deep",
    AGE: 25,
    CITY: "New York",
    MOBILE: 765432345,
  };

  objx = {
    marks: [1, 2, 3, 4, 5],
  };
  state = {
    isClicked: false,
  };

  handleClick = () => {
    // Update the state when the button is clicked
    console.log("BUTTON clicked to login");
    this.setState((prevState) => ({
      isClicked: !prevState.isClicked,
    }));
  };
  render() {
    // Destructuring person object
    const { NAME, AGE, CITY } = this.person;
    //spread operator
    const { name, age, ...rest } = this.props;

    // Here Age,State,Gender are in childObj which used REST OPERATOR to render from parentObj

    const { Age, State, Gender } = this.props;

    // Using reduce() to calculate the sum of marks where accumulator initial value is 0.
    const sum = this.objx.marks.reduce(
      (accumulator, currentValue) => accumulator + currentValue,
      0
    );
    const myArray = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
      { id: 3, age: 30, name: "Jake" },
      { id: 4, Name: "Jonny" },
      { id: 5, mobile: 87654346 },
    ];

    const filteredArray = myArray.filter(
      (item) => item.hasOwnProperty("id") && item.hasOwnProperty("name")
    );

    //Using map(),filter()

    const elements = filteredArray.map((item) => {
      return (
        <div key={item.id}>
          <p>
            ID:{item.id},Name:{item.name}
          </p>
        </div>
      );
    });

    const items = ["item1", "item2", , "item2 ", , "item4", , "item5"];

    return (
      <div>
        <h3>
          <u>Destructuring obj</u>
        </h3>
        <p>NAME IS:{NAME}</p> {/*instead of writing this.person.Name */}
        <p>AGE IS:{AGE}</p>
        <p>CITY IS:{CITY}</p>
        <p>without Destructuring- mobile:{this.person.MOBILE}</p>
        <h1>
          //Using rest operator
          <br />
          {this.props.prop1}__{this.props.prop2}__{Age},{State}-{Gender}
        </h1>
        <div style={{ backgroundColor: "paleGreen" }}>
          <h3>
            <u>Array elements using map(),filter()</u>
          </h3>

          <h4>{elements}</h4>
        </div>
        <div style={{ backgroundColor: "orange" }}>
          <button onClick={this.handleClick}>
            {this.state.isClicked ? "logIn" : "logOut"}
          </button>
          <p>
            Status:
            {this.state.isClicked ? <h1>"Active"</h1> : <h1>"InActive"</h1>}
          </p>
        </div>
        <div style={{ backgroundColor: "yellow" }}>
          <p>{this.props.simpleArray[2]}</p>

          <span>
            {items.map((i) => (
              <p key={i}>{i}</p>
            ))}
          </span>
        </div>
        <div style={{ backgroundColor: "pink" }}>
          <h3>
            <u>reduce() to calculate the sum of Marks</u>
          </h3>
          <p>Marks: {this.objx.marks.join(", ")}</p>
          <p>Sum: {sum}</p>
        </div>
        <span>
          {/* exported Objs - rendering its property values */}
          {Objs.name}-{Objs.age}-{Objs.country}-{Objs.state}
        </span>
        <h3>
          <u>Object properties are retrieved using props,spread operator</u>

          {/* PASSING DOWN ALL PROPERTIES OF obj FROM App.js AS props TO RestSpreadOperators.js

          using spread operator  */}
        </h3>
        <ul>
          <li>{name}</li>
          <li>{age}</li>
        </ul>
        <ul>
          {Object.entries(rest).map(([key, value]) => (
            <li key={key}>
              {key}: {value}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default RestSpreadOperators;
