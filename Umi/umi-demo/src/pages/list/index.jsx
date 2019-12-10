import router from 'umi/router';
import styles from './index.css';
import React from 'react';
import { connect } from 'dva';

const namespace = 'list';

// 说明：第一个回调函数，作用：将page层和model层进行连接，返回Model中的数据，并且将返回的数据绑定到 this.props
@connect(
  state => {
    return {
      listData: state[namespace].listData,
      maxNum: state[namespace].maxNum,
      neverChange: state[namespace].neverChange,
    };
  },
  dispatch => {
    return {
      addNewData() {
        dispatch({
          type: `${namespace}/addNewData`,
        });
      },
      fetchData() {
        dispatch({
          type: `${namespace}/fetchData`,
        });
      },
    };
  },
)
class List extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }

  backHome() {
    router.push('/');
  }

  handleAddClick() {
    this.props.addNewData();
  }

  render() {
    return (
      <div>
        <div>State => listData：{this.props.listData}</div>
        <div>State => maxNum：{this.props.maxNum}</div>
        <div>State => neverChange：{this.props.neverChange}</div>
        <ul>
          {this.props.listData.map((value, index) => {
            return <li key={index}>{value}</li>;
          })}
        </ul>
        <button className={styles.btn} onClick={this.handleAddClick.bind(this)}>
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
