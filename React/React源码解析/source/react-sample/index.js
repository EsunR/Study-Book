import React from "./lib/react";
import ReactDOM from "./lib/react-dom";

const ele = (
  <div className="active" title="123">
    hello,<span style={{ color: "red" }}>React!</span>
  </div>
);

function Home() {
  return (
    <div className="active" title="123">
      hello, <span>react {`${this.props.name}`}</span>
    </div>
  );
}

const title = "active";

ReactDOM.render(<Home name={title} />, document.querySelector("#app"));
