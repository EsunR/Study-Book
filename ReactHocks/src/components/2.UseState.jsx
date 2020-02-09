import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

function Index() {
  useEffect(() => {
    console.log("Index useEffect");
    return () => {
      console.log("Index useEffect return");
    };
  }, []);
  return <h2>EsunR.xyz</h2>;
}

function List() {
  useEffect(() => {
    console.log("List useEffect");
    return () => {
      console.log("List useEffect return");
    };
  });
  return <h2>List Page</h2>;
}

function Example() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    console.log("产生副作用，类似于 ComponentDidUpdate 与 ComponentDidMount");
  }, [count]);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        点我
      </button>

      <Router>
        <ul>
          <li>
            <Link to="/">首页</Link>
          </li>
          <li>
            <Link to="/list/">列表</Link>
          </li>
        </ul>
        <Route path="/" exact component={Index}></Route>
        <Route path="/list/" component={List}></Route>
      </Router>
    </div>
  );
}

export default Example;
