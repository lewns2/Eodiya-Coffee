import React, { Component, useState } from 'react';
import axios from 'axios';
import Calender from './Calender';

function Mypage(props) {
    const [email, setEmail] = useState();
    const [username, setUsername] = useState();
    const [birthday, setBirthday] = useState();
    const [gender, setGender] = useState();
    
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

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {email:email, username:username, birthday:birthday, gender:gender};
        alert("A name was submitted: " + data);
        axios
          .post(
            "/accounts/profile/",
            data,
            {
              headers: {
                "Content-type": "application/json",
                Accept: "*/*",
              },
            }
          )
          .then((response) => {
            console.log(response, "from login");
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
        <div className='Mypage'>
            <label>My Page</label>
            <form onSubmit={handleSubmit}>
                <input type="text" value={email} onChange={handleEmailChange} placeholder="이메일"/>
                <input type="text" value={username} onChange={handleUsernameChange} placeholder="이름"/>
                <input type="text" value={birthday} onChange={handleBirthdayChange} placeholder="생일"/>
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
                <input type="submit" value="Submit" />
            </form>
            
        </div>
    );
}

export default Mypage;