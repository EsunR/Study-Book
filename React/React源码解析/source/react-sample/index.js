import React from "./lib/react";
import ReactDOM from "./lib/react-dom";

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
    // console.log("componentDidMount");
    // for (let i = 0; i < 10; i++) {
    //   this.setState((prevState) => {
    //     return {
    //       num: prevState.num + 1,
    //     };
    //   });
    //   console.log(this.state.num);
    // }
  }
  componentWillUpdate(nextProps, nextState) {
    console.log("componentWillUpdate");
    console.log("nextProps: ", nextProps);
    console.log("nextState: ", nextState);
  }
  componentDidUpdate() {
    console.log("componentDidUpdate");
  }
  componentWillReceiveProps(props) {
    console.log("componentWillReceiveProps: ", props);
  }
  // Handle
  handleClick() {
    this.setState({
      num: this.state.num + 1,
    });
    setTimeout(() => {
      const btn = document.querySelector("#btn");
      console.log("btn: ", btn.innerHTML);
    }, 0);
  }
  render() {
    return (
      <div id="home">
        <h1>{this.props.title}</h1>
        <span>hello, react!</span>
        <button id="btn" onClick={this.handleClick.bind(this)}>
          Click me! ({this.state.num})
        </button>
      </div>
    );
  }
}

const ele = (
  <div className="active" title="123">
    hello,<span style={{ color: "red" }}>React!</span>
    <Home title="Title" />
  </div>
);

ReactDOM.render(ele, document.querySelector("#app"));
