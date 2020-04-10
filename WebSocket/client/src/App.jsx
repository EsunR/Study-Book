import React from "react";
import { Route } from "react-router";
import { Link } from "react-router-dom";
// import Layout from "@/layout";
import Home from "@/pages/Home";

function App() {
  return (
    <div className="App">
      <Link to="/home">Home</Link>
      <div>
        <Route path="/home" component={Home} />
      </div>
    </div>
  );
}

export default App;
