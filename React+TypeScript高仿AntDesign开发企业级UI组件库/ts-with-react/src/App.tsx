import React from "react";
// import HelloWord from "./components/HelloWorld";

import Button, { ButtonType, ButtonSize } from "./components/Button/button";

function App() {
  return (
    <div className="App">
      <Button buttonType={ButtonType.Defalut} autoFocus={true}>
        Hello
      </Button>
      <Button buttonType={ButtonType.Primary}>Hello</Button>
      <Button buttonType={ButtonType.Danger}>Hello</Button>
      <Button buttonType={ButtonType.Danger} disabled={true}>
        Hello
      </Button>
      <Button buttonType={ButtonType.Link}>Hello</Button>

      <Button buttonType={ButtonType.Primary} size={ButtonSize.Small}>
        Hello
      </Button>
      <Button buttonType={ButtonType.Primary} size={ButtonSize.Large}>
        Hello
      </Button>
    </div>
  );
}

export default App;
