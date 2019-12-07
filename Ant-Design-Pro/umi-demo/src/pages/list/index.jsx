import router from 'umi/router';
import styles from './index.css';
import React from 'react';
import { connect } from 'dva';

const namespace = 'list';

// 说明：第一个回调函数，作用：将page层和model层进行连接，返回Model中的数据，并且将返回的数据绑定到 this.props
@connect(state => {
  return {
    data: state[namespace].data,
    maxNum: state[namespace].maxNum,
  };
})
class List extends React.Component {
  backHome() {
    router.push('/');
  }

  add() {
    let { data } = this.state;
    data.push(1);
    this.setState({ data });
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.data.map((value, index) => {
            return <li key={index}>{value}</li>;
          })}
        </ul>
        <button className={styles.btn} onClick={this.add.bind(this)}>
          add
        </button>
        <br />
        <button className={styles.btn} onClick={this.backHome}>
          BackHome
        </button>
      </div>
    );
  }
}

export default List;
