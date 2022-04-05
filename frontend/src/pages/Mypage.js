import React, { useState } from "react";
import axios from "axios";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

const theme = createTheme();

function Mypage(props) {
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [birthday, setBirthday] = useState();
  const [gender, setGender] = useState();
  const [isdelmode, setIsdelmode] = useState(true);
  const [password, setPassword] = useState();

  const handleUsernameChange = (event) => {
    setUsername(() => event.target.value);
  };
  const handleBirthdayChange = (event) => {
    setBirthday(() => event.target.value);
  };
  const handleGenderChange = (event) => {
    setGender(() => event.target.value);
  };
  const handleIsdelmodeChange = (e) => {
    e.preventDefault()
    setIsdelmode(() => !isdelmode);
  };
  const handlePasswordChange = (event) => {
    setPassword(() => event.target.value);
  };
  const setToken = () => {
    const token = window.localStorage.getItem("jwt");
    const config = {
      Authorization: `Bearer ${token}`,
      "Content-type": "application/json",
      Accept: "*/*",
    };
    console.log(config);
    return config;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = {
      email: email,
      username: username,
      birthday: birthday,
      gender: gender,
    };
    alert("A name was submitted: " + data);
    axios
      .post("/accounts/profile/", data, {
        headers: {
          "Content-type": "application/json",
          Accept: "*/*",
        },
      })
      .then((response) => {
        console.log(response, "from login");
        handleCloseModal();
      })
      .catch((response) => {
        console.log("Error!");
        console.log(response, "from login");
      });
  };
  const handleDelete = (e) => {
    e.preventDefault();
    const data = {
      email: window.localStorage.getItem("user_email"),
      password: password,
    };
    alert("A name was submitted: " + data);
    axios
      .delete("/accounts/signout/", data, {
        headers: setToken(),
      })
      .then((response) => {
        console.log(response, "from login");
        handleCloseModal();
      })
      .catch((response) => {
        console.log("Error!");
        console.log(response, "from singout");
      });
  };
  const handleCloseModal = () => {
    props.closemodal();
  };
  return (
    <div className="Mypage">
      {isdelmode && (
        <>
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
                  마이페이지
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="given-name"
                        name="Name"
                        required
                        fullWidth
                        id="Name"
                        onChange={handleUsernameChange}
                        value={username}
                        label="닉네임"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label="Basic example"
                          value={birthday}
                          name ="birth"
                          onChange={(newValue) => {
                            handleBirthdayChange(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} />}
                        />
                      </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                      남자
                      <Radio
                        checked={gender === 'male'}
                        onChange={handleGenderChange}
                        value="male"
                        name="gender"
                        inputProps={{ 'aria-label': 'A' }}
                      />
                      여자
                      <Radio
                        checked={gender === 'female'}
                        onChange={handleGenderChange}
                        value="female"
                        name="gender"
                        inputProps={{ 'aria-label': 'B' }}
                      />
                    </Grid>
                  </Grid>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    회원정보수정
                  </Button>
                  <a color="red" onClick={handleIsdelmodeChange}>계정을 삭제 하시겠습니까?</a>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </>
      )}
      {!isdelmode && (
        <>
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
                  마이페이지
                </Typography>
                <Box component="form" noValidate sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="given-password"
                        name="password"
                        required
                        fullWidth
                        id="password"
                        onChange={handlePasswordChange}
                        label="비밀번호 확인"
                        autoFocus
                      />
                    </Grid>
                  
                    <Button
                      type="button"
                      onClick={handleDelete}
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 1 }}
                    >
                      회원 삭제
                    </Button>
                    <Button
                      type="button"
                      onClick={handleIsdelmodeChange}
                      fullWidth
                      variant="contained"
                      sx={{ mb: 2 }}
                    >
                      삭제 취소
                    </Button>
                  </Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </>
      )}
    </div>
  );
}

export default Mypage;
