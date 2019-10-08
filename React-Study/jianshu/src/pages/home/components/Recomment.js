import React, { PureComponent } from 'react'
import { RecommentWrapper, RecommentItem } from '../style'
import { connect } from 'react-redux'

class Recomment extends PureComponent {
  render() {
    return (
      <RecommentWrapper>
        {
          this.props.list.map((item) => (
            <RecommentItem imgUrl={item.get('imgUrl')} key={item.get('id')} ></RecommentItem>
          ))
        }
      </RecommentWrapper>
    )
  }
}

const mapState = (state) => ({
  list: state.getIn(['home', 'recommendList'])
})

export default connect(mapState, null)(Recomment);