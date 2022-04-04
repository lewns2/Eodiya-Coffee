import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from "axios";

const theme = createTheme();

export default function Login(props) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    alert("A name was submitted: " + data.get("email") + " " + data.get("password"));
    axios
      .post(
        "/accounts/api-token-auth/",
        {
          email: data.get("email"),
          password: data.get("password"),
        },
        {
          headers: {
            "Content-type": "application/json",
            Accept: "*/*",
          },
        }
      )
      .then((response) => {
        console.log(response, "from login");
        localStorage.setItem("jwt", response.data.token);
        localStorage.setItem("user_email", data.get("email"));
        handleCloseModal();
      })
      .catch((response) => {
        console.log("Error!");
        console.log(response, "from login");
      });
  };

  const handleCloseModal = () => {
    props.closemodal();
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            이용하기
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="이메일"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="비밀번호"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              로그인
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
// import React, { useState } from "react";
// import axios from "axios";

// function Login(props) {
//   const [userId, setUserId] = useState("");
//   const [userPW, setUserPW] = useState("");

//   const handleIdChange = (event) => {
//     setUserId(() => event.target.value);
//   };
//   const handlePWChange = (event) => {
//     setUserPW(() => event.target.value);
//   };
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     alert("A name was submitted: " + userId + " " + userPW);
//     axios
//       .post(
//         "/accounts/api-token-auth/",
//         {
//           email: userId,
//           password: userPW,
//         },
//         {
//           headers: {
//             "Content-type": "application/json",
//             Accept: "*/*",
//           },
//         }
//       )
//       .then((response) => {
//         console.log(response, "from login");
//         localStorage.setItem("jwt", response.data.token);
//         localStorage.setItem("user_email", userId);
//         handleCloseModal();
//       })
//       .catch((response) => {
//         console.log("Error!");
//         console.log(response, "from login");
//       });
//   };
//   const handlefindId = () => {
//     alert("findId");
//   };
//   const handlefindPW = () => {
//     alert("findPW");
//   };
//   const handleCloseModal = () => {
//     props.closemodal();
//   };
//   return (
//     <div className="Login">
//       <form onSubmit={handleSubmit}>
//         <label>
//           아이디: <input type="text" value={userId} onChange={handleIdChange} />
//         </label>
//         <label>
//           비밀번호:{" "}
//           <input type="text" value={userPW} onChange={handlePWChange} />
//         </label>
//         <hr />
//         <a onClick={handlefindId}>아이디 찾기</a>
//         <span> / </span>
//         <a onClick={handlefindPW}>비밀번호 찾기</a>
//         <input type="submit" value="Submit" />
//         <input
//             type="button"
//             onClick={handleCloseModal}
//             value="취소"
//           ></input>
//       </form>
//     </div>
//   );
// }
// export default Login;

