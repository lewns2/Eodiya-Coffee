import React from 'react';
import Nav from './components/Nav';
import Signin from './pages/Signin';
import Mypage from './pages/Mypage';
import Login from './pages/Login';
import LeftSide from './components/LeftSide';
import Map from './components/Map';
import { Route, Routes, Link } from 'react-router-dom';


const App = () => {
  return (
    <div>
      <Nav />
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/mypage" element={<Mypage />} />
        <Route exact path="/signin" element={<Signin />} />
      </Routes> 
      <Map/>
      <LeftSide />
    </div>
  );
};

export default App;
