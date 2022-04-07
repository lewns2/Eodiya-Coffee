import { useState } from 'react';
import Mypage from '../pages/Mypage';
import Login from '../pages/Login';
import Register from '../pages/Register';

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import HowTo from './HowTo';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Nav() {
    const [LoginIsOpen, setLoginOpen] = useState(false);
    const [MypageIsOpen, setMypageOpen] = useState(false);
    const [RegisterIsOpen, setRegisterIsOpen] = useState(false);
    const [HowToIsOpen, setHowToIsOpen] = useState(false);
    const [IsLogin, setIsLogin] = useState(false);
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);


    const handleCloseModal = ()=> {
        setLoginOpen(false);
        setMypageOpen(false);
        setRegisterIsOpen(false);
        setHowToIsOpen(false);
        setIsLogin(CheckLogin);
    }
    const CheckLogin= () => {
        if(window.localStorage.getItem("jwt")){
            return true
        }
        return false
    }
    const LogOut= () => {
        window.localStorage.removeItem("jwt");
        handleCloseModal();
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                {/* <img src={require('../assets/Eodiya-removebg-preview.png')} style={{width:80, height:80}}  alt="로고"/> */}
                <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
                    어디야
                </Typography>
                    <Button color="inherit" onClick={() => setHowToIsOpen(true)}>사용자 가이드</Button>

                    {!IsLogin && (
                            <>
                                <Button color="inherit" onClick={() => setLoginOpen(true)}>로그인</Button>
                                <Button color="inherit" onClick={() => setRegisterIsOpen(true)}>회원가입</Button>
                            </>
                        )}
                    {IsLogin &&(
                        <>
                            <Button color="inherit" onClick={() => setMypageOpen(true)}>OOO님</Button>
                            <Button color="inherit" onClick={() => LogOut()}>로그아웃</Button>
                        </>
                    )}
                    <Modal open={LoginIsOpen}
                        onClose={handleCloseModal}>
                        <div style={modalStyle} className={classes.paper}>
                            <Login closemodal ={handleCloseModal}/>
                        </div>
                    </Modal>
                    <Modal  open={MypageIsOpen}
                        onClose={handleCloseModal}>
                        <div style={modalStyle} className={classes.paper}>
                            <Mypage closemodal ={handleCloseModal}/>
                        </div>
                    </Modal>
                    <Modal open={RegisterIsOpen}
                        onClose={handleCloseModal}>
                        <div style={modalStyle} className={classes.paper}> 
                            <Register closemodal ={handleCloseModal}/>
                        </div>
                    </Modal>
                    <Modal open={HowToIsOpen}>
                        <div>
                            <HowTo/>
                        </div>
                    </Modal>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default Nav;