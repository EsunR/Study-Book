import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TodoItem extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }

  render() {
    const { index,content } = this.props
    return (
      <div
        onClick={this.handleClick}
        key={index}
      >
        {content}
      </div>
    )
  }

  handleClick() {
    const { index, deleteItem } = this.props;
    deleteItem(index);
  }
}

TodoItem.protoTypes = {
  content: PropTypes.string,
  deleteItem: PropTypes.func,
  index: PropTypes.number
}

export default TodoItem;