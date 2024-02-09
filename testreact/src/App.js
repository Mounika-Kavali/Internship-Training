import React from "react";
import Header from "./Components/Header";
import AddContacts from "./Components/AddContacts";
import ContactList from "./Components/ContactList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Parent from "./Components/Parent";
import FormatChanger from "./Components/FormatChanger";
import LifeCycleComponent1 from "./Components/LifeCycleComponent1";
import LifeCycleComponent2 from "./Components/LifeCycleComponent2";
import TryCatchStatements from "./Components/Try-Catch-Statements";
import RestSpreadOperators from "./Components/RestSpreadOperators";
import Closures from "./Components/Closures";
import Scopes from "./Components/Scopes";
import { OptionalChaining } from "./Components/OptionalChaining";
import { NullCoalescing } from "./Components/OptionalChaining";
import { ShortCircuit } from "./Components/OptionalChaining";
import Async_Await from "./Components/Async_Await";
import { PromiseExample } from "./Components/Async_Await";
import FormValidations from "./Components/Forms/FormValidations";
import FormValidations5 from "./Components/Forms/FormValidations5";
import Table from "./Components/Forms/checkboxesTask";
import Login from "./Components/Forms/Login";
import Child from "./Components/Child";
import ShutterButton from "./Components/shutterButton/ShutterButton";

export const Objs = {
  name: "Saloni",
  age: 63,
  country: "Spain",
  state: "Texas",
  mobile: 987654235,
  gender: "female",
};
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1,
    };
  }
  // componentDidMount() {
  //   // Simulating a change in id after some time
  //   setTimeout(() => {
  //     this.setState({ id: 2 });
  //   }, 3000);
  // }

  state = {
    gotData: "",
  };
  // Callback function to handle data received from the
  //child component
  handleCallback = (childData) => {
    // Update the gotData in the component's state

    this.setState({ gotData: childData });
  };

  arr = ["ram", 27, "mlritm", "dundigal", 987654334];
  arrValues = [
    { id: 1, text: "hi" },
    { id: 2, text: "hello" },
    { id: 3, text: "bye" },
  ];
  //TO PASS AS PROPS THE OBJ SHOULD RETURN INSIDE CLASS,otherwise it wont recognize
  obj = {
    name: "Alice",
    age: 29,
    country: "Austria",
    state: "florida",
    mobile: 987654235,
    gender: "female",
  };

  render() {
    const { id } = this.state;
    const parentObj = {
      Name: "priyanka chopra",
      Age: 29,
      State: "Dallas",
      Gender: "female",
      Country: "USA",
    };
    const { Name, Country, ...childObj } = parentObj;

    const student = {
      name: "Maitili",
      gender: null,
      contact: {
        email: "maitili@example.com",
        ph: 987654334,
      },
      address: {
        city: "New York",
        ph: 654312345,
        country: "USA",
      },
    };
    const comment = {
      author: null,
      text: "This is a great post!",
    };

    return (
      <>
        <div>
          <ShutterButton/>
        {/* <Parent /> */}
        {/* <Child/> */}
          {/* <FormValidations5/> */}
          {/* <Login/> */}
          {/* <Table/> */}
          {/* <Router>
          <Header></Header>

          <Routes>
            <Route path="/" exact element={<ContactList />} />
            <Route
              path="/add"
              element={<AddContacts parentCallback={this.handleCallback} />}
            />
            <Route path="/parent" element={<Parent />} />
            <Route path="/formatChangerPage" element={<FormatChanger />} />
            <Route path="/lifeCycle1" element={<LifeCycleComponent1 />} />
            <Route path="/lifeCycle2" element={<LifeCycleComponent2 />} />
          </Routes>
        </Router> */}

          <Router>
            {/* <TryCatchStatements />
          <RestSpreadOperators
            {...this.obj}
            simpleArray={this.arr}
            prop1={Name}
            prop2={Country}
            {...childObj}
          /> */}
            {/* <Closures /> */}
            {/* <OptionalChaining user={student} /> */}
            {/* <NullCoalescing
            name="Milly Brown"
            age={25}
            city={null}
            com={comment}
            initialCount={10}
          /> */}
            {/* <ShortCircuit
            isLoggedIn={true}
            name="leela"
            isPrimary={true}
            onClickProp={() => console.log("Button clicked!")}
          /> */}
            {/* <Scopes name={"mounika"} /> */}
            {/* <FormValidations/> */}
            {/* <OptionalChaining user={student} /> */}
            {/* <Async_Await /> */}

            {/* <PromiseExample /> */}
            <Routes>
              <Route />
            </Routes>
          </Router>
        </div>
      </>
    );
  }
}

export default App;
