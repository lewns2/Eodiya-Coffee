import React, { Component } from 'react';
// import Calender from './Calender';
import Calender from './Calender';


class Mypage extends Component {

    render() {
        return (
            <div>
                <label> My Page</label>
                <form>
                    <input type="text" name="userid" placeholder='아이디'></input>
                    <input type="text" name="username" placeholder='이름'></input>
                    <input type="text" name="userbirth" placeholder='생년원일'></input>
                    <Calender />
                    <input type="text" name="userphone" placeholder='연락처'></input>
                </form>
                
                <button>취소</button>
                <button>수정</button>
            </div>
        );
    }
}

export default Mypage;