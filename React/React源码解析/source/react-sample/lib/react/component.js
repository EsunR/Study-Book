import { renderComponent } from "../react-dom/index";
import { enqueueSetState } from "./set_state_queue";

class Component {
  constructor(props = {}) {
    this.props = props;
    this.state = {};
  }
  setState(stateChange) {
    // Object.assign(this.state, stateChange);
    // renderComponent(this);
    enqueueSetState(stateChange, this);
  }
}

export default Component;
