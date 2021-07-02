import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import React from "react";
import CwNavbar from "./components/CwNavbar";
import VaccineCenter from "./components/VaccineCenter";
import PinVaccineCenter from "./components/PinVaccineCenter";
import CwHome from "./components/CwHome";
import GetCenterByDistrict from "./components/GetCenterByDistrict";
function App() {
  return (
    <div className="App">
      <Router>
        <CwNavbar />
        <Route path="/district">
          <VaccineCenter />
        </Route>
        <Route path="/pincode">
          <PinVaccineCenter />
        </Route>
        <Route path="/vaccine">
          <GetCenterByDistrict />
        </Route>
        <Route exact path="/">
          <CwHome />
        </Route>

        <Route exact path="/login" render={() => <h1>login</h1>} />
      </Router>
    </div>
  );
}

export default App;
