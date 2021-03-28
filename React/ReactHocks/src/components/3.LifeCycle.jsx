import React, { Component } from "react";

export class LifeCycle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1
    };
  }

  // Life Cycle
  componentDidMount() {
    console.log("component did mount");
  }

  // Function
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

export default LifeCycle;
