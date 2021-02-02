import { createStore } from "redux";
import { initState } from "./initState";
import reducer from "./reducer";

const store = createStore(reducer, initState);

export default store;
