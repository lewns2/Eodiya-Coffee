import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import { useState } from 'react';
import Mypage from '../pages/Mypage';
import Login from '../pages/Login';
import Signin from '../pages/Signin';

function Nav() {
    const [LoginIsOpen, setLoginOpen] = useState(false);
    const [MypageIsOpen, setMypageOpen] = useState(false);
    const [SigninIsOpen, setSigninIsOpen] = useState(false);
    return (
        <div>
            <header>
                <h1>EoDIYA COFFEE</h1>
                <nav className='Nav'>
                    <div className='Nav'>
                        <button onClick={() => setLoginOpen(true)}>로그인</button>
                        <button onClick={() => setMypageOpen(true)}>마이페이지</button>
                        <button onClick={() => setSigninIsOpen(true)}>회원가입</button>
                        <Modal isOpen={LoginIsOpen} onRequestClose={() => setLoginOpen(false)}>
                            <Login/>
                        </Modal>
                        <Modal isOpen={MypageIsOpen} onRequestClose={() => setMypageOpen(false)}>
                            <Mypage/>
                        </Modal>
                        <Modal isOpen={SigninIsOpen} onRequestClose={() => setSigninIsOpen(false)}>
                            <Signin />
                        </Modal>
                            <Link to="/login">로그인</Link>
                            <Link to="/mypage">마이페이지</Link>
                            <Link to="/signin">회원가입</Link>
                    </div>
                </nav>
                <hr/>
            </header>
        </div>
    );
}

export default Nav;