import React from "./lib/react";
import ReactDOM from "./lib/react-dom";

const ele = (
  <div className="active" title="123">
    hello,<span style={{ color: "red" }}>React!</span>
  </div>
);

// function Home() {
//   return (
//     <div className="active" title="123">
//       hello, <span>react {`${this.props.name}`}</span>
//     </div>
//   );
// }

const title = "Home Component";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 0,
    };
  }
  componentWillMount() {
    console.log("componentWillMount");
  }
  componentDidMount() {
    console.log("componentDidMount");
    console.log(document.querySelector("#home"));
  }
  componentWillUpdate() {
    console.log("componentWillUpdate");
  }
  componentDidUpdate() {
    console.log("componentDidUpdate");
    console.log(document.querySelector("#home"));
  }
  componentWillReceiveProps(props) {
    console.log("componentWillReceiveProps: ", props);
  }
  // Handle
  handleClick() {
    this.setState({
      num: this.state.num + 1,
    });
  }
  render() {
    return (
      <div id="home">
        <h1>{this.props.title}</h1>
        <span>hello, react!</span>
        <button onClick={this.handleClick.bind(this)}>
          Click me! ({this.state.num})
        </button>
      </div>
    );
  }
}

ReactDOM.render(<Home title={title} />, document.querySelector("#app"));
