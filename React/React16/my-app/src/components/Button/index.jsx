import React from "react";

class Button extends React.Component {
  handleClick = (e, id) => {
    console.log(this, e, id);
  };

  render() {
    return (
      <div>
        <button
          onClick={e => {
            this.handleClick(e, 123);
          }}
        >
          {this.props.value}
        </button>
      </div>
    );
  }
}

export default Button;
