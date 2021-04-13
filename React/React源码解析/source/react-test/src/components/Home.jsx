import React from "react";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log(document.querySelector("#home"));
  }
  render() {
    return (
      <div id="home">
        <h1>{this.props.title}</h1>
        <span>Hello React</span>
      </div>
    );
  }
}

export default Home;
