import Signin from './pages/Signin';
import Mypage from './pages/Mypage';
import Login from './pages/Login';
import React from 'react';
import { Route, Link } from 'react-router-dom';


const App = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/login">로그인</Link>
        </li>
        <li>
          <Link to="/mypage">마이페이지</Link>
        </li>
        <li>
          <Link to="/signin">회원가입</Link>
        </li>
      </ul>
      <hr />
      <Route path="/login" exact={true} component={Login} />
      <Route path="/mypage" component={Mypage} />
      <Route path="/signin" component={Signin} />
    </div>
  );
};

export default App;
