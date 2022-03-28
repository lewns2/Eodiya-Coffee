import Modal from 'react-modal';
import { useState } from 'react';
import Mypage from '../pages/Mypage';
import Login from '../pages/Login';
import Signin from '../pages/Signin';
import '../styles/Navbar.css'

function Nav() {
    const [LoginIsOpen, setLoginOpen] = useState(false);
    const [MypageIsOpen, setMypageOpen] = useState(false);
    const [SigninIsOpen, setSigninIsOpen] = useState(false);
    const handleCloseModal = ()=> {
        setLoginOpen(false);
        setMypageOpen(false);
        setSigninIsOpen(false);
    }
    return (
        <div className='Navbar'>
            <nav className='Nav'>
            <h1>EoDIYA COFFEE</h1>
                <div className='Nav'>
                    <button onClick={() => setLoginOpen(true)}>로그인</button>
                    <button onClick={() => setMypageOpen(true)}>마이페이지</button>
                    <button onClick={() => setSigninIsOpen(true)}>회원가입</button>
                    <div className='Modal'>
                        <Modal isOpen={LoginIsOpen} onRequestClose={() => setLoginOpen(false)} ariaHideApp={false}>
                            <Login closemodal ={handleCloseModal}/>
                        </Modal>
                        <Modal isOpen={MypageIsOpen} onRequestClose={() => setMypageOpen(false)} ariaHideApp={false}>
                            <Mypage closemodal ={handleCloseModal}/>
                        </Modal>
                        <Modal isOpen={SigninIsOpen} onRequestClose={() => setSigninIsOpen(false)} ariaHideApp={false}>
                            <Signin closemodal ={handleCloseModal}/>
                        </Modal>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Nav;