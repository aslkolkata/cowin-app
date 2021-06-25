import { BrowserRouter as Router, Route } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";

import CwNavbar from "./components/CwNavbar";
import VaccineCenter from "./components/VaccineCenter";
import PinVaccineCenter from "./components/PinVaccineCenter";

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
        <Route exact path="/">
          <h>TODO: HOME</h>
        </Route>
      </Router>
    </div>
  );
}

export default App;
