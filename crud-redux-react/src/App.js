import React, { Component } from "react";
import { BrowserRouter as Router, Routes,Switch, Route } from "react-router-dom";
import GetItems from "./components/getItems";
import PostItems from "./components/postItems";
import Task from "./components/Task";
import CRUDTask from "./components/CRUDTask";
import CRUDCompo1 from './components/CRUDCompo1'
import CRUDCompo2 from './components/CRUDCompo2'
import CRUDCompo3 from './components/CRUDCompo3'
import CRUDCompo4 from './components/CRUDCompo4'
import CRUDwithJSON from "./components/CRUDwithJSON";
// import FirstComponent from "./iFrames/FirstComponent";
// import SecondComponent from "./iFrames/SecondComponent";
// import First from "./HandleBars/First";
// import Second from "./HandleBars/Second";
// import Third from "./HandleBars/Third";
// import NavComponent1 from "./AlternativeToIframes/NavComponent1";
// import NavComponent2 from "./AlternativeToIframes/NavComponent2";
// import NavComponent3 from "./AlternativeToIframes/NavComponent3";
// import NavComponent4 from "./AlternativeToIframes/NavComponent4";
// import MustacheReact from "./AlternativeToHandlebars/MustacheReact";
// import Nunjucks from "./AlternativeToHandlebars/Nunjucks";
// import Lodash from "./AlternativeToHandlebars/Lodash";
// import Twig from "./AlternativeToHandlebars/Twig";
// import Jinja from "./AlternativeToHandlebars/Jinja";
// import Third from "./HandleBars/Third";
// import Fourth from "./HandleBars/Fourth";
// import Fifth from "./HandleBars/Fifth";


export class App extends Component {
  render() {
    return (
      <>
    {/* <MustacheReact/>
      <Lodash/>
    <Nunjucks/> */}
    {/* <Twig/> */}
    {/* <Jinja/> */}


      {/* <NavComponent1/> */}
      {/* <NavComponent2/> */}
      {/* <NavComponent4/> */}




       {/* <NavComponent3/> */}
    {/* <Router>
     
      <Switch>
        <Route exact path="/" component={Third} />
        <Route path="/Stash" component={Second} />
      </Switch>
      
    </Router> */}


        {/* <First/> */}
        <Second/>
        {/* <Third/> */}
        {/* <Fourth/> */}
       {/* <Fifth/> */}


    {/* <CRUDwithJSON/> */}

      {/* <CRUDCompo1/>
      <CRUDCompo2/>
      <CRUDCompo3/>
      <CRUDCompo4/> */}
        {/* <Task /> */}
        {/* <GetItems /> */}
        {/* <PostItems /> */}
        {/* <CRUDTask /> */}
        {/* <Router>
          <Routes> */}
            {/* <Route path="/" exact element={<PostItems />}></Route>
            <Route path="/get-items" element={<GetItems/>}></Route> */}
            {/* <Route exact path="/" element={<FirstComponent/>} />
            <Route path="/second-component" element={<SecondComponent/>} /> */}
          {/* </Routes>
        </Router> */}
      </>
    );
  }
}

export default App;
