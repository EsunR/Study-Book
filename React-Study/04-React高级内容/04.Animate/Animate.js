import React, { Component, Fragment } from 'react'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import './style.css'

class Animate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: []
    }
    this.handleAddItem = this.handleAddItem.bind(this);
  }

  render() {
    return (
      <Fragment>
        <button onClick={this.handleAddItem}>toggel</button>
        <TransitionGroup>
          {
            this.state.list.map((item, index) => {
              return (
                <CSSTransition
                  timeout={1000}
                  classNames='fade'
                  unmountOnExit
                  onEntered={(el) => { el.style.color = 'blue' }}
                  appear={true}
                  key={index}
                >
                  <div>{item}</div>
                </CSSTransition>
              )
            })
          }
        </TransitionGroup>
      </Fragment>
    )
  }

  handleAddItem() {
    this.setState((prevState) => ({
      list: [...prevState.list, 'item']
    }))
  }
}

export default Animate;