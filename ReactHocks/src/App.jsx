import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Example from "./components/Example";
import UseState from "./components/UseState";
import LifeCycle from "./components/LifeCycle";
import UseContent from "./components/UseContent";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>index</h1>
        <Router>
          <ul>
            <li>
              <Link to="/Example">Example</Link>
            </li>
            <li>
              <Link to="/LifeCycle">LifeCycle</Link>
            </li>
            <li>
              <Link to="/UseState">UseState & useEffect</Link>
            </li>
            <li>
              <Link to="/UseContent">UseContent</Link>
            </li>
          </ul>
          <div className="wrapper">
            <Route path="/Example" component={Example}></Route>
            <Route path="/LifeCycle" component={LifeCycle}></Route>
            <Route path="/UseState" component={UseState}></Route>
            <Route path="/UseContent" component={UseContent}></Route>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
