import React from 'react';
import { withRouter } from 'umi';

class DataDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>这是一个详情：{this.props.match.params.id}</div>;
  }
}

export default withRouter(DataDetail);
