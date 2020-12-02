import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import { fas } from "@fortawesome/free-solid-svg-icons";

// Pages
import HomePage from "./pages/home";
import ButtonDemo from "./pages/button";
import MenuDemo from "./pages/menu";
import IconDemo from "./pages/icon";
import { library } from "@fortawesome/fontawesome-svg-core";
import TransitionDemo from "./pages/transition";

// add icon
library.add(fas);

function App() {
  return (
    <Router>
      <div className="App">
        {/* 目录 */}
        <div className="toc">
          <h1>目录</h1>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/button">Button</Link>
            </li>
            <li>
              <Link to="/menu">Menu</Link>
            </li>
            <li>
              <Link to="/icon">Icon</Link>
            </li>
            <li>
              <Link to="/transition">Transition</Link>
            </li>
          </ul>
        </div>
        {/* 目录 */}
        <hr />
        {/* Content */}
        <div className="container">
          <Route exact path="/" component={HomePage} />
          <Route exact path="/button" component={ButtonDemo} />
          <Route exact path="/menu" component={MenuDemo} />
          <Route exact path="/icon" component={IconDemo} />
          <Route exact path="/transition" component={TransitionDemo} />
        </div>
        {/* Content */}
      </div>
    </Router>
  );
}

export default App;
