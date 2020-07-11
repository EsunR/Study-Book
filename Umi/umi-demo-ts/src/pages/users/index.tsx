import React from 'react';
import { Link, history } from 'umi';

const UserPageIndex: React.FC<any> = () => {
  function handleBtnClick() {
    history.push({
      pathname: '/users/:2',
      query: {
        a: 'b',
      },
    });
  }

  return (
    <div>
      <h1>UserPageIndex</h1>
      <Link to="/users/:2">user: 2</Link>
      <br />
      <button onClick={handleBtnClick}>Click me</button>
    </div>
  );
};

export default UserPageIndex;
