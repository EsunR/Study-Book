import React from "react";
import Example from "./components/Example";
import UseState from "./components/UseState";
import LifeCycle from "./components/LifeCycle";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>Exapmle:</h1>
        <div className="wrapper">
          <Example />
        </div>
        
        <h1>useState:</h1>
        <div className="wrapper">
          <UseState />
        </div>

        <h1>useState:</h1>
        <div className="wrapper">
          <LifeCycle />
        </div>
      </div>
    );
  }
}

export default App;
