import React, { useState } from "react";
import axios from "axios";

function Login(props) {
  const [userId, setUserId] = useState("");
  const [userPW, setUserPW] = useState("");

  const handleIdChange = (event) => {
    setUserId(() => event.target.value);
  };
  const handlePWChange = (event) => {
    setUserPW(() => event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    alert("A name was submitted: " + userId + " " + userPW);
    // handleCloseModal();
    axios
      .post(
        "/accounts/api-token-auth/",
        {
          username: userId,
          password: userPW,
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
      })
      .catch((response) => {
        console.log("Error!");
        console.log(response, "from login");
      });
  };
  const handlefindId = () => {
    alert("findId");
  };
  const handlefindPW = () => {
    alert("findPW");
  };
  const handleCloseModal = () => {
    props.setLoginOpen(false);
  };
  return (
    <div className="Login">
      <form onSubmit={handleSubmit}>
        <label>
          아이디: <input type="text" value={userId} onChange={handleIdChange} />
        </label>
        <label>
          비밀번호:{" "}
          <input type="text" value={userPW} onChange={handlePWChange} />
        </label>
        <hr />
        <a onClick={handlefindId}>아이디 찾기</a>
        <span> / </span>
        <a onClick={handlefindPW}>비밀번호 찾기</a>
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
export default Login;

// class Login extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             userId:"",
//             userPW:""
//         }
//         this.handleIdChange = this.handleIdChange.bind(this);
//         this.handlePWChange = this.handlePWChange.bind(this);
//         this.handlefindId = this.handlePWChange.bind(this);
//         this.handlefindPW = this.handlefindPW.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }
//     handleIdChange(event) {
//         this.setState({userId: event.target.value});
//     }
//     handlePWChange(event) {
//         this.setState({userPW: event.target.value});
//     }
//     handleSubmit(event) {
//         alert('A name was submitted: ' + this.state.value);
//         event.preventDefault();
//     }
//     handlefindId(){
//         alert('findId');
//     }
//     handlefindPW(){
//         alert('findPW');
//     }
//     render(){
//         return (
//             <div>
//                 <form onSubmit={this.handleSubmit}>
//                     <label>아이디: <input type="text" value={this.state.userId} onChange={this.handleIdChange}/></label>
//                     <label>비밀번호: <input type="text" value={this.state.userPW} onChange={this.handlePWChange}/></label>
//                     <hr/>
//                     <a onClick={this.handlefindId}>아이디 찾기</a><span> / </span><a onClick={this.handlefindPW}>비밀번호 찾기</a>
//                     <input type="submit" value="Submit"/>
//                 </form>
//             </div>
//         );
//     }
// }
// export default Login;
