import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Example from "./components/1.Example";
import UseState from "./components/2.UseState";
import LifeCycle from "./components/3.LifeCycle";
import UseContext from "./components/4.UseContext";
import UseReducer from "./components/5.UseReducer";
import ReplaceRedux from "./components/6.UseContext与UseReducer替代Redux/Page_6";
import UseMemo from "./components/7.useMemo";
import UseRef from "./components/8.useRef";
import CustomHooks from './components/9.自定义hooks';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>index</h1>
        <Router>
          <ol>
            <li>
              <Link to="/Example">Example</Link>
            </li>
            <li>
              <Link to="/LifeCycle">LifeCycle</Link>
            </li>
            <li>
              <Link to="/UseState">useState & useEffect</Link>
            </li>
            <li>
              <Link to="/UseContext">useContext</Link>
            </li>
            <li>
              <Link to="/UseReducer">useReducer</Link>
            </li>
            <li>
              <Link to="/ReplaceRedux">
                useReducerd 与 useContext 代替 Redux
              </Link>
            </li>
            <li>
              <Link to="/UseMemo">useMemo 优化性能</Link>
            </li>
            <li>
              <Link to="/UseRef">useRef</Link>
            </li>
            <li>
              <Link to="/CustomHooks">自定义 Hooks</Link>
            </li>
          </ol>
          <div className="wrapper">
            <Route path="/Example" component={Example}></Route>
            <Route path="/LifeCycle" component={LifeCycle}></Route>
            <Route path="/UseState" component={UseState}></Route>
            <Route path="/UseContext" component={UseContext}></Route>
            <Route path="/UseReducer" component={UseReducer}></Route>
            <Route path="/ReplaceRedux" component={ReplaceRedux}></Route>
            <Route path="/UseMemo" component={UseMemo}></Route>
            <Route path="/UseRef" component={UseRef}></Route>
            <Route path="/CustomHooks" component={CustomHooks}></Route>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
