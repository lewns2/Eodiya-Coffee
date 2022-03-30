import React, { Component, useState } from "react";
import axios from "axios";
import Calender from "./Calender";

function Mypage(props) {
  const [email, setEmail] = useState();
  const [username, setUsername] = useState();
  const [birthday, setBirthday] = useState();
  const [gender, setGender] = useState();
  const [isdelmode, setIsdelmode] = useState(true);
  const [password, setPassword] = useState();

  const handleEmailChange = (event) => {
    setEmail(() => event.target.value);
  };
  const handleUsernameChange = (event) => {
    setUsername(() => event.target.value);
  };
  const handleBirthdayChange = (event) => {
    setBirthday(() => event.target.value);
  };
  const handleGenderChange = (event) => {
    setGender(() => event.target.value);
  };
  const handleIsdelmodeChange = () => {
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
  const handleDelete = () => {
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
        // window.localStorage.setItem("jwt", "");
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
          <label>My Page</label>
          <input
            type="text"
            value={email}
            onChange={handleEmailChange}
            placeholder="이메일"
          />
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="이름"
          />
          <input
            type="text"
            value={birthday}
            onChange={handleBirthdayChange}
            placeholder="생일"
          />
          남
          <input
            value="male"
            name="gender"
            type="radio"
            checked={gender === "male"}
            onChange={handleGenderChange}
          />
          여
          <input
            id="female"
            value="female"
            name="gender"
            type="radio"
            checked={gender === "female"}
            onChange={handleGenderChange}
          />
          <Calender />
          <input type="button" onClick={handleSubmit} value="제출" />
          <input type="button" onClick={handleIsdelmodeChange} value="삭제" />
        </>
      )}
      {!isdelmode && (
        <>
          비밀번호:{" "}
          <input
            type="text"
            value={password}
            onChange={handlePasswordChange}
            placeholder="이메일"
          ></input>
          <input type="button" onClick={handleDelete} value="삭제"></input>
          <input
            type="button"
            onClick={handleIsdelmodeChange}
            value="취소"
          ></input>
        </>
      )}
    </div>
  );
}

export default Mypage;
