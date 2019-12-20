import React, { Component } from "react";

class Example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  addCount = () => {
    this.setState({ count: this.state.count + 1 });
  };

  render() {
    return (
      <div>
        <p>You clicked {this.state.count} times</p>
        <button onClick={this.addCount}>点我</button>
      </div>
    );
  }
}

export default Example;
