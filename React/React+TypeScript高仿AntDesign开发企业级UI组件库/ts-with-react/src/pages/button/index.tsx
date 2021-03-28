import React from "react";
import Button, { ButtonType, ButtonSize } from "../../components/Button/button";

const ButtonDemo: React.FC<any> = () => {
  return (
    <>
      <Button buttonType={ButtonType.Default} autoFocus={true}>
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
      <Button
        disabled={true}
        buttonType={ButtonType.Primary}
        size={ButtonSize.Large}
      >
        Hello
      </Button>
    </>
  );
};

export default ButtonDemo;
