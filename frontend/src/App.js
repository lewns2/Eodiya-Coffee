// import Register from './pages/Register';
// import Mypage from './pages/Mypage';
// import Login from './pages/Login';
import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';


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
      {/* <Routes>
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/mypage" element={<Mypage/>} />
        <Route exact path="/signin" element={<Register/>} />
      </Routes>   */}
    </div>
  );
};

export default App;
