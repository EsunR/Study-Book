import React from 'react';
import Link from 'umi/link';

class DataList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <h1>这是一个列表</h1>
        <ul>
          <li>
            <Link to="/data/1">id:1</Link>
          </li>
          <li>
            <Link to="/data/2">id:2</Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default DataList;
